import { Fragment, useEffect, useState } from "react";
import moment from "moment";
import toString from "lodash/toString";

import useRouter from "src/utils/hooks/useRouter";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import PlayerInformation from "src/components/PlayerInformation/PlayerInformation";
import { formatNumberWithComma } from "src/utils/function";
import get from 'lodash/get';
import GameTransactionsFilter from "./GameTransactionsFilter";
import useFetchData from "src/utils/hooks/useFetchData";
import Loading from "src/components/shared/Loading/Loading";
import NoPermissionPage from "src/components/NoPermissionPage/NoPermissionPage";
import TransactionDetails from "src/components/TransactionDetails/TransactionDetails";
// import { Link } from "react-router-dom";

const GameTransactions = () => {
  const router = useRouter();
  // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

  const pad = (number, length) => {
    let str = "" + number
    while (str.length < length) {
        str = '0' + str
    }
    return str;
  }

  let tz = new Date().getTimezoneOffset()
  tz = ((tz <0 ? '+' : '-') + pad(parseInt(Math.abs(tz / 60)), 2) + pad(Math.abs(tz % 60), 2));
  // console.log(router.query);
  const [objFilter, setObjFilter] = useState({
    round_id: "",
    time_zone: tz,
    sort_field: "start_at",
    sort_order: "DESC",
    player_id: Number(router.query.id),
    game_type: "",
    game_name: "",
    from_date: moment().format("DD/MM/YYYY 00:00"),
    to_date: moment().format("DD/MM/YYYY 23:59"),
    page: 1,
    page_size: 30,
    ...{
      ...router.query,
      player_id: router.query.id ? Number(router.query.id) : 0,
    },
  });

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/transaction/player_game_history',
    objFilter
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    const mapData = get(dataResponse, 'list', []);
    setData(mapData);
  }, [dataResponse]);

  // useEffect(() => {
  //   console.log(objFilter);
  // }, [objFilter]);

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
      data_field: "jackpot",
      column_name: "Jackpot",
      align: "right",
      formatter: cell => formatNumberWithComma(toString(cell))
    },
    {
      data_field: "balance_after",
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
    }
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

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <Fragment>
      {isLoading && <Loading />}
      <PlayerInformation />
      <div style={{ fontWeight: '600', fontSize: '22px'}}>Game Transaction</div>
      
      <GameTransactionsFilter onSubmitProps={onSubmit} setObjFilter={setObjFilter} />
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
    </Fragment>
  );
};

export default GameTransactions;
