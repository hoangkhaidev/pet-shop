/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import moment from "moment";
import toString from "lodash/toString";
import useRouter from "src/utils/hooks/useRouter";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import { formatNumberWithComma } from "src/utils/function";
import get from 'lodash/get';
import TransactionDetails from "src/components/TransactionDetails/TransactionDetails";
import FailedTransactionFilter from "./FailedTransactionFilter";
import ButtonResume from "./ButtonResume";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import useFetchData from "src/utils/hooks/useFetchData";

const FailedTransaction = () => {
  const router = useRouter();
  const [refreshData, setRefreshData] = useState(null);
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionFailed = {};
  permission_groups?.map((item) => {
    if (item.name === 'Global') {
      arrPermissionFailed = (item.permissions[1]);
    }
    return item.name === 'Global'
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

  const [objFilter, setObjFilter] = useState({
    page: 1,
    page_size: 30,
    sort_field: "end_date",
    sort_order: "desc",
    player_id: "",
    brand_ids: [],
    nick_name: "",
    round_id: "",
    time_zone: tz,
    from_date: moment().subtract(29, 'days').format("DD/MM/YYYY 00:00"),
    to_date: moment().format("DD/MM/YYYY 23:59"),
    status_list : [],
    ...{
      ...router.query,
      player_id: router.query.player_id ? Number(router.query.id) : 0,
    },
  });

  const [data, setData] = useState([]);

  const { dataResponse, total_size } = useFetchData(
    `/api/global/brand_detail/failed_transactions`,
    objFilter,
    [refreshData]
  );
  
  useEffect(() => {
    const mapData = get(dataResponse, 'list', []);
    setData(mapData);
  }, [dataResponse]);

  const columns = [
    {
      data_field: "round_id",
      column_name: "Round ID",
      align: "left",
      formatter: (cell, row) => {
        return (
          <TransactionDetails roundId={cell} />
        );
      },
    },
    {
      data_field: "start_date",
      column_name: "Start Date",
      align: "left"
    },
    {
      data_field: "end_date",
      column_name: "End Date",
      align: "left"
    },
    {
      data_field: "bet",
      column_name: "Bet",
      align: "right",
      formatter: cell => formatNumberWithComma(toString(cell))
    },
    {
      data_field: "win",
      column_name: "Win",
      align: "right",
      formatter: cell => formatNumberWithComma(toString(cell))
    },
    {
      data_field: "new_balance",
      column_name: "Balance",
      align: "right",
      formatter: cell => formatNumberWithComma(toString(cell))
    },
    {
      data_field: "status",
      column_name: "Game Status",
      align: "left",
    },
    {
      data_field: "game_name",
      column_name: "Game",
      align: "left"
    },
    arrPermissionFailed?.full ? (
      {
        data_field: 'process_status',
        column_name: 'Action',
        align: 'left',
        formatter: (cell, row) => {
          return <ButtonResume cell={cell} row={row} setRefreshData={setRefreshData}/>
        }
      }
    ) :
    arrPermissionFailed?.edit ? (
      {
        data_field: 'process_status',
        column_name: 'Action',
        align: 'left',
        formatter: (cell, row) => {
          return <ButtonResume cell={cell} row={row} setRefreshData={setRefreshData} />
        }
      }
    ) : {}
  ];

  const onSubmit = async (data) => {
    setObjFilter(prevState => ({
      ...prevState,
      ...data,
    }));
  };

  const handleChangePage = async (page) => {
    let pageNew = page + 1;
    setObjFilter(prevState => ({
      ...prevState,
      page: pageNew,
    }));
  };

  const handleChangeRowsPerPage = async (event) => {
    setObjFilter(prevState => ({
      ...prevState,
      page: 1,
      page_size: parseInt(event.target.value, 10)
    }));
  };

  if (arrPermissionFailed.none) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      <TitlePage title="Failed Transactions" />
      <FailedTransactionFilter onSubmitProps={onSubmit} setObjFilter={setObjFilter} />
      <TableComponent
        data={data}
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
    </>
  );
};

export default FailedTransaction;
