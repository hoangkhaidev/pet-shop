/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import useRouter from "src/utils/hooks/useRouter";
import useFetchData from "src/utils/hooks/useFetchData";
import get from 'lodash/get';
import moment from "moment";
import NoPermissionPage from "src/components/NoPermissionPage/NoPermissionPage";
import Loading from "src/components/shared/Loading/Loading";
import { ExportExcelPlayersBusinessSummary } from "./ExportExcelPlayersBusinessSummary";
import { useDispatch, useSelector } from "react-redux";
import PlayersBusinessSummaryFilter from "./PlayersBusinessSummaryFilter";
import { setParentParam } from "src/features/parentParam/parentParam";

const PlayersBusinessSummary = () => {
  const router = useRouter();
  const dispatch = useDispatch();
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
    from_date: moment().format("DD/MM/YYYY"),
    to_date: moment().format("DD/MM/YYYY"),
    option: "day",
    sort_field: "period",
    sort_order: "desc",
    nick_name: "",
    game_type: "",
    game_name: "",
    search_by: "",
    search_by_option: "",
    value: "0",
    page: 1,
    page_size: 30,
    ...{
      ...router.query,
      player_id: router.query.player_id ? Number(router.query.player_id) : 0,
      brand_ids: router.query.brand_ids ? brand_router : [],
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
      align: "right",
    },
    {
      data_field: "player_id",
      column_name: "Player ID",
      align: "left",
      formatter: (cell, row) => {
        return (
          <Link href={`/players/${row.player_id}/information`}>{cell}</Link>
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

  return (
    <>
      {isLoading && <Loading />}
      <PlayersBusinessSummaryFilter onSubmitProps={onSubmit} setObjFilter={setObjFilter} />
      <ContentCardPage>
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
      </ContentCardPage>
    </>
  );
};

export default PlayersBusinessSummary;
