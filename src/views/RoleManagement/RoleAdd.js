/* eslint-disable spaced-comment */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';
import forEach from 'lodash/forEach';
import findIndex from 'lodash/findIndex';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { makeStyles } from '@mui/styles';
import useFetchData from 'utils/hooks/useFetchData';
import { cloneDeep } from 'lodash';
import api from 'utils/api';
import NoPermissionPage from 'views/NoPermissionPage/NoPermissionPage';
import MainCard from 'ui-component/cards/MainCard';
import Loading from 'views/Loading/Loading';
import InputField from 'views/InputField/InputField';
import { FormLabel, Paper, Radio, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ButtonGroup, { CancelButton, ResetButton, SubmitButton } from 'views/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearPage, setPageName } from 'features/parentParam/parentParam';

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
  formStyle: {},
  permissionTitle: {
    fontWeight: 'bold',
    lineHeight: '30px',
  },
  listCheckboxes: {
    marginTop: '30px',
  },
  checkboxLine: {
    lineHeight: '30px',
  },
  permissionItemLine: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    lineHeight: '30px',
  },
}));

const RoleAdd = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [permissionGroup, setPermissionGroup] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(null);

  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionSubAccount = {};
  permission_groups.map((item) => {
    if (item.name === 'Sub Account') {
      arrPermissionSubAccount = item.permissions;
    }
    return item.name === 'Sub Account'
  });

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { dataResponse, isLoading, isHasPermission } = useFetchData(
    '/api/role/permissions'
  );

  useEffect(() => {
    let cloneArr = cloneDeep(dataResponse);
    forEach(cloneArr, (item, index) => {
      const permissionsList = item.permissions;

      permissionsList.forEach((arr) => {
        arr.none = true;
      });
      cloneArr[index].permissions = permissionsList;
    });
    setSelectedColumn('none');
    setPermissionGroup(cloneArr);
  }, [dataResponse]);

  useEffect(() => {
    document.title = 'Add Role';
  }, []);

  const onSubmit = async (data) => {
    const form = {
      role_name: data.role_name,
      description: data.description,
      permission_group: permissionGroup,
    };
    try {
      let response = await api.post('/api/role/create', form);
      if (get(response, 'success', false)) {
        toast.success('Add Role Success', {
          onClose: navigate('/role'),
        });
      } else {
        if (response?.err === 'err:suspended_account') {
          toast.warn(t('suspended_account'));
        }
        if (response.err === "err:no_permission") {
          toast.warn(t('no_permission'));
        }
        if (response?.err === 'err:form_validation_failed') {
          for (const field in response?.data) {
            setError(field, {
              type: 'validate',
              message: t(response?.data[field]),
            });
          }
        }
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  const onCancel = () => {
    navigate('/role');
  };

  const onChange = (e, permissionName, permissionAction) => {
    const { name } = e.target;
    if (name !== selectedColumn) {
      setSelectedColumn(null);
    }
    const cloneArr = permissionGroup.slice();
    const updatedPermissionIndex = findIndex(
      cloneArr,
      (item) => item.name === permissionName
    );
    const updatedRowIndex = findIndex(
      cloneArr[updatedPermissionIndex].permissions,
      (item) => item.name === permissionAction
    );
    Object.keys(
      cloneArr[updatedPermissionIndex].permissions[updatedRowIndex]
    ).forEach((key) => {
      if (key === 'name') {
        return;
      }
      if (key === name) {
        cloneArr[updatedPermissionIndex].permissions[updatedRowIndex][
          key
        ] = true;
      } else {
        cloneArr[updatedPermissionIndex].permissions[updatedRowIndex][
          key
        ] = false;
      }
    });
    const isAllPermissionsAreSameColumn = cloneArr.every((item) =>
      item.permissions.every((itemPermission) => itemPermission[name])
    );
    if (isAllPermissionsAreSameColumn) {
      setSelectedColumn(name);
    }
    setPermissionGroup(cloneArr);
  };

  const checkedColumn = (name) => {
    setSelectedColumn(name);
    const cloneArr = permissionGroup.slice();
    forEach(cloneArr, (item, index) => {
      const permissionsList = item.permissions;
      permissionsList.forEach((arr) => {
        Object.keys(arr).forEach((key) => {
          if (key === 'name') {
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

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  if (arrPermissionSubAccount[0].none) {
    return <Navigate to="/home/dashboard" />;
  }

  if (!arrPermissionSubAccount[0].full) {
    if(arrPermissionSubAccount[0].view || arrPermissionSubAccount[0].edit) {
      return <Navigate to="/home/dashboard" />;
    }
  }

  return (
    <MainCard title="Add Role">
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
          pattern
          inputProps={{
            maxLength: 100,
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
        <FormLabel>{t('Permission List')}</FormLabel>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Permission</TableCell>
                {LIST_PERMISSIONS.map((permission, index) => (
                  <TableCell key={index}>
                    <Radio
                      checked={selectedColumn === permission.value}
                      name={permission.value}
                      onChange={(e) => checkedColumn(permission.value)}
                    />
                    {permission.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {permissionGroup.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    <div className={classes.permissionLine}>
                      <p className={classes.permissionTitle}>{row?.name}</p>
                      <div className={classes.permissionList}>
                        {(row?.permissions || []).map((item) => (
                          <div
                            key={item?.name}
                            className={classes.permissionItemLine}
                          >
                            {item?.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={classes.listCheckboxes}>
                      {(row?.permissions || []).map((item) => (
                        <div key={item?.name} className={classes.checkboxLine}>
                          <Radio
                            name="none"
                            onChange={(e) => onChange(e, row.name, item.name)}
                            checked={item.none}
                          />
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={classes.listCheckboxes}>
                      {(row?.permissions || []).map((item) => (
                        <div key={item?.name} className={classes.checkboxLine}>
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
                      {(row?.permissions || []).map((item) => (
                        <div key={item?.name} className={classes.checkboxLine}>
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
                      {(row?.permissions || []).map((item) => (
                        <div key={item?.name} className={classes.checkboxLine}>
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
                      {(row?.permissions || []).map((item) => (
                        <div key={item?.name} className={classes.checkboxLine}>
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
        <ButtonGroup>
          <SubmitButton />
          <CancelButton onAction={onCancel} text='Cancel'/>
        </ButtonGroup>
      </form>
    </MainCard>
  );
};

export default RoleAdd;
