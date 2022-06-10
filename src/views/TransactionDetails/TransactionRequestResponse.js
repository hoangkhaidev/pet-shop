/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import get from 'lodash/get';
import useFetchData from "utils/hooks/useFetchData";
import NoPermissionPage from "views/NoPermissionPage/NoPermissionPage";
import Loading from "views/Loading/Loading";
import TableComponent from "views/TableComponent/TableComponent";

const TransactionRequestResponse = ({roundId}) => {
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 30
  });

  const { dataResponse, isLoading, isHasPermission } = useFetchData(
    `/api/transaction/round/${roundId}/details`,
    null
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    const mapData = get(dataResponse, 'request_list', []);
    setData(mapData);
  }, [dataResponse]);

  const columns = [
    {
      data_field: 'indexRow',
      column_name: '#',
      align: 'center',
    },
    {
      data_field: "sent_at",
      column_name: "Sent At",
      align: "left",
      nowrap: true
    },
    {
      data_field: "received_at",
      column_name: "Received At",
      align: "left",
      nowrap: true
    },
    {
      data_field: "endpoint",
      column_name: "Endpoint",
      align: "left"
    },
    {
      data_field: "request",
      column_name: "Request Body",
      align: "left"
    },
    {
      data_field: "responsed_at",
      column_name: "Responsed At",
      align: "left",
      nowrap: true
    },
    {
      data_field: "response",
      column_name: "Response",
      align: "left"
    },
    {
      data_field: "note",
      column_name: "Note",
      align: "left"
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

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }
  return (
    <div style={{margin: '0 -24px'}}>
      {isLoading && <Loading />}
      <TableComponent
        data={data}
        columns={columns}
        types='RoleList'
        page = { Number(pagination.page) }
        page_size = { Number(pagination.page_size) }
        handleChangePage = {handleChangePage}
        handleChangeRowsPerPage = {handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TransactionRequestResponse;
