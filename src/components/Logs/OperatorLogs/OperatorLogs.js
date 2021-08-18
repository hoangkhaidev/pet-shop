import { Fragment, useEffect, useState } from "react";
import moment from "moment";
import useRouter from "src/utils/hooks/useRouter";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import get from 'lodash/get';
import useFetchData from "src/utils/hooks/useFetchData";
import Loading from "src/components/shared/Loading/Loading";
import NoPermissionPage from "src/components/NoPermissionPage/NoPermissionPage";
import OperatorLogsFilter from "./OperatorLogsFilter";
// import { Link } from "react-router-dom";

const OperatorLogs = () => {
  const router = useRouter();

  const [objFilter, setObjFilter] = useState({
    username: "",
    description: "",
    activity: "",
    target: "",
    from_date: moment().format("DD/MM/YYYY"),
    to_date: moment().format("DD/MM/YYYY"),
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

  useEffect(() => {
    console.log(data);
  }, [data]);

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
      align: "right",
    },
    {
      data_field: "target",
      column_name: "Target",
      align: "right",
    },
    {
      data_field: "description",
      column_name: "Description",
      align: "right",
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

  return (
    <Fragment>
      {isLoading && <Loading />}
      {/* <PlayerInformation /> */}
      {/* <div style={{ fontWeight: '600', fontSize: '22px'}}>Game Transaction</div> */}
      
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
    </Fragment>
  );
};

export default OperatorLogs;
