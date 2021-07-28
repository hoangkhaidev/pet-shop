/* eslint-disable jsx-a11y/control-has-associated-label */
import { Fragment, useEffect, useState } from "react";
import moment from "moment";

import useRouter from "src/utils/hooks/useRouter";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import { formatNumberWithComma } from "src/utils/function";
// import get from 'lodash/get';
import GamesFilter from "./GamesFilter";
import useFetchData from "src/utils/hooks/useFetchData";
import Loading from "src/components/shared/Loading/Loading";
import NoPermissionPage from "src/components/NoPermissionPage/NoPermissionPage";
import Link from '@material-ui/core/Link';

// const fakeData = [
//   {
//     id: 1,
//     game: "COD",
//     start_time: moment().format("DD/MM/YYYY"),
//     sessions_count: 1,
//     bet: 100000,
//     win: 2000000
//   },
//   {
//     id: 2,
//     game: "PUBG",
//     start_time: moment().format("DD/MM/YYYY"),
//     sessions_count: 2,
//     bet: 100000,
//     win: 2000000
//   },
// ];

const GamesList = () => {
  const router = useRouter();

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

  const [objFilter, setObjFilter] = useState({
    round_id: "",
    time_zone: tz,
    game_type: "",
    game_name: "",
    sort_field: "start_at",
    sort_order: "DESC",
    player_id: Number(router.query.id),
    from_date:  moment().format("DD/MM/YYYY"),
    to_date: moment().format("DD/MM/YYYY"),
  });

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/transaction/player_game_history_group',
    objFilter
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataResponse);
  }, [dataResponse]);

  useEffect(() => {
    console.log(objFilter);
  }, [objFilter]);

  const onSubmit = async (data) => {
    console.log(data)
    setObjFilter(prevState => ({
      ...prevState,
      ...data,
    }));
  };

  const columns = [
    {
      data_field: "game_name",
      column_name: "Game",
      align: "left",
      formatter: (cell, row) => {
        console.log(time_zoneReplace);
        return (
          <Link href={`/players/${router.query.id}/information?from_date=${moment().format("DD/MM/YYYY 00:00")}&game_name=${row.game_name}&game_type=&page=1&page_size=30&player_id=3546&round_id=&sort_field=start_at&sort_order=DESC&time_zone=${time_zoneReplace}&to_date=${moment().format("DD/MM/YYYY 23:59")}`}>{cell}</Link>
        )
      }
    },
    {
      data_field: "round_date",
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

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <Fragment>
      {isLoading && <Loading />}
      <GamesFilter onSubmitProps={onSubmit} setObjFilter={setObjFilter} />
      <TitlePage title="Games" />
      <TableComponent
        data={data}
        columns={columns}
        types="RoleList"
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

export default GamesList;
