import { useState } from "react";

import TableComponent from "src/components/shared/TableComponent/TableComponent";
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";

const fakeData = [
  {
    id: 1,
    date: "13 May 2021 16:30:53.557 +07:00",
    action: "Do Spin",
    client_request: "symbol=vs15diamond &c=100 &repeat=0 &action=doSpin &index=4 &counter=7 &l=15",
    server_response: "tw=1,000.00 &gsf_r=1,2,4 &balance=483,774.80 &index=4 &balance_cash=483,774.80 &balance_bonus=0.00 &na=c &l0=4~500.00~10~6~2 &l1=12~500.00~10~6~7 &stime=1620897662042 &sa=7,6,5,8,4 &sb=3,5,6,8,5 &sh=3 &c=100.00 &sver=5 &n_reel_set=0 &counter=8 &l=15 &s=6,2,7,4,5,6,2,7,6,7,7,8,5,6,5 &w=1,000.00",
    game_client_version: "75141",
    game_server_version: "v0.1.0.0",
    config_name: "0.9648",
    details: "details"
  },
  {
    id: 2,
    date: "13 May 2021 16:30:53.557 +07:00",
    action: "Do Spin",
    client_request: "symbol=vs15diamond &c=100 &repeat=0 &action=doSpin &index=4 &counter=7 &l=15",
    server_response: "tw=1,000.00 &gsf_r=1,2,4 &balance=483,774.80 &index=4 &balance_cash=483,774.80 &balance_bonus=0.00 &na=c &l0=4~500.00~10~6~2 &l1=12~500.00~10~6~7 &stime=1620897662042 &sa=7,6,5,8,4 &sb=3,5,6,8,5 &sh=3 &c=100.00 &sver=5 &n_reel_set=0 &counter=8 &l=15 &s=6,2,7,4,5,6,2,7,6,7,7,8,5,6,5 &w=1,000.00",
    game_client_version: "75141",
    game_server_version: "v0.1.0.0",
    config_name: "0.9648",
    details: "details"
  }
];

const TransactionDetailsTable = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 30
  });

  const columns = [
    {
      data_field: "date",
      column_name: "Date",
      align: "center"
    },
    {
      data_field: "action",
      column_name: "Action",
      align: "center"
    },
    {
      data_field: "client_request",
      column_name: "Client Request",
      align: "center"
    },
    {
      data_field: "server_response",
      column_name: "Server Response",
      align: "center"
    },
    {
      data_field: "game_client_version",
      column_name: "Game Client Version",
      align: "center"
    },
    {
      data_field: "game_server_version",
      column_name: "Game Server Version",
      align: "center"
    },
    {
      data_field: "config_name",
      column_name: "Config Name",
      align: "center"
    },
    {
      data_field: "details",
      column_name: "Details",
      align: "center"
    }
  ];

  const handleChangePage = (page) => {
    setPagination(prevState => ({
      ...prevState,
      page
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({
      page: 1,
      page_size: parseInt(event.target.value, 10)
    });
  };

  return (
    <ContentCardPage>
      <TableComponent
        data={fakeData}
        columns={columns}
        pagination={{
          total_size: fakeData.length,
          page: pagination.page,
          page_size: pagination.page_size
        }}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </ContentCardPage>
  );
};

export default TransactionDetailsTable;
