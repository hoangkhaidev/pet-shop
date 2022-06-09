/* eslint-disable no-else-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { useState, useEffect } from "react";
import moment from 'moment';
// import ClearAllIcon from '@mui/icons-material/ClearAll';
import { Navigate, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import useRouter from "utils/hooks/useRouter";
import useFetchData from "utils/hooks/useFetchData";
import { cloneDeep } from "lodash";
import { Link } from "@mui/material";
import NoPermissionPage from "views/NoPermissionPage/NoPermissionPage";
import MainCard from "ui-component/cards/MainCard";
import TableComponent from "views/TableComponent/TableComponent";
import { BackButton } from "views/Button/Button";

const BrandListBelow = () => {
  const router = useRouter();
  const navigate = useNavigate();
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionGlobalBrand = {};
  permission_groups.map((item) => {
    if (item.name === 'Global') {
      arrPermissionGlobalBrand = item.permissions[0];
    }
    return item.name === 'Global'
  });

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

  useEffect(() => {
    document.title = 'Brand List';
    return () => {
      document.title = '';
    }
  }, []);

  const columns = [
    {
      data_field: 'indexRow',
      column_name: '#',
      align: 'center',
    },
    {
      data_field: "brand_name",
      column_name: "Brand Name",
      align: "left",
      formatter: (cell, row) => 
        arrPermissionGlobalBrand?.full ? (
          <Link href={`/global/group_brand/brand_detail/${row.brand_id}`}>{cell}</Link>
        ) : 
        arrPermissionGlobalBrand?.view || arrPermissionGlobalBrand?.create ? (
          <Link href={`/global/group_brand/brand_view/${row.brand_id}`}>{cell}</Link>
        ) : (
          <Link href={`/global/group_brand/brand_detail/${row.brand_id}`}>{cell}</Link>
        )
    },
    {
      data_field: "players",
      column_name: "Players",
      align: "right",
      formatter: (cell, row) => {
        if (cell === 0) {
          return cell;
        } else {
          return (
            <Link href={`/players/players?brand_id=${row.brand_id}&currency=&from_date=${moment().format("DD/MM/YYYY")}&ip_address=&language=&nick_name=&page=1&page_size=30&player_id=0&sort_field=id&sort_order=desc&to_date=${moment().format("DD/MM/YYYY")}`}>{cell}</Link>
          )
        }
      }
    },
    {
      data_field: "created_at",
      column_name: "Created At",
      align: "left",
      nowrap: true
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

  if (arrPermissionGlobalBrand.none) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      <MainCard>
        <div 
          style={{ fontWeight: '600', fontSize: '22px', textTransform: 'capitalize' }}
        >
          {router.query.operator_name} - Brand List
        </div>
        {/* <Button
          startIcon={<ClearAllIcon fontSize="small" />}
          variant="contained"
          type="button"
          color="error"
          style={{ margin: '15px 0px', marginLeft: 'auto', display: 'flex' }}
          onClick={() => onCancel()}
        >
          Back
        </Button> */}
        <BackButton
          text="Back"
          onAction={() => onCancel()}
        />
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
      </MainCard>
    </>
  );
};

export default BrandListBelow;
