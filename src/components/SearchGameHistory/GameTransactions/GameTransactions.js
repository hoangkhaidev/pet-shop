import { Fragment, useState } from "react";
import moment from "moment";
import toString from "lodash/toString";

import useRouter from "src/utils/hooks/useRouter";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import PlayerInformation from "src/components/PlayerInformation/PlayerInformation";
import { formatNumberWithComma } from "src/utils/function";

import GameTransactionsFilter from "./GameTransactionsFilter";

const fakeData = [
  {
    id: 1,
    round_id: "12345",
    start_date: moment().format("DD/MM/YYYY"),
    end_date: moment().format("DD/MM/YYYY"),
    bet: 1000000,
    win: 25000,
    jackpot: 300000,
    balance: 21298312,
    game_status: "In-Game",
    game: "COD"
  },
  {
    id: 2,
    round_id: "54321",
    start_date: moment().format("DD/MM/YYYY"),
    end_date: moment().format("DD/MM/YYYY"),
    bet: 1000000,
    win: 25000,
    jackpot: 300000,
    balance: 21298312,
    game_status: "In-Game",
    game: "COD"
  }
];

const GameTransactions = () => {
  const router = useRouter();
  const [objFilter, setObjFilter] = useState({
    round_id: "",
    time_zone: "",
    game_type: "",
    game_name: "",
    page: 1,
    page_size: 30,
    ...router.query
  });

  const columns = [
    {
      data_field: "round_id",
      column_name: "Round ID",
      align: "center",
    },
    {
      data_field: "start_date",
      column_name: "Start Date",
      align: "center"
    },
    {
      data_field: "end_date",
      column_name: "End Date",
      align: "center"
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
      data_field: "balance",
      column_name: "Balance",
      align: "right",
      formatter: cell => formatNumberWithComma(toString(cell))
    },
    {
      data_field: "game_status",
      column_name: "Game Status",
      align: "center",
    },
    {
      data_field: "game",
      column_name: "Game",
      align: "center"
    }
  ];

  const handleChangePage = (page) => {
    setObjFilter(prevState => ({
      ...prevState,
      page
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setObjFilter(prevState => ({
      ...prevState,
      page: 1,
      page_size: parseInt(event.target.value, 10)
    }));
  };

  return (
    <Fragment>
      <PlayerInformation />
      <GameTransactionsFilter />
      <TitlePage title="Game Transaction List" />
      <TableComponent
        data={fakeData}
        columns={columns}
        pagination={{
          total_size: fakeData.length,
          page: objFilter.page,
          page_size: objFilter.page_size
        }}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Fragment>
  );
};

export default GameTransactions;
