import { useEffect, useState } from "react";

import TableComponent from "src/components/shared/TableComponent/TableComponent";
import useFetchData from "src/utils/hooks/useFetchData";
import NoPermissionPage from "../NoPermissionPage/NoPermissionPage";
import Loading from "../shared/Loading/Loading";
// import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import get from 'lodash/get';

const TransactionDetailsTable = ({roundId}) => {
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
    const mapData = get(dataResponse, 'transaction_list', []);
    setData(mapData);
  }, [dataResponse]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const columns = [
    {
      data_field: "round_date",
      column_name: "Date",
      align: "left"
    },
    {
      data_field: "reference",
      column_name: "Reference ID",
      align: "right"
    },
    {
      data_field: "transaction_id",
      column_name: "Transaction ID",
      align: "right"
    },
    {
      data_field: "transaction_type",
      column_name: "Transaction Type",
      align: "left"
    },
    {
      data_field: "debit",
      column_name: "Debit",
      align: "right"
    },
    {
      data_field: "credit",
      column_name: "Credit",
      align: "right"
    },
    {
      data_field: "balance_after",
      column_name: "Balance",
      align: "right"
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

export default TransactionDetailsTable;
