/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import get from 'lodash/get';
import useFetchData from "utils/hooks/useFetchData";
import NoPermissionPage from "views/NoPermissionPage/NoPermissionPage";
import Loading from "views/Loading/Loading";
import TableComponent from "views/TableComponent/TableComponent";
import RoundDetail from "./RoundDetail";

const TransactionDetailsTable = ({roundId}) => {
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 30
  });
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  const { dataResponse, isLoading, isHasPermission } = useFetchData(
    `/api/transaction/round/${roundId}/details`,
    null
  );
  
  const [data, setData] = useState([]);

  useEffect(() => {
    const mapData = get(dataResponse, 'transaction_list', []);
    setData(mapData);
  }, [dataResponse]);

  const columns = [
    {
      data_field: 'indexRow',
      column_name: '#',
      align: 'center',
    },
    {
      data_field: "round_date",
      column_name: "Date",
      align: "left",
      nowrap: true
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
      align: "right",
      formatter: (cell, row) => {
        let cellFormat = formatNumber(cell);
        return cellFormat;
      }
    },
    {
      data_field: "credit",
      column_name: "Credit",
      align: "right",
      formatter: (cell, row) => {
        let cellFormat = formatNumber(cell);
        return cellFormat;
      }
    },
    {
      data_field: "balance_after",
      column_name: "Balance",
      align: "right",
      formatter: (cell, row) => {
        let cellFormat = formatNumber(cell);
        return cellFormat;
      }
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
        brand='transactionDetail'
        page = { Number(pagination.page) }
        page_size = { Number(pagination.page_size) }
      />
      <RoundDetail roundId={roundId} />
    </div>
  );
};

export default TransactionDetailsTable;
