/* eslint-disable prefer-const */
/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import get from 'lodash/get';
import moment from "moment";
import BusinessSummaryFilter from "./BusinessSummaryFilter";
import { ExportExcel } from "./ExportExcel";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import useRouter from "utils/hooks/useRouter";
import useFetchData from "utils/hooks/useFetchData";
import { Link } from "@mui/material";
import NoPermissionPage from "views/NoPermissionPage/NoPermissionPage";
import Loading from "views/Loading/Loading";
import MainCard from "ui-component/cards/MainCard";
import TableComponent from "views/TableComponent/TableComponent";

const BusinessSummary = () => {
  const roleUser = useSelector((state) => state.roleUser);
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

  if (router?.query?.brand_id_router === 0) {
    brand_router = [];
  }

  if (router?.query?.brand_id_router) {
    if (Array.isArray(router?.query?.brand_id_router)) {
      brand_router = (router.query.brand_id_router || [router.query.brand_id_router]).map((item) => {
        return Number(item);
      });
    } else {
      brand_router = [Number(router.query.brand_id_router)];
    }
  };

  const [objFilter, setObjFilter] = useState({
    option: "day",
    sort_order: "desc",
    sort_field: "period",
    ...{
      ...router.query,
      brand_ids: router.query.brand_id_router ? brand_router : [],
      product_ids: router.query.product_ids ? [Number(router.query.product_ids)] : [],
      from_date: router.query.from_date_router ? router.query.from_date_router : moment().startOf('month').format("DD/MM/YYYY"),
      to_date: router.query.to_date_router ? router.query.to_date_router : moment().endOf('month').format("DD/MM/YYYY"),
    },
  });

  const [data, setData] = useState([]);
  const [dataSum, setDataSum] = useState({});
  const [dataAverage, setDataAverage] = useState({});
  const [excelData, setExcelData] = useState([]);

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/report/business_reports',
    objFilter
  );

  const formatNumber = (num) => {
    let cellFormat = (Math.round(num * 100)/100).toFixed(2);
    let formatNum = cellFormat?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return formatNum;
  }

  useEffect(() => {
    const mapData = get(dataResponse, 'list', []);
    const mapDataSum = dataResponse?.sum;
    const mapDataAverage = dataResponse?.average;
    let forExcel = [];
    let sum = {
      identifier: "Total:",
      new_players: mapDataSum?.new_players,
      bet: formatNumber(mapDataSum?.bet),
      win: formatNumber(mapDataSum?.win),
      margin: formatNumber(mapDataSum?.margin),
      players_played: mapDataSum?.players_played,
      play_sessions: mapDataSum?.play_sessions,
      operator_total: formatNumber(mapDataSum?.operator_total),
      company_total: roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub' ? formatNumber(mapDataSum?.company_total) : null,
    };
    let average = {
      identifier: "Average:",
      new_players: mapDataAverage?.new_players,
      bet: formatNumber(mapDataAverage?.bet),
      win: formatNumber(mapDataAverage?.win),
      margin: formatNumber(mapDataAverage?.margin),
      players_played: mapDataAverage?.players_played,
      play_sessions: mapDataAverage?.play_sessions,
      operator_total: formatNumber(mapDataAverage?.operator_total),
      company_total: roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub' ? formatNumber(mapDataAverage?.company_total) : null ,
    };

    mapData?.forEach((item) => {
      forExcel.push({
        identifier: item.identifier,
        new_players: item.new_players,
        bet: formatNumber(item.bet),
        win: formatNumber(item.win),
        margin: formatNumber(item.margin),
        players_played: item.players_played,
        play_sessions: item.play_sessions,
        operator_total: formatNumber(item.operator_total),
        company_total: roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub' ? formatNumber(item.company_total) : null,
      });
    });

    forExcel.push(sum, average);

    setExcelData(forExcel);
    setData(mapData);
    setDataSum(mapDataSum)
    setDataAverage(mapDataAverage)
  }, [dataResponse, roleUser]);

  useEffect(() => {
    document.title = 'Business Summary';
  }, []);

  const columns = [
    {
      data_field: "identifier",
      column_name: objFilter.option === 'brand' ? "Brand" : "Period",
      align: "left",
      formatter: (cell, row) => {
        let brandRouter = '';
        
        if (router?.query?.brand_ids) {
          if (Array.isArray(router?.query?.brand_ids)) {
            brand_router = (router.query.brand_ids || [router.query.brand_ids]).map((item) => {
              brandRouter += `&brand_id_router=${item}`;
              return item;
            });
          } else {
            brandRouter = `&brand_id_router=${router.query.brand_ids}`;
          }
        }
        
        let form_date_router = router.query.from_date ? router.query.from_date : moment().startOf('month').format("DD/MM/YYYY");
        let to_date_router = router.query.to_date ? router.query.to_date : moment().endOf('month').format("DD/MM/YYYY");

        return (
          <Link href={`/reports/${row.identifier}/player_summary?option=${row.option}${brandRouter}&product_ids=${row.product_ids}&from_date_router=${form_date_router}&to_date_router=${to_date_router}&from_date=${row.from_date}&to_date=${row.to_date}&brand_ids=${row.brand_ids}`}>{cell}</Link>
        );
      }
    },
    {
      data_field: "new_players",
      column_name: "New Players",
      align: "right"
    },
    {
      data_field: "bet",
      column_name: "Bets ($)",
      align: "right",
      formatter: (cell) => {
        let cellFormat = formatNumber(cell);
        return cellFormat;
      }
    },
    {
      data_field: "win",
      column_name: "Wins ($)",
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
    {
      data_field: "players_played",
      column_name: "Players",
      align: "right"
    },
    {
      data_field: "play_sessions",
      column_name: "Play Sessions",
      align: "right"
    },
    {
      data_field: "operator_total",
      column_name: "Operator Total ($)",
      align: "right",
      formatter: (cell) => {
        let cellFormat = formatNumber(cell);
        return cellFormat;
      }
    },
    roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub' ? {
      data_field: "company_total",
      column_name: "Company Total ($)",
      align: "right",
      formatter: (cell) => {
        let cellFormat = formatNumber(cell);
        return cellFormat;
      }
    } : {}
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
      <BusinessSummaryFilter onSubmitProps={onSubmit} setObjFilter={setObjFilter} />
      <MainCard sx={{mt: '15px'}}>
        <ExportExcel
          excelData={excelData}
        />
        <TableComponent
          roleUser={roleUser.account_type}
          data={data}
          dataType='BusinessSummary'
          dataSum={dataSum}
          dataAverage={dataAverage}
          columns={columns}
          page = { Number(objFilter.page) }
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

export default BusinessSummary;
