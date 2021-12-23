import { useEffect, useState } from "react";
import useRouter from "src/utils/hooks/useRouter";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import get from 'lodash/get';
import useFetchData from "src/utils/hooks/useFetchData";
import Loading from "src/components/shared/Loading/Loading";
import NoPermissionPage from "src/components/NoPermissionPage/NoPermissionPage";
import OperatorLogsFilter from "./OperatorLogsFilter";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const OperatorLogs = () => {
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
    '/api/logs/operator',
    objFilter
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    const mapData = get(dataResponse, 'list', []);
    setData(mapData);
  }, [dataResponse]);

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

  if (arrPermissionLog.none) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      {isLoading && <Loading />}
      <OperatorLogsFilter onSubmitProps={onSubmit} setObjFilter={setObjFilter} />
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

export default OperatorLogs;
