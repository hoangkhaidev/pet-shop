/* eslint-disable prefer-template */
/* eslint-disable no-else-return */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable spaced-comment */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import get from 'lodash/get';
import moment from "moment";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import GameRTPSummaryFilter from "./GameRTPSummaryFilter";
import useRouter from "utils/hooks/useRouter";
import useFetchData from "utils/hooks/useFetchData";
import NoPermissionPage from "views/NoPermissionPage/NoPermissionPage";
import Loading from "views/Loading/Loading";
import MainCard from "ui-component/cards/MainCard";
import TableComponentGamesRTPSummary from "views/TableComponent/TableComponentGamesRTPSummary";

const GameRTPSummary = () => {
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
  const [objFilter, setObjFilter] = useState({
    product_ids: [],
    game_names: [],
    from_date: moment().subtract(1, 'year').format("DD/MM/YYYY"),
    to_date: moment().format("DD/MM/YYYY"),
    ...router.query,
  });

  const [data, setData] = useState([]);
  const [dataSum, setDataSum] = useState({});
  const [arrayCurrencyColumn, setArrayCurrencyColumn] = useState([]);
  const [listCurrency, setListCurrency] = useState([]);

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/report/games_rtp_summary',
    objFilter
  );

  useEffect(() => {
    const mapData = get(dataResponse, 'list', []);
    setListCurrency(mapData);
   
  }, [dataResponse]);

  const getColumns = useCallback(async () => {
    if (listCurrency && arrayCurrencyColumn.length <= 0) {
      let arr = [];
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

        arr = [
          ...arr,
          ...items
        ]

        return item;
      });
      setArrayCurrencyColumn(arr);
    }
  }, [listCurrency]);

  const formatNumber = (num) => {
    let cellFormat = (Math.round(num * 100)/100).toFixed(2);
    let formatNum = cellFormat?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return formatNum;
  }

  useEffect(() => {
    document.title = 'Games RTP Summary';
  }, [router]);

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
      data_field: "game_code",
      column_name: "Game Code",
      align: "left",
    },
    {
      data_field: "game_name",
      column_name: "Game Name",
      align: "left",
    },
    {
      data_field: "rtp",
      column_name: "Game RTP",
      align: "right",
      formatter: (cell) => {
        let cellFormat = formatNumber(cell);
        if (cell > 100) {
          return <b style={{color: 'red'}}>{cellFormat}%</b>;
        } else {
          return cellFormat + '%';
        }
      }
    },
    {
      data_field: "bets",
      column_name: "Bet",
      align: "right",
      formatter: (cell, row) => {
        let cellFormat = formatNumber(cell);
        if (row.rtp > 100) {
          return <b style={{color: 'red'}}>{cellFormat}</b>;
        } else {
          return cellFormat;
        }
      }
    },
    {
      data_field: "wins",
      column_name: "Win",
      align: "right",
      formatter: (cell, row) => {
        let cellFormat = formatNumber(cell);
        if (row.rtp > 100) {
          return <b style={{color: 'red'}}>{cellFormat}</b>;
        } else {
          return cellFormat;
        }
      }
    },
    {
      data_field: "margins",
      column_name: "Margin",
      align: "right",
      formatter: (cell, row) => {
        let cellFormat = formatNumber(cell);
        if (row.rtp > 100) {
          return <b style={{color: 'red'}}>{cellFormat}</b>;
        } else {
          return cellFormat;
        }
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

  if (arrPermissionReports.none) {
    return <Navigate to="/404" />;
  }
  
  return (
    <>
      {isLoading && <Loading />}
      <GameRTPSummaryFilter onSubmitProps={onSubmit} setObjFilter={setObjFilter} />
      <MainCard sx={{mt: '15px'}}>
        <TableComponentGamesRTPSummary
          data={data}
          listCurrency={listCurrency[0]?.currency_entry_list}
          dataType='GamesSummaryRTP'
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

export default GameRTPSummary;
