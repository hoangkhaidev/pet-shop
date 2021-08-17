import { Fragment, useEffect, useState } from "react";
// import Link from "@material-ui/core/Link";
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import useRouter from "src/utils/hooks/useRouter";
import useFetchData from "src/utils/hooks/useFetchData";
import get from 'lodash/get';
import moment from "moment";
import NoPermissionPage from "src/components/NoPermissionPage/NoPermissionPage";
import Loading from "src/components/shared/Loading/Loading";
import { ExportExcelPlayersBusinessSummary } from "./ExportExcelPlayersBusinessSummary";
import { useSelector } from "react-redux";
import PlayersBusinessSummaryFilter from "./PlayersBusinessSummaryFilter";

const PlayersBusinessSummary = () => {
  const router = useRouter();
  const roleUser = useSelector((state) => state.roleUser);
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
      company_total: formatNumber(mapDataSum?.company_total),
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
      company_total: formatNumber(mapDataAverage?.company_total),
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
        company_total: formatNumber(item.company_total),
      });
    });

    forExcel.push(sum, average);

    setExcelData(forExcel);
    setData(mapData);
    setDataSum(mapDataSum)
  }, [dataResponse]);

  useEffect(() => {
    console.log(dataResponse)
  }, [dataResponse]);

  const columns = [
    {
      data_field: "period",
      column_name: "Period",
      align: "right",
      // formatter: (cell, row) => {
      //   return (
      //     <Link href={`/reports/${row.identifier}/player_summary?option=${row.option}&brand_ids=${row.brand_ids}&product_ids=${row.product_ids}&from_date=${row.from_date}&to_date=${row.to_date}`}>{cell}</Link>
      //   );
      // }
    },
    {
      data_field: "player_id",
      column_name: "Player ID",
      align: "left"
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

  console.log(dataSum)

  return (
    <Fragment>
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
            total_size: Number(dataResponse?.list?.length),
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

export default PlayersBusinessSummary;
