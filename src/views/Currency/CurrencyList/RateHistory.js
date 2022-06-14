/* eslint-disable react/button-has-type */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useCallback, useState } from "react";
import get from 'lodash/get';
import api from "utils/api";
import { cloneDeep } from "lodash";
import TitlePage from "views/TitlePage/TitlePage";
import TableComponent from "views/TableComponent/TableComponent";
import ModalScrollComponent from "views/ModalComponent/ModalScrollComponent";

const RateHistory = ({ titleCurrency, currencyCode }) => {

  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 30
  });

  const [open, setOpen] = useState(false);

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState([]);

  const columns = [
    {
      data_field: 'indexRow',
      column_name: '#',
      align: 'center',
    },
    {
      data_field: "date",
      column_name: "Date",
      align: "left",
    },
    {
      data_field: "rate",
      column_name: "USD Rate",
      align: "right",
    },
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

  const onSubmitData = async (currencyCodeData) => {
    const response = await api.post(`/api/currency/${currencyCodeData}/history`, null);
    if (get(response, "success", false)) {
      const mapData = cloneDeep(response?.data);
      setData(mapData);
    } else {
      console.log("response", response);
    }
    onOpenModal();
  };

  let screenWidth = window.innerWidth;

  return (
    <>
      <button style={{ cursor: 'pointer', border: 'none', background: 'none', color: 'blue'}} onClick={() => onSubmitData(currencyCode)}>{titleCurrency}</button>
      <ModalScrollComponent
        open={open}
        onClose={onClose}
        width={ screenWidth > 991 ? '800px' : '100%'}
      >
        <TitlePage title={`${currencyCode} Rate History`} />
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
      </ModalScrollComponent>
    </>
  );
};

export default RateHistory;
