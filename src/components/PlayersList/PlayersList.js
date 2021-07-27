import { Fragment, useEffect, useState } from "react";
import Link from "@material-ui/core/Link";

import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import useRouter from "src/utils/hooks/useRouter";
import PlayerListFilter from "./PlayerListFilter";
import useFetchData from "src/utils/hooks/useFetchData";
import get from 'lodash/get';
import Loading from "../shared/Loading/Loading";
import NoPermissionPage from "../NoPermissionPage/NoPermissionPage";
import moment from "moment";
// import { useForm } from "react-hook-form";

// const fakeData = [
//   {
//     id: 1,
//     player_id: 1,
//     nickname: "Rambo",
//     signup: "18/04/1996",
//     currency: "usd",
//     language: "English",
//     last_login_time: "20/08/2021",
//     last_login_ip: "192.168.1.1",
//   },
//   {
//     id: 2,
//     player_id: 2,
//     nickname: "Rudo",
//     signup: "18/05/1996",
//     currency: "usd",
//     language: "English",
//     last_login_time: "20/08/2021",
//     last_login_ip: "192.168.1.1",
//   }
// ];

const PlayersList = () => {
  const router = useRouter();
  const [objFilter, setObjFilter] = useState({
    player_id: 0,
    nick_name: "",
    brand_id: 0,
    ip_address: "",
    from_date: moment().format("DD/MM/YYYY"),
    to_date: moment().format("DD/MM/YYYY"),
    language: "",
    currency: "",
    sort_field: "id",
    sort_order: "desc",
    page: 1,
    page_size: 30,
    ...{
      ...router.query,
      player_id: router.query.player_id ? Number(router.query.player_id) : 0,
      brand_id: router.query.brand_id ? Number(router.query.brand_id) : 0,
    },
  });
  const [data, setData] = useState([]);

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/members',
    objFilter
  );

  useEffect(() => {
    const mapData = get(dataResponse, 'list', []);
    setData(mapData);
  }, [dataResponse]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const columns = [
    {
      data_field: "id",
      column_name: "Player ID",
      align: "left",
      formatter: (cell, row) => (
        <Link href={`/players/${row.id}/information`}>{cell}</Link>
      ),
    },
    {
      data_field: "username",
      column_name: "Nickname",
      align: "left",
    },
    {
      data_field: "created_at",
      column_name: "Signup",
      align: "right",
    },
    {
      data_field: "currency_code",
      column_name: "Currency",
      align: "left",
    },
    {
      data_field: "language",
      column_name: "Language",
      align: "left"
    },
    {
      data_field: "last_logged_in",
      column_name: "Last Login Time",
      align: "right"
    },
    {
      data_field: "last_logged_ip",
      column_name: "Last Login IP",
      align: "left"
    },
    {
      data_field: "Action",
      column_name: "Action",
      align: "left",
      formatter: (cell, row) => (
        <Link href={`/history/${row.id}`}>
          [Game History]
        </Link>
      )
    }
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

  useEffect(() => {
    console.log(objFilter);
  }, [objFilter])

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
    <Fragment>
      {isLoading && <Loading />}
      <PlayerListFilter onSubmitProps={onSubmit} setObjFilter={setObjFilter} />
      <ContentCardPage>
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
      </ContentCardPage>
    </Fragment>
  );
};

export default PlayersList;
