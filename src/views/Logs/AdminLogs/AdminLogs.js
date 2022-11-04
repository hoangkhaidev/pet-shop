/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import get from 'lodash/get';
import AdminLogsFilter from "./AdminLogsFilter";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import useRouter from "utils/hooks/useRouter";
import useFetchData from "utils/hooks/useFetchData";
import NoPermissionPage from "views/NoPermissionPage/NoPermissionPage";
import Loading from "views/Loading/Loading";
import TableComponent from "views/TableComponent/TableComponent";

const AdminLogs = () => {
  const router = useRouter();
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionLog = {};
  permission_groups?.map((item) => {
    if (item.name === 'Logs') {
      arrPermissionLog = (item.permissions[0]);
    }
    return item.name === 'Logs'
  });

  const [objFilter, setObjFilter] = useState({
    username: "",
    description: "",
    activity: "",
    target: "",
    from_date: "",
    to_date: "",
    sort_field: "created_at",
    sort_order: "DESC",
    page: 1,
    page_size: 30,
    ...router.query,
  });

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/logs/admin',
    objFilter
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    const mapData = get(dataResponse, 'list', []);
    setData(mapData);
  }, [dataResponse]);

  useEffect(() => {
    document.title = 'Admin Logs';
  }, []);

  const columns = [
    {
      data_field: "indexRow",
      column_name: "#",
      align: "center",
    },
    {
      data_field: "created_at",
      column_name: "Date",
      align: "left",
      nowrap: true
    },
    {
      data_field: "username",
      column_name: "Username",
      align: "left"
    },
    {
      data_field: "ip",
      column_name: "IP",
      align: "left"
    },
    {
      data_field: "activity",
      column_name: "Activity",
      align: "left",
    },
    {
      data_field: "target_name",
      column_name: "Target",
      align: "left",
    },
    {
      data_field: "description",
      column_name: "Description",
      align: "left",
      formatter: (cell, row) => {
        let newText = cell.split("\n").map((item, i) => {
          return <p key={i}>{item}</p>;
        });
        return <div style={{ textAlign: 'left' }}>{newText}</div>;
      },
    },
  ];

  const onSubmit = async (data) => {
    
    setObjFilter(prevState => ({
      ...prevState,
      ...data,
    }));
  };

  const handleChangePage = (page) => {
    let pageNew = page + 1;
    setObjFilter(prevState => ({
      ...prevState,
      page: pageNew,
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setObjFilter(prevState => ({
      ...prevState,
      page: 1,
      page_size: parseInt(event.target.value, 10)
    }));
  };

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  if (arrPermissionLog?.none) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      {isLoading && <Loading />}
      
      <AdminLogsFilter onSubmitProps={onSubmit} setObjFilter={setObjFilter} />
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

export default AdminLogs;
