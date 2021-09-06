/* eslint-disable arrow-body-style */
import { Button } from "@material-ui/core";
import { Fragment, useCallback, useState, useEffect } from "react";
import Link from '@material-ui/core/Link';
import useFetchData from "src/utils/hooks/useFetchData";
import cloneDeep from "lodash.clonedeep";
import moment from 'moment';
import ModalComponent from "src/components/shared/ModalComponent/ModalComponent";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import TitlePage from "src/components/shared/TitlePage/TitlePage";

const RateHistory = ({ titleCurrency, currencyCode }) => {
  //   const classes = useStyles();
  // const { dataResponse, isHasPermission } = useFetchData(
  //   `/api/global/group_brand/${roundId}`,
  //   null
  // );
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 30
  });

  const [open, setOpen] = useState(false);

  const onOpenModal = useCallback(() => {
    // setOpen(true);
    setOpen(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const mapData = cloneDeep(dataResponse);
  //   setData(mapData);
  // }, [dataResponse]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const columns = [
    {
      data_field: "date",
      column_name: "Date",
      align: "left",
    },
    {
      data_field: "players",
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


  return (
    <Fragment>
      <Button onClick={(onOpenModal)}>{titleCurrency}</Button>
      <ModalComponent
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
      </ModalComponent>
    </Fragment>
  );
};

export default RateHistory;
