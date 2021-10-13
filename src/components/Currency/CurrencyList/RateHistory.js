/* eslint-disable arrow-body-style */
import { Button } from "@material-ui/core";
import { useCallback, useState } from "react";
import cloneDeep from "lodash.clonedeep";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import ModalComponentRateHistory from "src/components/shared/ModalComponent/ModalComponentRateHistory";
import api from "src/utils/api";
import get from 'lodash/get';

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

  return (
    <>
      <Button onClick={() => onSubmitData(currencyCode)}>{titleCurrency}</Button>
      <ModalComponentRateHistory
        open={open}
        onClose={onClose}
        width="800px"
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
      </ModalComponentRateHistory>
    </>
  );
};

export default RateHistory;
