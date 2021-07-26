/* eslint-disable jsx-a11y/control-has-associated-label */
import { Fragment, useState } from "react";
import moment from "moment";

import useRouter from "src/utils/hooks/useRouter";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import { formatNumberWithComma } from "src/utils/function";

import GamesFilter from "./GamesFilter";

const fakeData = [
  {
    id: 1,
    game: "COD",
    start_time: moment().format("DD/MM/YYYY"),
    sessions_count: 1,
    bet: 100000,
    win: 2000000
  },
  {
    id: 2,
    game: "PUBG",
    start_time: moment().format("DD/MM/YYYY"),
    sessions_count: 2,
    bet: 100000,
    win: 2000000
  },
];

const GamesList = () => {
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
      data_field: "game",
      column_name: "Game",
      align: "left"
    },
    {
      data_field: "start_time",
      column_name: "Round Data",
      align: "left"
    },
    {
      data_field: "sessions_count",
      column_name: "Sessions Count",
      align: "right"
    },
    {
      data_field: "bet",
      column_name: "Bet",
      align: "right",
      formatter: (cell) => formatNumberWithComma(cell)
    },
    {
      data_field: "win",
      column_name: "Win",
      align: "right",
      formatter: (cell) => formatNumberWithComma(cell)
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
      <GamesFilter />
      <TitlePage title="Games" />
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

export default GamesList;
