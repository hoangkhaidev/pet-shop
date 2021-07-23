/* eslint-disable arrow-body-style */
import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteItem from "src/components/Modal/DeleteItem";
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import TooltipIcon from "src/components/shared/TooltipIcon/TooltipIcon";
import NoPermissionPage from "src/components/NoPermissionPage/NoPermissionPage";
import Loading from "src/components/shared/Loading/Loading";
import useRouter from "src/utils/hooks/useRouter";
import useFetchData from "src/utils/hooks/useFetchData";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  addRoleButton: {
    float: "right"
  }
}));

const fakeData = [
  {
    id: 1,
    role_name: "Sub Account",
    description: "Access Sub Account Page",
  },
  {
    id: 2,
    role_name: "Operator",
    description: "Access Operator Page"
  }
];

const RoleList = () => {
  const classes = useStyles();
  const router = useRouter();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [objFilter, setObjFilter] = useState({
    name_search: "",
    status_search: "",
    sort_field: "username",
    sort_order: "asc",
    page: 1,
    page_size: 30,
    ...router.query
  });

  const { dataResponse, isLoading, isHasPermission } = useFetchData("/api/role", objFilter);

  useEffect(() => {
    setData(dataResponse);
  }, [dataResponse]);

  const columns = [
    {
      data_field: "indexRow",
      column_name: "No",
      align: "center"
    },
    {
      data_field: "role_name",
      column_name: "Role Name",
      align: "left"
    },
    {
      data_field: "description",
      column_name: "Description",
      align: "left"
    },
    {
      data_field: "action",
      column_name: "Action",
      align: "center",
      formatter: (cell, row) => {
        return (
          <ButtonGroup className={classes.root}>
            <TooltipIcon
              IconComponent={<EditIcon />}
              title="Edit Role"
              onClick={() => navigate(`${row.id}/edit`)}
            />
            <DeleteItem 
              username={row.role_name}
              title={`Confirmation`} 
              linkApi={`/api/role/${row.id}/delete`} 
              types='role' 
            />
          </ButtonGroup>
        )
      }
    }
  ];

  const handleChangePage = (page) => {
    setObjFilter(prevState => ({
      ...prevState,
      page
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

  const onGotoAddRolePage = () => {
    navigate("/role/add");
  };

  return (
    <Fragment>
      {isLoading && <Loading />}
      <ContentCardPage>
        <Button
          className={classes.addRoleButton}
          variant="contained"
          style={{ backgroundColor: '#1cb13c' }}
          startIcon={<AddIcon />}
          onClick={onGotoAddRolePage}
        >
          Add Role
        </Button>
        <TitlePage title="Role List" />
        <TableComponent
          data={data}
          columns={columns}
          types="RoleList"
          pagination={{
            total_size: fakeData.length,
            page: +objFilter.page,
            page_size: +objFilter.page_size
          }}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </ContentCardPage>
    </Fragment>
  );
};

export default RoleList;
