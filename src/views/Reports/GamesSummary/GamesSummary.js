/* eslint-disable arrow-body-style */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import get from 'lodash/get';
import moment from "moment";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import useRouter from "utils/hooks/useRouter";
import useFetchData from "utils/hooks/useFetchData";
import NoPermissionPage from "views/NoPermissionPage/NoPermissionPage";
import Loading from "views/Loading/Loading";
import MainCard from "ui-component/cards/MainCard";
import TableComponentGamesSummary from "views/TableComponent/TableComponentGamesSummary";
import GamesSummaryFilter from "./GamesSummaryFilter";

const GamesSummary = () => {
  const router = useRouter();
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionReports = {};
  permission_groups?.map((item) => {
    if (item.name === 'Reports') {
      arrPermissionReports = (item.permissions[0]);
    }
    return item.name === 'Reports'
  });

  let brand_router = [];

  if (router?.query?.brand_ids === 0) {
    brand_router = [];
  }

  if (router?.query?.brand_ids) {
    if (Array.isArray(router?.query?.brand_ids)) {
      brand_router = (router.query.brand_ids || [router.query.brand_ids]).map((item) => {
        return Number(item);
      });
    } else {
      brand_router = [Number(router.query.brand_ids)];
    }
  };

  let product_ids_router = [];

  if (router?.query?.product_ids === 0) {
    product_ids_router = [];
  }

  if (router?.query?.product_ids) {
    if (Array.isArray(router?.query?.product_ids)) {
      product_ids_router = (router.query.product_ids || [router.query.product_ids]).map((item) => {
        return Number(item);
      });
    } else {
      product_ids_router = [Number(router.query.product_ids)];
    }
  };

  const [objFilter, setObjFilter] = useState({
    product_ids: [],
    from_date: moment().startOf('month').format("DD/MM/YYYY"),
    to_date: moment().endOf('month').format("DD/MM/YYYY"),
    option: "day",
    ...{
      ...router.query,
      brand_ids: router.query.brand_ids ? brand_router : [],
      product_ids: router.query.product_ids ? product_ids_router : [],
    }
  });

  const [data, setData] = useState([]);
  const [dataSum, setDataSum] = useState({});
  const [arrayCurrencyColumn, setArrayCurrencyColumn] = useState([]);
  const [listCurrency, setListCurrency] = useState([]);

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/report/games_reports',
    objFilter
  );

  useEffect(() => {
    const mapData = get(dataResponse, 'sum', []);
    setListCurrency(mapData?.currency_entry_list);
  }, [dataResponse]);

  const getColumns = useCallback(async () => {
    // if (listCurrency && arrayCurrencyColumn.length <= 0) {
      let arr = [];
      if (listCurrency?.length > 0) {
        listCurrency?.map((item) => {
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
  
          arr = [
            ...arr,
            ...items
          ]
  
          return item;
        });
      }
      
      setArrayCurrencyColumn(arr);
    // }
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

  useEffect(() => {
    document.title = 'Games Summary';
  }, []);

  useEffect(() => {
    console.log(objFilter);
  }, [objFilter]);

  const columns = [
    {
      data_field: "period",
      column_name: "Period",
      align: "left",
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
    
    setObjFilter(prevState => ({
      ...prevState,
      ...data,
    }));
  };

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  if (arrPermissionReports?.none) {
    return <Navigate to="/404" />;
  }
  
  return (
    <>
      {isLoading && <Loading />}
      <GamesSummaryFilter onSubmitProps={onSubmit} setObjFilter={setObjFilter} />
      <MainCard sx={{mt: '15px'}}>
        <TableComponentGamesSummary
          data={data}
          listCurrency={listCurrency}
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
      </MainCard>
    </>
  );
};

export default GamesSummary;
