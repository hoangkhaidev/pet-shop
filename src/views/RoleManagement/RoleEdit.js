/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable arrow-body-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from "react-router-dom";
import forEach from "lodash/forEach";
import findIndex from "lodash/findIndex";
import get from "lodash/get";
import map from "lodash/map";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import useRouter from "utils/hooks/useRouter";
import useFetchData from "utils/hooks/useFetchData";
import { clearPage, setPageName } from "features/parentParam/parentParam";
import api from "utils/api";
import NoPermissionPage from "views/NoPermissionPage/NoPermissionPage";
import Loading from "views/Loading/Loading";
import MainCard from "ui-component/cards/MainCard";
import InputField from "views/InputField/InputField";
import { FormLabel, Paper, Radio, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ButtonGroup, { CancelButton, SubmitButton } from "views/Button/Button";

const LIST_PERMISSIONS = [
  {
    label: "None",
    value: "none"
  },
  {
    label: "Full",
    value: "full"
  },
  {
    label: "View Only",
    value: "view"
  },
  {
    label: "View/Create",
    value: "create"
  },
  {
    label: "View/Edit",
    value: "edit"
  }
];

const useStyles = makeStyles((theme) => ({
  formStyle: {
  },
  permissionTitle: {
    fontWeight: "bold",
    lineHeight: "30px"
  },
  listCheckboxes: {
    marginTop: "30px"
  },
  checkboxLine: {
    lineHeight: "30px"
  },
  permissionItemLine: {
    marginTop: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    lineHeight: "30px"
  }
}));

const RoleEdit = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [headerPermission, setHeaderPermission] = useState([]);
  const [permissionGroup, setPermissionGroup] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm();

  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionSubAccount = {};
  permission_groups?.map((item) => {
    if (item?.name === 'Sub Account') {
      arrPermissionSubAccount = item?.permissions;
    }
    return item?.name === 'Sub Account'
  });

  const { dataResponse, isLoading, isHasPermission } = useFetchData(`/api/role/${router.query?.id}`);
  
  useEffect(() => {
    setValue("role_name", dataResponse?.role_name);
    setValue("description", dataResponse?.description);
    setPermissionGroup(dataResponse?.permission_group);
  }, [dataResponse, setValue]);

  useEffect(() => {
    let name;
    if (permissionGroup) {

      let resultArr = [];
      LIST_PERMISSIONS.forEach(permission => {
        const arr = map(permissionGroup, item => item.permissions.every(itemPermission => itemPermission[permission.value]));
        const ticked = arr.find((item) => item === false );
        if (ticked === false) {
          resultArr.push({
            ...permission,
            checked: false
          });
        } else {
          resultArr.push({
            ...permission,
            checked: true
          });
        }
      });
      setHeaderPermission(resultArr);
      setSelectedColumn(name);
    }
  }, [permissionGroup]);

  useEffect(() => {
    document.title = 'Edit Role';
  }, [router]);

  useEffect(() => {
    dispatch(setPageName("role_edit"));
    return () => {
      dispatch(clearPage());
    }
  }, []);

  const onSubmit = async (dataForm) => {
    const form = {
      role_name: dataForm.role_name,
      description: dataForm.description,
      permission_group: permissionGroup
    };
    try {
      let response = await api.post(`/api/role/${router.query?.id}/update`, form);
      if (get(response, 'success', false)) {
        toast.success("Update Role Success", {
          onClose: navigate("/role")
        });
      } else {
        if (response?.err === 'err:suspended_account') {
          toast.warn(t('suspended_account'));
        }
        if (response?.err === 'err:no_permission') {
          toast.warn(t('no_permission'));
        }
        if (response?.err === 'err:form_validation_failed') {
          for (const field in response?.data) {
            setError(field, {
              type: 'validate',
              message: t(response?.data[field])
            });
          }
        }
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  const onCancel = () => {
    navigate("/role");
  };

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  const onChange = (e, permissionName, permissionAction) => {
    const { name } = e.target;
    if (name !== selectedColumn) {
      setSelectedColumn(null);
    }
    const cloneArr = permissionGroup.slice();
    const updatedPermissionIndex = findIndex(cloneArr, item => item.name === permissionName);
    const updatedRowIndex = findIndex(cloneArr[updatedPermissionIndex].permissions, item => item.name === permissionAction);
    Object.keys(cloneArr[updatedPermissionIndex].permissions[updatedRowIndex]).forEach(key => {
      if (key === "name") {
        return;
      }
      if (key === name) {
        cloneArr[updatedPermissionIndex].permissions[updatedRowIndex][key] = true;
      } else {
        cloneArr[updatedPermissionIndex].permissions[updatedRowIndex][key] = false;
      }
    });
    const isAllPermissionsAreSameColumn = cloneArr.every(item => item.permissions.every(itemPermission => itemPermission[name]));
    if (isAllPermissionsAreSameColumn) {
      setSelectedColumn(name);
    }
    setPermissionGroup(cloneArr);
  };

  const checkedColumn = (e, name) => {
    setSelectedColumn(name);
    const cloneArr = permissionGroup.slice();
    forEach(cloneArr, (item, index) => {
      const permissionsList = item.permissions;
      permissionsList.forEach(arr => {
        Object.keys(arr).forEach(key => {
          if (key === "name") {
            return;
          }
          if (key === name) {
            arr[key] = true;
          } else {
            arr[key] = false;
          }
        });
      });
      cloneArr[index].permissions = permissionsList;
    });
    setPermissionGroup(cloneArr);
  };

  if (!arrPermissionSubAccount[0]?.full) {
    if(arrPermissionSubAccount[0]?.create || arrPermissionSubAccount[0]?.view) {
      return <Navigate to="/home/dashboard" />;
    }
  }

  return (
    <MainCard title="Edit Role">
      {isLoading && <Loading />}
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formStyle}>
        <InputField
          autoFocus
          required
          namefileld="role_name"
          control={control}
          id="name"
          errors={errors?.role_name}
          type="text"
          label="Role Name"
          inputProps={{
            maxLength: 100
          }}
          helperText={t('h_name_length')}
        />
        <InputField
          multiline
          rows={4}
          namefileld="description"
          control={control}
          id="description"
          errors={errors?.description}
          type="text"
          label="Description"
        />
        <FormLabel>{t("Permission List")}</FormLabel>
        {permissionGroup && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Permission
                  </TableCell>
                  {headerPermission.map(permission => {
                    return (
                      <TableCell key={permission.value}>
                        <Radio
                          checked={permission.checked}
                          name={permission.value}
                          onChange={(e) => checkedColumn(e, permission.value)}
                        />
                        {permission.label}
                      </TableCell>
                    )
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {(permissionGroup || []).map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      <div className={classes.permissionLine}>
                        <p className={classes.permissionTitle}>
                          {row?.name}
                        </p>
                        <div className={classes.permissionList}>
                          {(row?.permissions || []).map(item => (
                            <div key={item?.name} className={classes.permissionItemLine}>
                              {item?.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={classes.listCheckboxes}>
                        {(row?.permissions || []).map(item => {
                          return (
                            <div
                              key={item?.name}
                              className={classes.checkboxLine}
                            >
                              <Radio
                                name="none"
                                onChange={(e) => onChange(e, row.name, item.name)}
                                checked={item.none}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={classes.listCheckboxes}>
                        {(row?.permissions || []).map(item => (
                          <div
                            key={item?.name}
                            className={classes.checkboxLine}
                          >
                            <Radio
                              name="full"
                              onChange={(e) => onChange(e, row.name, item.name)}
                              checked={item.full}
                            />
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={classes.listCheckboxes}>
                        {(row?.permissions || []).map(item => (
                          <div
                            key={item?.name}
                            className={classes.checkboxLine}
                          >
                            <Radio
                              name="view"
                              onChange={(e) => onChange(e, row.name, item.name)}
                              checked={item.view}
                            />
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={classes.listCheckboxes}>
                        {(row?.permissions || []).map(item => (
                          <div
                            key={item?.name}
                            className={classes.checkboxLine}
                          >
                            <Radio
                              name="create"
                              onChange={(e) => onChange(e, row.name, item.name)}
                              checked={item.create}
                            />
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={classes.listCheckboxes}>
                        {(row?.permissions || []).map(item => (
                          <div
                            key={item?.name}
                            className={classes.checkboxLine}
                          >
                            <Radio
                              name="edit"
                              onChange={(e) => onChange(e, row.name, item.name)}
                              checked={item.edit}
                            />
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <ButtonGroup>
          <SubmitButton />
          <CancelButton onAction={onCancel} text='Cancel'/>
        </ButtonGroup>
      </form>
    </MainCard>
  );
};

export default RoleEdit;
