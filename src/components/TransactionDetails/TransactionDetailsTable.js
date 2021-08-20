/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import TableComponent from "src/components/shared/TableComponent/TableComponent";
import useFetchData from "src/utils/hooks/useFetchData";
import NoPermissionPage from "../NoPermissionPage/NoPermissionPage";
import Loading from "../shared/Loading/Loading";
// import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import get from 'lodash/get';
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
  // const [dataRoundId, setDataRoundId] = useState([]);

  // const onViewRoundDetail = async() => {
  //   // const response = await api.post('/public/round_detail/PaBmYRfKpR5SVUW', null);
  //   const res = await fetch(
  //     `https://sbpubapi.arrowltd.net/public/round_detail/${roundId}`,
  //     {
  //       method: 'GET',
  //     }
  //   );
  //   const test = await res.json();
  //   if (get(test, "success", false)) {
  //     setDataRoundId(test.data);
  //   } else {
  //     console.log("response", test);
  //   }
  // }

  useEffect(() => {
    const mapData = get(dataResponse, 'transaction_list', []);
    setData(mapData);
  }, [dataResponse]);

  // useEffect(() => {
  //   onViewRoundDetail();
  // }, []);

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
        pagination={{
          total_size: data.length,
          page: pagination.page,
          page_size: pagination.page_size
        }}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <RoundDetail roundId={roundId} />
    </div>
  );
};

export default TransactionDetailsTable;
