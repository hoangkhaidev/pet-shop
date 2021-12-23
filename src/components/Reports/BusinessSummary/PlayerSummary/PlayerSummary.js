/* eslint-disable react-hooks/exhaustive-deps */
import { Button, makeStyles, Typography } from "@material-ui/core";
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { Navigate, useNavigate } from "react-router";
import useFetchData from "src/utils/hooks/useFetchData";
import { useEffect, useState } from "react";
import useRouter from "src/utils/hooks/useRouter";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import Link from "@material-ui/core/Link";
import get from 'lodash/get';
// import moment from "moment";
import NoPermissionPage from "src/components/NoPermissionPage/NoPermissionPage";
import Loading from "src/components/shared/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { ExportExcelPlayerSummary } from "./ExportExcelPlayerSummary";
import { clearPage, setPage, setParentParam } from "src/features/parentParam/parentParam";
import PlayerSummaryFilter from "./PlayerSummaryFilter";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  playerInfoName: {
    display: "flex",
    alignItems: "center"
  },
  playerNameDisplay: {
    textTransform: "uppercase",
    marginLeft: 16,
    marginRight: '5px',
    fontWeight: "bold"
  },
  profileNameDisplay: {
    fontWeight: "bold"
  },
  infoContainer: {
    marginTop: 16,
    justifyContent: "space-between"
  },
  infoColumn: {
    display: "flex",
    flexDirection: "column"
  },
  infoLine: {
    display: "flex",
    alignItems: "center",
    marginBottom: '2rem',
  },
  labelLine: {
    fontWeight: "bold",
    width: '40%',
  },
  w50: {
    width: '60%',
    lineBreak: 'anywhere',
  },
  titleTransaction: {
    fontWeight: '600 !important',
  }
 
}));

const PlayerSummary = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roleUser = useSelector((state) => state.roleUser);
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionReports = {};
  permission_groups?.map((item) => {
    if (item.name === 'Reports') {
      arrPermissionReports = (item.permissions[0]);
    }
    return item.name === 'Reports'
  });
  
  const router = useRouter();

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
    from_date: router.query.from_date,
    to_date: router.query.to_date,
    sort_field: "margin_native",
    sort_order: "desc",
    page: 1,
    page_size: 30,
    option: router.query.option,
    ...{
      ...router.query,
      brand_ids: router.query.brand_ids ? brand_router : [],
      product_ids: router.query.product_ids ? [Number(router.query.product_ids)] : [],
    },
  });

  const [data, setData] = useState([]);
  const [dataSum, setDataSum] = useState({});
  const [excelData, setExcelData] = useState([]);
  const [des, setDes] = useState('');

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

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/report/players_reports',
    objFilter
  );

  const formatNumber = (num) => {
    let cellFormat = (Math.round(num * 100)/100).toFixed(2);
    let formatNum = cellFormat?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return formatNum;
  };

  useEffect(() => {
    dispatch(setParentParam(`${router.location.pathname}${router.location.search}`));
  }, [router]);

  useEffect(() => {
    dispatch(setPage("infoPlayer"));
    return () => {
      dispatch(clearPage('infoPlayer'));
    }
  }, []);

  useEffect(() => {
    const mapData = get(dataResponse, 'list', []);
    const mapDataSum = dataResponse?.sum;
    setDes(dataResponse?.sum?.description);
    let forExcel = [];
    let sum = {
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
      operator_total: formatNumber(mapDataSum?.operator_total),
      company_total: formatNumber(mapDataSum?.company_total),
    };

    mapData?.forEach((item) => {
      forExcel.push({
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
        operator_total: formatNumber(item.operator_total),
        company_total: formatNumber(item.company_total),
      });
    });

    forExcel.push(sum);

    setExcelData(forExcel);
    setData(mapData);
    setDataSum(mapDataSum);
  }, [dataResponse]);

  const columns = [
    {
      data_field: "player_id",
      column_name: "Player ID",
      align: "left",
      formatter: (cell, row) => {
        // let timeFrom_date = moment().format("DD/MM/YYYY");
        // let timeTo_date = moment().format("DD/MM/YYYY");
        // if (router.query.option === 'day') {
        //   timeFrom_date = router.query.id;
        //   timeTo_date = router.query.id;
        // } else {
        //   timeFrom_date = router.query.from_date;
        //   timeTo_date = router.query.to_date;
        // }
        // console.log(router);

        return (
          <Link href={`/players/${row.player_id}/information?from_date=${router.query.from_date}&game_name=&game_type=&id=${row.player_id}&page=1&page_size=30&player_id=${row.player_id}&round_id=&sort_field=start_date&sort_order=DESC&time_zone=${time_zoneReplace}&to_date=${router.query.to_date}`}>{cell}</Link>
        )
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
      formatter: (cell) => {
        return cell;
      }
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

  const onSubmit = async (data) => {
    
    setObjFilter(prevState => ({
      ...prevState,
      ...data,
    }));
  };

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

  const onCancel = () => {
    navigate(`/reports/business_summary${router?.location?.search}`);
  }

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }
  
  if (arrPermissionReports.none) {
    return <Navigate to="/404" />;
  }

  return (
    <div className={classes.root}>
      <div style={{ padding: '25px' }}>
        {isLoading && <Loading />}
        <Typography 
          variant="h6" 
          gutterBottom 
          className={classes.titleTransaction}
        >
          Player Summary
        </Typography>
        <span>
          {des}
          {/* {router.query.option === 'day' ? `Total by day over: ${router.query.id}` : '' }
          {router.query.option === 'week' ? `Total by week from: ${router.query.from_date_row} to: ${router.query.to_date_row}` : '' }
          {router.query.option === 'month' ? `Total by month from: ${router.query.from_date_row} to: ${router.query.to_date_row}` : '' }
          {router.query.option === 'year' ? `Total by year from: ${router.query.from_date_row} to: ${router.query.to_date_row}` : '' } */}
        </span>
        <Button
          startIcon={<ClearAllIcon fontSize="small" />}
          variant="contained"
          type="button"
          color="secondary"
          style={{ marginTop: '20px', display: 'flex' }}
          onClick={() => onCancel()}
        >
          Back
        </Button>
        <PlayerSummaryFilter onSubmitProps={onSubmit} />
        <ExportExcelPlayerSummary
          excelData={excelData}
        />
        <TableComponent
          data={data}
          dataType='PlayerSummary'
          dataSum={dataSum}
          columns={columns}
          roleUser={roleUser.account_type}
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
      </div>
    </div>
  );
};

export default PlayerSummary;
