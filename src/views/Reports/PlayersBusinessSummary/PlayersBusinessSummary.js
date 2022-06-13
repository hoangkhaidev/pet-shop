/* eslint-disable prefer-const */
/* eslint-disable arrow-body-style */
/* eslint-disable radix */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import get from 'lodash/get';
import moment from "moment";
import { ExportExcelPlayersBusinessSummary } from "./ExportExcelPlayersBusinessSummary";
import { useDispatch, useSelector } from "react-redux";
import PlayersBusinessSummaryFilter from "./PlayersBusinessSummaryFilter";
import { Navigate } from "react-router";
import useRouter from "utils/hooks/useRouter";
import useFetchData from "utils/hooks/useFetchData";
import { clearPage, setPage, setParentParam } from "features/parentParam/parentParam";
import { Link } from "@mui/material";
import NoPermissionPage from "views/NoPermissionPage/NoPermissionPage";
import Loading from "views/Loading/Loading";
import MainCard from "ui-component/cards/MainCard";
import TableComponent from "views/TableComponent/TableComponent";

const PlayersBusinessSummary = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionReports = {};
  permission_groups?.map((item) => {
    if (item.name === 'Reports') {
      arrPermissionReports = (item.permissions[0]);
    }
    return item.name === 'Reports'
  });

  const pad = (number, length) => {
    let str = "" + number
    while (str.length < length) {
        str = '0' + str
    }
    return str;
  }

  let tz = new Date().getTimezoneOffset()
  tz = ((tz <0 ? '+' : '-') + pad(parseInt(Math.abs(tz / 60)), 2) + pad(Math.abs(tz % 60), 2));
  const time_zoneReplace = tz.replace('+', '%2B');

  const roleUser = useSelector((state) => state.roleUser);
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

  const [objFilter, setObjFilter] = useState({
    brand_ids: [],
    player_id: 0,
    option: "day",
    sort_field: "period",
    sort_order: "desc",
    nick_name: "",
    game_type: "",
    game_name: "",
    search_by: "",
    from_value: "",
    to_value: "",
    page: 1,
    page_size: 30,
    ...{
      ...router.query,
      player_id: router.query.player_id ? Number(router.query.player_id) : 0,
      brand_ids: router.query.brand_ids ? brand_router : [],
      from_date: router.query.from_date ? router.query.from_date  : moment().format("DD/MM/YYYY"),
      to_date: router.query.to_date ? router.query.to_date  : moment().format("DD/MM/YYYY"),
    },
  });

  const [data, setData] = useState([]);
  const [dataSum, setDataSum] = useState({});
  const [excelData, setExcelData] = useState([]);

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/report/players_business_reports',
    objFilter
  );

  const formatNumber = (num) => {
    let cellFormat = (Math.round(num * 100)/100).toFixed(2);
    let formatNum = cellFormat?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return formatNum;
  }

  useEffect(() => {
    dispatch(setParentParam(`${router.location.pathname}${router.location.search}`));
  }, [router]);

  useEffect(() => {
    dispatch(setPage("test"));
    return () => {
      dispatch(clearPage());
    }
  }, []);

  useEffect(() => {
    const mapData = get(dataResponse, 'list', []);
    const mapDataSum = dataResponse?.sum;
    let forExcel = [];
    let sum = {
      period: "",
      player_id: "",
      nick_name: "",
      sign_up_language: "",
      brand_name: "Total:",
      bet_native: formatNumber(mapDataSum?.bet_native),
      win_native: formatNumber(mapDataSum?.win_native),
      margin_native: formatNumber(mapDataSum?.margin_native),
      currency_code: mapDataSum?.currency_code,
      bet: formatNumber(mapDataSum?.bet),
      win: formatNumber(mapDataSum?.win),
      margin: formatNumber(mapDataSum?.margin),
    };

    mapData?.forEach((item) => {
      forExcel.push({
        period: item.period,
        player_id: item.player_id,
        nick_name: item.nick_name,
        sign_up_language: item.sign_up_language,
        brand_name: item.brand_name,
        bet_native: formatNumber(item.bet_native),
        win_native: formatNumber(item.win_native),
        margin_native: formatNumber(item.margin_native),
        currency_code: item.currency_code,
        bet: formatNumber(item.bet),
        win: formatNumber(item.win),
        margin: formatNumber(item.margin),
      });
    });

    forExcel.push(sum);

    setExcelData(forExcel);
    setData(mapData);
    setDataSum(mapDataSum)
  }, [dataResponse]);

  const columns = [
    {
      data_field: "period",
      column_name: "Period",
      align: "left",
      nowrap: true
    },
    {
      data_field: "player_id",
      column_name: "Player ID",
      align: "right",
      formatter: (cell, row) => {
        return (
          <Link href={`/players/${row.player_id}/information?from_date=${row.from_date}&game_name=&game_type=&id=${row.player_id}&page=1&page_size=30&player_id=${row.player_id}&round_id=&sort_field=start_date&sort_order=DESC&time_zone=${time_zoneReplace}&to_date=${row.to_date}`}>{cell}</Link>
        );
      }
    },
    {
      data_field: "nick_name",
      column_name: "Nickname",
      align: "left"
    },
    {
      data_field: "sign_up_language",
      column_name: "Sign Up Language",
      align: "left"
    },
    {
      data_field: "brand_name",
      column_name: "Brand",
      align: "left"
    },
    {
      data_field: "bet_native",
      column_name: "Bet",
      align: "right",
      formatter: (cell) => {
        let cellFormat = formatNumber(cell);
        return cellFormat;
      }
    },
    {
      data_field: "win_native",
      column_name: "Win",
      align: "right",
      formatter: (cell) => {
        let cellFormat = formatNumber(cell);
        return cellFormat;
      }
    },
    {
      data_field: "margin_native",
      column_name: "Margin",
      align: "right",
      formatter: (cell) => {
        let cellFormat = formatNumber(cell);
        return cellFormat;
      }
    },
    {
      data_field: "currency_code",
      column_name: "Currency",
      align: "left",
    },
    {
      data_field: "bet",
      column_name: "Bet ($)",
      align: "right",
      formatter: (cell) => {
        let cellFormat = formatNumber(cell);
        return cellFormat;
      }
    },
    {
      data_field: "win",
      column_name: "Win ($)",
      align: "right",
      formatter: (cell) => {
        let cellFormat = formatNumber(cell);
        return cellFormat;
      }
    },
    {
      data_field: "margin",
      column_name: "Margin ($)",
      align: "right",
      formatter: (cell) => {
        let cellFormat = formatNumber(cell);
        return cellFormat;
      }
    },
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
      <PlayersBusinessSummaryFilter onSubmitProps={onSubmit} setObjFilter={setObjFilter} />
      <MainCard sx={{mt: '15px'}}>
        <ExportExcelPlayersBusinessSummary
          excelData={excelData}
        />
        <TableComponent
          roleUser={roleUser.account_type}
          data={data}
          dataType='PlayersBusinessSummary'
          dataSum={dataSum}
          columns={columns}
          page = { Number(objFilter.page) }
          page_size = { Number(objFilter.page_size) }
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

export default PlayersBusinessSummary;
