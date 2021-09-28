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
import BusinessSummaryFilter from "./BusinessSummaryFilter";
import { ExportExcel } from "./ExportExcel";
import { useSelector } from "react-redux";

const BusinessSummary = () => {
  const router = useRouter();
  const roleUser = useSelector((state) => state.roleUser);
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
    setDataAverage(mapDataAverage)
  }, [dataResponse]);

  const columns = [
    {
      data_field: "identifier",
      column_name: objFilter.option === 'brand' ? "Brand" : "Period",
      align: "right",
      formatter: (cell, row) => {
        // console.log(row)
        return (
          <Link href={`/reports/${row.identifier}/player_summary?option=${row.option}&brand_ids=${row.brand_ids}&product_ids=${row.product_ids}&from_date=${row.from_date}&to_date=${row.to_date}`}>{cell}</Link>
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
    roleUser.account_type === 'admin' ? {
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

  // useEffect(() => {
  //   console.log(objFilter);
  // }, [objFilter])

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
    <>
      {isLoading && <Loading />}
      <BusinessSummaryFilter onSubmitProps={onSubmit} setObjFilter={setObjFilter} />
      <ContentCardPage>
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
      </ContentCardPage>
    </>
  );
};

export default BusinessSummary;
