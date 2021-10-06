import { useEffect, useState } from "react";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import useFetchData from "src/utils/hooks/useFetchData";
import NoPermissionPage from "../NoPermissionPage/NoPermissionPage";
import Loading from "../shared/Loading/Loading";
import get from 'lodash/get';

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
      data_field: "sent_at",
      column_name: "Sent At",
      align: "left"
    },
    {
      data_field: "received_at",
      column_name: "Received At",
      align: "left"
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
      align: "left"
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
        pagination={{
          total_size: data.length,
          page: pagination.page,
          page_size: pagination.page_size
        }}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TransactionRequestResponse;
