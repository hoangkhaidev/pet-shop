/* eslint-disable react/self-closing-comp */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable no-else-return */
/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, lazy } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import get from 'lodash/get';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { makeStyles } from '@mui/styles';
import useRouter from 'utils/hooks/useRouter';
import useFetchData from 'utils/hooks/useFetchData';
import { setParentParam } from 'features/parentParam/parentParam';
import { Link } from '@mui/material';
import NoPermissionPage from 'views/NoPermissionPage/NoPermissionPage';
import Loading from 'views/Loading/Loading';
import OperatorListFilter from './OperatorFilter';
import MainCard from 'ui-component/cards/MainCard';
import TableComponent from 'views/TableComponent/TableComponent';
import { cloneDeep } from 'lodash';
import { Box } from '@mui/system';
import { ButtonGroupTable } from 'views/Button/Button';
import StatusBadge from 'views/StatusBadge/StatusBadge';

const ChangePasswordForm = lazy(() =>
  import('../Modal/ChangePasswordForm')
);
const ChangeStatus = lazy(() => import('../Modal/ChangeStatus'));
const DeleteItem = lazy(() => import('../Modal/DeleteItem'));

const STATUS_ALL = [
  {
    id: 1,
    value: 'suspended',
    label: 'Suspended',
  },
  {
    id: 2,
    value: 'locked',
    label: 'Locked',
  },
  {
    id: 3,
    value: 'inactive',
    label: 'Inactive',
  },
  {
    id: 4,
    value: 'unsuspended',
    label: 'Unsuspend',
  },
  {
    id: 5,
    value: 'unlocked',
    label: 'Unlock',
  },
  {
    id: 3,
    value: 'active',
    label: 'Active',
  },
];

const STATUS_ACTIVE = [
  {
    id: 1,
    value: 'suspended',
    label: 'Suspend',
  },
  {
    id: 2,
    value: 'locked',
    label: 'Lock',
  },
  {
    id: 3,
    value: 'inactive',
    label: 'Inactivate',
  },
];

const STATUS_LOCKED = [
  {
    id: 1,
    value: 'suspended',
    label: 'Suspend',
  },
  {
    id: 2,
    value: 'unlocked',
    label: 'Unlock',
  },
  {
    id: 3,
    value: 'inactive',
    label: 'Inactivate',
  },
];

const STATUS_SUSPENDED = [
  {
    id: 1,
    value: 'unsuspended',
    label: 'Unsuspend',
  },
  {
    id: 2,
    value: 'locked',
    label: 'Lock',
  },
  {
    id: 3,
    value: 'inactive',
    label: 'Inactivate',
  },
];

const STATUS_INACTIVE = [
  {
    id: 1,
    value: 'active',
    label: 'Activate',
  },
];

const STATUS_LOCKED_SUSPENDED = [
  {
    id: 1,
    value: 'unsuspended',
    label: 'Unsuspend',
  }, 
  {
    id: 2,
    value: 'unlocked',
    label: 'Unlock',
  },
  {
    id: 3,
    value: 'inactive',
    label: 'Inactivate',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  addRoleButton: {
    float: 'right',
  },
}));

const OperatorList = () => {
  const router = useRouter();
  const classes = useStyles();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionOperator = {};
  permission_groups?.map((item) => {
    if (item.name === 'Operator') {
      arrPermissionOperator = item.permissions;
    }
    return item.name === 'Operator'
  });

  const [objFilter, setObjFilter] = useState({
    name_search: '',
    status_search: 'all',
    sort_field: 'username',
    sort_order: 'asc',
    page: 1,
    page_size: 30,
  });

  const methods = useForm({
    defaultValues: router.query,
  });

  const [refreshData, setRefreshData] = useState('');

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/operators',
    objFilter,
    [refreshData]
  );

  useEffect(() => {
    const mapData = get(dataResponse, 'list', []);
    mapData.map((data) => (data.id = data.account_id));
    setData(mapData);
  }, [dataResponse]);

  const onSubmit = async (dataForm) => {
    const form = {
      ...dataForm,
      status_search:
        dataForm?.status_search ? dataForm?.status_search : '',
    };
    setObjFilter({
      ...form,
      page: 1,
      page_size: 30,
    });
  };

  useEffect(() => {
    dispatch(setParentParam(`${router.location.pathname}${router.location.search}`));
  }, [router]);

  const columns = [
    {
      data_field: 'indexRow',
      column_name: '#',
      align: 'center',
    },
    {
      data_field: 'username',
      column_name: 'Username',
      align: 'left',
      formatter: (cell, row) => {
        let checkInactive = false;
        row.statuses?.map((item) => {
          if (item.status === 'inactive') {
            checkInactive = true;
          }
          return item.status;
        });
        if (!checkInactive) {
          if (arrPermissionOperator[0]?.full) {
            return <Link href={`/operator/list/${row.id}/edit`}>{cell}</Link>;
          } else if (arrPermissionOperator[0]?.view || arrPermissionOperator[0]?.create) {
            return <Link href={`/operator/list/${row.id}/view`}>{cell}</Link>;
          } else {
            return <Link href={`/operator/list/${row.id}/edit`}>{cell}</Link>;
          }
        } else {
          return cell;
        }
      }
    },
    {
      data_field: 'operator_name',
      column_name: 'Name',
      align: 'left',
    },
    {
      data_field: 'support_email',
      column_name: 'Support Email',
      align: 'left',
    },
    {
      data_field: 'finance_emails',
      column_name: 'Finance Email',
      align: 'left',
      formatter: (cell) => {
        if (cell.length > 3) {
          const item = cloneDeep(cell);
          item.length = 3;
          return (
            <Box>
              <Box sx={{pb: '10px'}}>{item.join(', ')}</Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                <StatusBadge label={`+${cell.length - 3}`} colorText={'plus'} />
              </Box>
            </Box>
          );
        } else {
          return cell.join(', ');
        }
      },
    },
    {
      data_field: 'created_at',
      column_name: 'Created At',
      align: 'left',
      nowrap: true
    },
    {
      data_field: 'last_logged_in',
      column_name: 'Last Login Time',
      align: 'left',
      nowrap: true
    },
    {
      data_field: 'member_count',
      column_name: 'Players',
      align: 'right',
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
      data_field: 'api_endpoint',
      column_name: 'Api Endpoint',
      align: 'left'
    },
    {
      data_field: 'product_names',
      column_name: 'Product',
      align: 'left',
      formatter: (cell) => cell.join(', '),
    },
    {
      data_field: 'brand_count',
      column_name: 'Brand',
      align: 'right',
      formatter: (cell, row) => (
        <Link href={`/brand/list?name_search=&operator_id=${row.operator_id}&page=1&page_size=30&sort_field=username&sort_order=asc&status_search=`}>{cell}</Link>
      ),
    },
    {
      data_field: 'statuses',
      column_name: 'Status',
      align: 'center',
      formatter: (cell, row) => {
        const labels = row.statuses.map(item => item.status);
        return (
          <ChangeStatus
            setRefreshData={setRefreshData}
            key={row.operator_id}
            types='viewStatus'
            labels={labels}
            linkApi={`/api/operators/${row.id}/update_status`}
            STATUS={STATUS_ALL}
            username={row.username}
            statuses={row.statuses}
          />
          
        );
      },
    },
    arrPermissionOperator[0]?.full ? (
      {
        data_field: 'action',
        column_name: 'Action',
        align: 'center',
        formatter: (cell, row) => {
          const newlabel = row.statuses[0] ? row.statuses[0].status : 'active';
          let STATUS = [];
          switch(row.statuses.length > 0) {
            case row.statuses.length === 1:
              if (newlabel === 'inactive') STATUS = STATUS_INACTIVE;
              if (newlabel === 'active') STATUS = STATUS_ACTIVE;
              if (newlabel === 'locked') STATUS = STATUS_LOCKED;
              if (newlabel === 'suspended') STATUS = STATUS_SUSPENDED;
              break;
            case row.statuses.length === 2:
              if (row.statuses[0].status === 'inactive' || row.statuses[1].status === 'inactive') {
                STATUS = STATUS_INACTIVE;
              } else {
                STATUS = STATUS_LOCKED_SUSPENDED;
              }
              break;
            case row.statuses.length === 3:
              STATUS = STATUS_INACTIVE;
              break;
            default:
              STATUS = STATUS_ACTIVE;
          };
          return (
            <ButtonGroupTable className={classes.root} style={{alignItems: 'center'}}>
              <ChangeStatus
                setRefreshData={setRefreshData}
                newlabel={newlabel}
                types={'editStatus'}
                STATUS={STATUS}
                linkApi={`/api/operators/${row.id}/update_status`}
                username={row.username}
                statuses={row.statuses}
              />
              <ChangePasswordForm
                linkApi={`/api/operators/${row.id}/update_password`}
                username={row.username}
                title="Change password"
              />
              <DeleteItem
                linkApi={`/api/operators/${row.id}/delete`}
                username={row.username}
                title={`Confirmation`}
                types='operator'
              />
            </ButtonGroupTable>
          )
        }
      }
    ) :
    arrPermissionOperator[0]?.edit || arrPermissionOperator[0]?.create ? (
      {
        data_field: 'action',
        column_name: 'Action',
        align: 'center',
        formatter: (cell, row) => {
          const newlabel = row.statuses[0] ? row.statuses[0].status : 'active';
          let STATUS = [];
          switch(row.statuses.length > 0) {
            case row.statuses.length === 1:
              if (newlabel === 'inactive') STATUS = STATUS_INACTIVE;
              if (newlabel === 'active') STATUS = STATUS_ACTIVE;
              if (newlabel === 'locked') STATUS = STATUS_LOCKED;
              if (newlabel === 'suspended') STATUS = STATUS_SUSPENDED;
              break;
            case row.statuses.length === 2:
              if (row.statuses[0].status === 'inactive' || row.statuses[1].status === 'inactive') {
                STATUS = STATUS_INACTIVE;
              } else {
                STATUS = STATUS_LOCKED_SUSPENDED;
              }
              break;
            case row.statuses.length === 3:
              STATUS = STATUS_INACTIVE;
              break;
            default:
              STATUS = STATUS_ACTIVE;
          };
          return (
            <ButtonGroupTable className={classes.root} style={{alignItems: 'center'}}>
              {
                arrPermissionOperator[0]?.create ? '' : (
                    <ChangeStatus
                      setRefreshData={setRefreshData}
                      newlabel={newlabel}
                      types={'editStatus'}
                      STATUS={STATUS}
                      linkApi={`/api/operators/${row.id}/update_status`}
                      username={row.username}
                      statuses={row.statuses}
                    />
                )
              }
              {
                arrPermissionOperator[0]?.create ? '' : (
                  <ChangePasswordForm
                      linkApi={`/api/operators/${row.id}/update_password`}
                      username={row.username}
                      title="Change password"
                  />
                )
              }
              {
                arrPermissionOperator[0]?.edit ? '' : (
                  <DeleteItem
                    linkApi={`/api/operators/${row.id}/delete`}
                    username={row.username}
                    title={`Confirmation`}
                    types='operator'
                  />
                )
              }
            </ButtonGroupTable>
          )
        }
      }
    ) : {}
    
  ];

  const handleChangePage = (page) => {
    let pageNew = page + 1;
    setObjFilter((prevState) => ({
      ...prevState,
      page: pageNew,
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setObjFilter((prevState) => ({
      ...prevState,
      page_size: parseInt(event.target.value, 10),
      page: 1,
    }));
  };

  const onResetFilter = () => {
    methods.reset({
      name_search: '',
      status_search: 'all',
      sort_field: 'username',
      sort_order: 'asc',
      page: 1,
      page_size: 30,
    });
    setObjFilter({
      name_search: '',
      status_search: 'all',
      sort_field: 'username',
      sort_order: 'asc',
      page: 1,
      page_size: 30,
    });
  }

  useEffect(() => {
    document.title = 'Operator List';
  }, []);

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  if (arrPermissionOperator[0]?.none) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      {isLoading && <Loading />}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <OperatorListFilter onResetFilter={onResetFilter} />
        </form>
      </FormProvider>
      <MainCard title="Operator List" sx={{mt: '15px'}}>
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
      </MainCard>
    </>
  );
};

export default OperatorList;
