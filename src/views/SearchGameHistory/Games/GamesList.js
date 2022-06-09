/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable spaced-comment */
/* eslint-disable radix */
/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from "react";
import moment from "moment";
import useRouter from "utils/hooks/useRouter";
import GamesFilter from "./GamesFilter";
import useFetchData from "utils/hooks/useFetchData";
import { formatNumberWithComma } from "utils/function";
import Loading from "views/Loading/Loading";
import TitlePage from "views/TitlePage/TitlePage";
import TableComponent from "views/TableComponent/TableComponent";
import ButtonGame from "./ButtonGame";

const GamesList = ({ onChangeTransaction }) => {
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
    sort_field: "start_date",
    sort_order: "desc",
    ...{
      ...router.query,
      player_id: router.query.id ? Number(router.query.id) : 0,
      game_name: router.query.game_name ? router.query.game_name : "",
      game_type: router.query.game_type ? router.query.game_type : "",
      sort_field: router.query.sort_field ? router.query.sort_field : "start_date",
      sort_order: router.query.sort_order ? router.query.sort_order : "desc",
      time_zone: router.query.time_zone ? router.query.time_zone : tz,
      round_id: router.query.round_id ? router.query.round_id : "",
      from_date: formDateRouter,
      to_date: toDateRouter,
    },
  });

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/transaction/player_game_history_group',
    objFilter
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataResponse);
  }, [dataResponse]);

  const onSubmit = async (data) => {
    setObjFilter(prevState => ({
      ...prevState,
      ...data,
    }));
  };

  const columns = [
    {
      data_field: 'indexRow',
      column_name: '#',
      align: 'center',
    },
    {
      data_field: "game_name",
      column_name: "Game",
      align: "left",
      formatter: (cell, row) => {
        return (
          <ButtonGame title={cell} onChangeTransaction={onChangeTransaction} game_name={row.game_name} setObjFilter={setObjFilter} />
        )
      }
    },
    {
      data_field: "round_date",
      column_name: "Round Date",
      align: "left",
      nowrap: true
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
    <>
      {isLoading && <Loading />}
      <TitlePage title="Games" sx={{mb: '15px'}}/>
      <GamesFilter onSubmitProps={onSubmit} setObjFilter={setObjFilter} />
      <TableComponent
        data={data}
        columns={columns}
        types="RoleList"
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

export default GamesList;
