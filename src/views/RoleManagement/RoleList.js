/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from "@mui/styles";
import useRouter from "utils/hooks/useRouter";
import { useNavigate } from "react-router";
import useFetchData from "utils/hooks/useFetchData";
import { ButtonGroupTable } from "views/Button/Button";
import TooltipIcon from "views/TooltipIcon/TooltipIcon";
import DeleteItem from "views/Modal/DeleteItem";
import NoPermissionPage from "views/NoPermissionPage/NoPermissionPage";
import Loading from "views/Loading/Loading";
import MainCard from "ui-component/cards/MainCard";
import { Button } from "@mui/material";
import TableComponent from "views/TableComponent/TableComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    
  },
}));

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
      data_field: 'indexRow',
      column_name: '#',
      align: 'center',
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
          <ButtonGroupTable className={classes.root}>
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
          </ButtonGroupTable>
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

  const onGotoAddRolePage = () => {
    navigate("/role/add");
  };

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <>
      {isLoading && <Loading />}
      <MainCard title="Role List">
        <Button
          className={classes.addRoleButton}
          variant="contained"
          style={{ backgroundColor: '#1cb13c', marginBottom: '10px', marginLeft: 'auto', display: 'flex' }}
          startIcon={<AddIcon />}
          onClick={onGotoAddRolePage}
        >
          Add Role
        </Button>
        <TableComponent
          data={data}
          columns={columns}
          types="RoleList"
          page = { Number(objFilter.page) }
          page_size = { Number(objFilter.page_size) }
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </MainCard>
    </>
  );
};

export default RoleList;