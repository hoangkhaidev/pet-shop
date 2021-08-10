/* eslint-disable arrow-body-style */
import { Button } from "@material-ui/core";
import { Fragment, useCallback, useState, useEffect } from "react";
import ModalComponent from "../shared/ModalComponent/ModalComponent";
import TableComponent from "../shared/TableComponent/TableComponent";
import NoPermissionPage from "../NoPermissionPage/NoPermissionPage";
import Link from '@material-ui/core/Link';
import useFetchData from "src/utils/hooks/useFetchData";
import cloneDeep from "lodash.clonedeep";
import moment from 'moment';

const BrandListBelow = ({ roundId, cell }) => {
  //   const classes = useStyles();
  const { dataResponse, isHasPermission } = useFetchData(
    `/api/global/group_brand/${roundId}`,
    null
  );
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

  useEffect(() => {
    const mapData = cloneDeep(dataResponse);
    setData(mapData);
  }, [dataResponse]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const columns = [
    {
      data_field: "brand_name",
      column_name: "Brand Name",
      align: "left",
      formatter: (cell, row) => {
        return (
          <Link href={`/global/brand_detail/${row.brand_id}`}>{cell}</Link>
        )
      }
    },
    {
      data_field: "players",
      column_name: "Players",
      align: "right",
      formatter: (cell, row) => {
        return (
          <Link href={`/players/players?brand_id=${row.brand_id}&currency=&from_date=${moment().format("DD/MM/YYYY")}&ip_address=&language=&nick_name=&page=1&page_size=30&player_id=0&sort_field=id&sort_order=desc&to_date=${moment().format("DD/MM/YYYY")}`}>{cell}</Link>
        )
      }
    },
    {
      data_field: "created_at",
      column_name: "Created At",
      align: "left"
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

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <Fragment>
      <Button onClick={(onOpenModal)}>{cell}</Button>
      <ModalComponent
        open={open}
        onClose={onClose}
        width="800px"
      >
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

export default BrandListBelow;
