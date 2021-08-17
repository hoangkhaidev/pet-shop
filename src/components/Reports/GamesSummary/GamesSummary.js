/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useCallback, useEffect, useState } from "react";
// import Link from "@material-ui/core/Link";
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import useRouter from "src/utils/hooks/useRouter";
import useFetchData from "src/utils/hooks/useFetchData";
import get from 'lodash/get';
import moment from "moment";
import NoPermissionPage from "src/components/NoPermissionPage/NoPermissionPage";
import Loading from "src/components/shared/Loading/Loading";
// import map from "lodash/map";
import GamesSummaryFilter from "./GamesSummaryFilter";
import TableComponentGamesSummary from "src/components/shared/TableComponent/TableComponentGamesSummary";

const GamesSummary = () => {
  const router = useRouter();
  const [objFilter, setObjFilter] = useState({
    brand_ids: [],
    product_ids: [],
    from_date: moment().startOf('month').format("DD/MM/YYYY"),
    to_date: moment().endOf('month').format("DD/MM/YYYY"),
    option: "day",
    ...router.query,
  });

  const [data, setData] = useState([]);
  const [dataSum, setDataSum] = useState({});
  const [arrayCurrencyColumn, setArrayCurrencyColumn] = useState([]);
  const [listCurrency, setListCurrency] = useState([]);
  // const [excelData, setExcelData] = useState([]);

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/report/games_reports',
    objFilter
  );

  useEffect(() => {
    const mapData = get(dataResponse, 'list', []);
    setListCurrency(mapData);
   
  }, [dataResponse]);

  const getColumns = useCallback(async () => {
    if (listCurrency && arrayCurrencyColumn.length <= 0) {
      // setIsLoading(true);
      let a = [];
      listCurrency[0]?.currency_entry_list?.map((item) => {

        let items = [
          {
            currency_code: item.currency_code,
            data_field: "bet",
            column_name: "Bet",
            align: "right",
            formatter: (cell) => {
              let cellFormat = formatNumber(cell);
              return cellFormat;
            }
          },
          {
            currency_code: item.currency_code,
            data_field: "win",
            column_name: "Win",
            align: "right",
            formatter: (cell) => {
              let cellFormat = formatNumber(cell);
              return cellFormat;
            }
          },
          {
            currency_code: item.currency_code,
            data_field: "margin",
            column_name: "Margin",
            align: "right",
            formatter: (cell) => {
              let cellFormat = formatNumber(cell);
              return cellFormat;
            }
          }
        ];

        a = [
          ...a,
          ...items
        ]

        return item;
      });
      setArrayCurrencyColumn(a);
      // setIsLoading(false);
    }
  }, [listCurrency]);

  const formatNumber = (num) => {
    let cellFormat = (Math.round(num * 100)/100).toFixed(2);
    let formatNum = cellFormat?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return formatNum;
  }

  useEffect(()=> {
    getColumns();
  }, [getColumns]);

  useEffect(() => {
    const mapData = get(dataResponse, 'list', []);
    const mapDataSum = dataResponse?.sum;

    setData(mapData);
    setDataSum(mapDataSum)
  }, [dataResponse]);

  const columns = [
    {
      data_field: "period",
      column_name: "Period",
      align: "right",
      // formatter: (cell, row) => (
      //   <Link href={`/players/${row.id}/information`}>{cell}</Link>
      // ),
    },
    {
      data_field: "bet",
      column_name: "Bet",
      align: "right",
      formatter: (cell) => {
        let cellFormat = formatNumber(cell);
        return cellFormat;
      }
    },
    {
      data_field: "win",
      column_name: "Win",
      align: "right",
      formatter: (cell) => {
        let cellFormat = formatNumber(cell);
        return cellFormat;
      }
    },
    {
      data_field: "margin",
      column_name: "Margin",
      align: "right",
      formatter: (cell) => {
        let cellFormat = formatNumber(cell);
        return cellFormat;
      }
    },
    ...arrayCurrencyColumn,
  ];

  const handleChangePage = (page) => {
    let pageNew = page + 1;
    setObjFilter(prevState => ({
      ...prevState,
      page: pageNew,
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setObjFilter(prevState => ({
      ...prevState,
      page: 1,
      page_size: parseInt(event.target.value, 10)
    }));
  };

  const onSubmit = async (data) => {
    // console.log(data)
    
    setObjFilter(prevState => ({
      ...prevState,
      ...data,
    }));
  };

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <Fragment>
      {isLoading && <Loading />}
      <GamesSummaryFilter onSubmitProps={onSubmit} setObjFilter={setObjFilter} />
      <ContentCardPage>
        {/* <ExportExcel
          excelData={excelData}
        /> */}
        <TableComponentGamesSummary
          data={data}
          listCurrency={listCurrency[0]?.currency_entry_list}
          dataType='GamesSummary'
          dataSum={dataSum}
          columns={columns}
          page_size = { Number(objFilter.page_size) }
          types="RoleList"
          pagination={{
            total_size,
            page: Number(objFilter.page),
            page_size: Number(objFilter.page_size),
          }}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </ContentCardPage>
    </Fragment>
  );
};

export default GamesSummary;
