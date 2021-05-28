import { Fragment, useState } from "react";
import Link from "@material-ui/core/Link";

import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import useRouter from "src/utils/hooks/useRouter";
import PlayerListFilter from "./PlayerListFilter";

const fakeData = [
  {
    id: 1,
    player_id: 1,
    nickname: "Rambo",
    signup: "18/04/1996",
    currency: "usd",
    language: "English",
    last_login_time: "20/08/2021",
    last_login_ip: "192.168.1.1",
  },
  {
    id: 2,
    player_id: 2,
    nickname: "Rudo",
    signup: "18/05/1996",
    currency: "usd",
    language: "English",
    last_login_time: "20/08/2021",
    last_login_ip: "192.168.1.1",
  }
];

const PlayerList = () => {
  const router = useRouter();
  const [objFilter, setObjFilter] = useState({
    name_search: "",
    status_search: "",
    sort_field: "username",
    sort_order: "asc",
    page: 1,
    page_size: 30,
    ...router.query
  });

  const columns = [
    {
      data_field: "player_id",
      column_name: "Player ID",
      align: "center",
    },
    {
      data_field: "nickname",
      column_name: "Nickname",
      align: "center",
    },
    {
      data_field: "signup",
      column_name: "Signup",
      align: "center",
    },
    {
      data_field: "currency",
      column_name: "Currency",
      align: "center",
    },
    {
      data_field: "currency",
      column_name: "Currency",
      align: "center",
    },
    {
      data_field: "language",
      column_name: "Language",
      align: "center"
    },
    {
      data_field: "last_login_time",
      column_name: "Last Login Time",
      align: "center"
    },
    {
      data_field: "last_login_ip",
      column_name: "Last Login IP",
      align: "center"
    },
    {
      data_field: "action",
      column_name: "",
      align: "center",
      formatter: (cell, row) => (
        <Link href={`/history/${row.id}`}>
          {row.id}
        </Link>
      )
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

  const onSubmit = async (data) => {
    setObjFilter(prevState => ({
      ...prevState,
      ...data,
    }));
  };

  return (
    <Fragment>
      <PlayerListFilter onSubmitProps={onSubmit} />
      <ContentCardPage>
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
      </ContentCardPage>
    </Fragment>
  );
};

export default PlayerList;
