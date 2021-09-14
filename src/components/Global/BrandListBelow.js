/* eslint-disable arrow-body-style */
import { Fragment, useState, useEffect } from "react";
import TableComponent from "../shared/TableComponent/TableComponent";
import NoPermissionPage from "../NoPermissionPage/NoPermissionPage";
import Link from '@material-ui/core/Link';
import useFetchData from "src/utils/hooks/useFetchData";
import cloneDeep from "lodash.clonedeep";
import moment from 'moment';
import useRouter from "src/utils/hooks/useRouter";
import ContentCardPage from "../ContentCardPage/ContentCardPage";
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router";

const BrandListBelow = () => {
  //   const classes = useStyles();
  const router = useRouter();
  const navigate = useNavigate();

  const { dataResponse, isHasPermission } = useFetchData(
    `/api/global/group_brand/${router.query.id}`,
    null
  );
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 30
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    const mapData = cloneDeep(dataResponse);
    setData(mapData);
  }, [dataResponse]);

  const columns = [
    {
      data_field: "brand_name",
      column_name: "Brand Name",
      align: "left",
      formatter: (cell, row) => {
        return (
          <Link href={`/global/group_brand/brand_detail/${row.brand_id}`}>{cell}</Link>
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
  
  const onCancel = () => {
    navigate('/global/group_brand');
  }

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <Fragment>
      <ContentCardPage>
        <div 
          style={{ fontWeight: '600', fontSize: '22px', textTransform: 'capitalize' }}
        >
          {router.query.operator_name} - Brand List
        </div>
        <Button
          startIcon={<ClearAllIcon fontSize="small" />}
          variant="contained"
          type="button"
          color="secondary"
          style={{ margin: '15px 0px' }}
          onClick={() => onCancel()}
        >
          Back
        </Button>
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
      </ContentCardPage>
    </Fragment>
  );
};

export default BrandListBelow;
