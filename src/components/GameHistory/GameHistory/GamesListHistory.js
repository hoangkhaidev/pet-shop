/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import queryString from 'query-string';
import useRouter from "src/utils/hooks/useRouter";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import { formatNumberWithComma } from "src/utils/function";
import get from 'lodash/get';
import GamesFilterHistory from "./GamesFilterHistory";
import api from "src/utils/api";
import Link from '@material-ui/core/Link';
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const GamesListHistory = () => {
  const router = useRouter();
  const { t } = useTranslation();

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

  //format time router
  let formDateRouter = moment().format("DD/MM/YYYY");
  if (router.query.from_date) {
    let new_from_date = moment(router.query.from_date, "DD/MM/YYYY");
    formDateRouter = moment(new_from_date).format("DD/MM/YYYY");
  }

  let toDateRouter = moment().format("DD/MM/YYYY");
  if (router.query.to_date) {
    let new_from_date = moment(router.query.to_date, "DD/MM/YYYY");
    toDateRouter = moment(new_from_date).format("DD/MM/YYYY");
  }

  const [objFilter, setObjFilter] = useState({
    sort_field: "round_date",
    sort_order: "desc",
    ...{
      ...router.query,
      player_id: router.query.id ? Number(router.query.id) : "",
      brand_id: router.query.brand_id ? Number(router.query.brand_id) : "",
      game_name: router.query.game_name ? router.query.game_name : "",
      game_type: router.query.game_type ? router.query.game_type : "",
      time_zone: router.query.time_zone ? router.query.time_zone : tz,
      round_id: router.query.round_id ? router.query.round_id : "",
      nick_name: router.query.nick_name ? router.query.nick_name : "",
      from_date: formDateRouter,
      to_date: toDateRouter,
    },
  });

  const clickRef = useRef(0);

  useEffect(() => {
    if (router.query.player_id) {
      clickRef.current.click();
    }
  }, []);

  useEffect(() => {
    const stringified = queryString.stringify(objFilter);
    let url = `${router.location.pathname}?${stringified}`;
    router.navigate(url);
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

    try {
        const response = await api.post('/api/transaction/game_history_group', dataForm);
        if (get(response, 'success', false)) {
          const mapData = get(response, 'data', []);
          setData(mapData);
        } else {
          if (response.err === "err:json_error") {
            if (response.data.player_id === "want int, got string") toast.warn(t('want_int_got_string'));
          }
          if (response.err === "err:not_enough_arguments") toast.warn(t('not_enough_arguments'));
          if (response.err === "err:player_not_found") toast.warn(t('player_not_found'));
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
        return (
          <Link href={`/players/game-history?brand_id=${router?.query?.brand_id}&from_date=${moment().format("DD/MM/YYYY 00:00")}&game_name=${row.game_name}&game_type=&nick_name=&page=1&page_size=30&player_id=${router.query.player_id}&round_id=&sort_field=start_date&sort_order=DESC&time_zone=${time_zoneReplace}&to_date=${moment().format("DD/MM/YYYY 23:59")}`}>{cell}</Link>
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

  return (
    <>
      <TitlePage title="Games" />
      <GamesFilterHistory onSubmitProps={onSubmit} setObjFilter={setObjFilter} clickRef={clickRef}/>
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
    </>
  );
};

export default GamesListHistory;
