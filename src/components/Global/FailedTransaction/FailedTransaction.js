/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import toString from "lodash/toString";
import queryString from 'query-string';
import useRouter from "src/utils/hooks/useRouter";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import { formatNumberWithComma } from "src/utils/function";
import get from 'lodash/get';
import api from "src/utils/api";
import { toast } from "react-toastify";
import TransactionDetails from "src/components/TransactionDetails/TransactionDetails";
import FailedTransactionFilter from "./FailedTransactionFilter";
import ButtonResume from "./ButtonResume";

const FailedTransaction = () => {
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

  const [objFilter, setObjFilter] = useState({
    page: 1,
    page_size: 30,
    sort_field: "end_date",
    sort_order: "desc",
    player_id: "",
    brand_ids: [],
    nick_name: "",
    round_id: "",
    time_zone: tz,
    from_date: moment().format("DD/MM/YYYY 00:00"),
    to_date: moment().format("DD/MM/YYYY 23:59"),
    status_list : [],
    ...router.query
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
  const [total_size, setTotal_size] = useState(0);

  const columns = [
    {
      data_field: "round_id",
      column_name: "Round ID",
      align: "left",
      formatter: (cell, row) => {
        return (
          <TransactionDetails roundId={cell} />
        );
      },
    },
    {
      data_field: "start_date",
      column_name: "Start Date",
      align: "left"
    },
    {
      data_field: "end_date",
      column_name: "End Date",
      align: "left"
    },
    {
      data_field: "bet",
      column_name: "Bet",
      align: "right",
      formatter: cell => formatNumberWithComma(toString(cell))
    },
    {
      data_field: "win",
      column_name: "Win",
      align: "right",
      formatter: cell => formatNumberWithComma(toString(cell))
    },
    {
      data_field: "new_balance",
      column_name: "Balance",
      align: "right",
      formatter: cell => formatNumberWithComma(toString(cell))
    },
    {
      data_field: "status",
      column_name: "Game Status",
      align: "left",
    },
    {
      data_field: "game_name",
      column_name: "Game",
      align: "left"
    },
    {
      data_field: 'process_status',
      column_name: 'Action',
      align: 'left',
      formatter: (cell, row) => {
        return <ButtonResume cell={cell} row={row} />
      }
    }
  ];

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
        const response = await api.post(`/api/global/brand_detail/failed_transactions`, dataForm);
        
        if (get(response, 'success', false)) {
          const mapData = get(response.data, 'list', []);
          const total_sizeData = get(response.data, 'total_size', []);
          setTotal_size(total_sizeData)
          setData(mapData);
        } else {
          if (response.err === "err:not_enough_arguments") toast.warn('Please select 1 of the 3 fields player ID, nickname round ID');
          if (response.err === "err:player_not_found") toast.warn('Player not found');
        }
    } catch (e) {
      console.log('e', e);
    }
  };

  const handleChangePage = async (page) => {
    let pageNew = page + 1;
    setObjFilter(prevState => ({
      ...prevState,
      page: pageNew,
    }));

    const dataForm = {
      ...objFilter,
      page: pageNew,
    };

    try {
      const response = await api.post(`/api/global/brand_detail/failed_transactions`, dataForm);
      
      if (get(response, 'success', false)) {
        const mapData = get(response.data, 'list', []);
        const total_sizeData = get(response.data, 'total_size', []);
        setTotal_size(total_sizeData)
        setData(mapData);
      } else {
        if (response.err === "err:not_enough_arguments") toast.warn('Please select 1 of the 3 fields player ID, nickname round ID');
        if (response.err === "err:player_not_found") toast.warn('Player not found');
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  const handleChangeRowsPerPage = async (event) => {
    setObjFilter(prevState => ({
      ...prevState,
      page: 1,
      page_size: parseInt(event.target.value, 10)
    }));

    const dataForm = {
      ...objFilter,
      page: 1,
      page_size: parseInt(event.target.value, 10)
    };

    try {
      const response = await api.post(`/api/global/brand_detail/failed_transactions`, dataForm);
      
      if (get(response, 'success', false)) {
        const mapData = get(response.data, 'list', []);
        const total_sizeData = get(response.data, 'total_size', []);
        setTotal_size(total_sizeData)
        setData(mapData);
      } else {
        if (response.err === "err:not_enough_arguments") toast.warn('Please select 1 of the 3 fields player ID, nickname round ID');
        if (response.err === "err:member_not_found") toast.warn('Player not found');
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  return (
    <>
      <TitlePage title="Failed Transactions" />
      <FailedTransactionFilter onSubmitProps={onSubmit} setObjFilter={setObjFilter} clickRef={clickRef}/>
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
    </>
  );
};

export default FailedTransaction;
