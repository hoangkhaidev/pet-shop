/* eslint-disable jsx-a11y/control-has-associated-label */
import { Fragment, useEffect, useState } from "react";
import moment from "moment";
import queryString from 'query-string';
import useRouter from "src/utils/hooks/useRouter";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import { formatNumberWithComma } from "src/utils/function";
import get from 'lodash/get';
import GamesFilterHistory from "./GamesFilterHistory";
// import useFetchData from "src/utils/hooks/useFetchData";
// import Loading from "src/components/shared/Loading/Loading";
// import NoPermissionPage from "src/components/NoPermissionPage/NoPermissionPage";
import api from "src/utils/api";
import Link from '@material-ui/core/Link';
import { toast } from "react-toastify";

const GamesListHistory = () => {
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
    sort_field: "round_date",
    sort_order: "DESC",
    player_id: "",
    round_id: "",
    brand_id: 1,
    game_type: "",
    game_name: "",
    nick_name: "",
    time_zone: tz,
    from_date:  moment().format("DD/MM/YYYY"),
    to_date: moment().format("DD/MM/YYYY"),
    ...router.query
  });

  useEffect(() => {
    const stringified = queryString.stringify(objFilter);
    let url = `${router.location.pathname}?${stringified}`;
    router.navigate(url);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objFilter]);

  const [data, setData] = useState([]);

  const onSubmit = async (data) => {
    setObjFilter(prevState => ({
      ...prevState,
      ...data,
    }));

    const dataForm = {
      ...objFilter,
      ...data
    };

    // console.log(JSON.stringify(objFilter));
    try {
        const response = await api.post('/api/transaction/game_history_group', dataForm);
        if (get(response, 'success', false)) {
          // console.log(response)
          const mapData = get(response, 'data', []);
          setData(mapData);
        } else {
          if (response.err === "err:json_error") {
            if (response.data.player_id === "want int, got string") toast.warn('Player ID is a number');
          }
          if (response.err === "err:not_enough_arguments") toast.warn('Please select 1 of the 3 fields player ID, nickname round ID');
          if (response.err === "err:member_not_found") toast.warn('Player not found');
        }
    } catch (e) {
      console.log('e', e);
    }
  };

  const columns = [
    {
      data_field: "game_name",
      column_name: "Game",
      align: "left",
      formatter: (cell, row) => {
        // console.log(router.query.player_id)
        // console.log(row)
        return (
          <Link href={`/players/game-history?brand_id=1&from_date=${moment().format("DD/MM/YYYY 00:00")}&game_name=${row.game_name}&game_type=&nick_name=&page=1&page_size=30&player_id=${router.query.player_id}&round_id=&sort_field=start_at&sort_order=DESC&time_zone=${time_zoneReplace}&to_date=${moment().format("DD/MM/YYYY 23:59")}`}>{cell}</Link>
        )
      }
    },
    {
      data_field: "round_date",
      column_name: "Round Date",
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

  // useEffect(() => {
  //   console.log(objFilter);
  // }, [objFilter]);

  return (
    <Fragment>
      <GamesFilterHistory onSubmitProps={onSubmit} setObjFilter={setObjFilter} />
      <TitlePage title="Games" />
      <TableComponent
        data={data}
        columns={columns}
        types="RoleList"
        pagination={{
          page: Number(objFilter.page),
          page_size: Number(objFilter.page_size),
        }}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Fragment>
  );
};

export default GamesListHistory;
