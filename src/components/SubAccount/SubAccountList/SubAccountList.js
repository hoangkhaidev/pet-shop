import { useState, useEffect, lazy } from 'react';
import get from 'lodash/get';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TitlePage from 'src/components/shared/TitlePage/TitlePage';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import TableComponent from 'src/components/shared/TableComponent/TableComponent';
import Loading from 'src/components/shared/Loading/Loading';
import NoPermissionPage from 'src/components/NoPermissionPage/NoPermissionPage';
import useFetchData from 'src/utils/hooks/useFetchData';
import useRouter from 'src/utils/hooks/useRouter';
import SubAccountListFilter from './SubAccountListFilter';

const ChangePasswordForm = lazy(() =>
  import('src/components/Modal/ChangePasswordForm')
);
const ChangeStatus = lazy(() => import('src/components/Modal/ChangeStatus'));
const DeleteItem = lazy(() => import('src/components/Modal/DeleteItem'));

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
    value: 'unsuspended',
    label: 'Unsuspend',
  },
  {
    id: 4,
    value: 'unlocked',
    label: 'Unlock',
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
];

const SubAccountList = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  
  const [objFilter, setObjFilter] = useState({
    name_search: '',
    status_search: '',
    sort_field: 'username',
    sort_order: 'asc',
    filter_type: "all",
    brand_ids: [],
    page: 1,
    page_size: 30,
    ...{
      ...router.query,
      brand_ids: router.query.brand_ids ? [Number(router.query.brand_ids)] : [],
    },
  });
  const navigate = useNavigate();
  const classes = useStyles();

  const methods = useForm({
    defaultValues: router.query,
  });

  const [refreshData, setRefreshData] = useState('');

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/subs',
    objFilter, 
    [refreshData]
  );

  useEffect(() => {
    setData(get(dataResponse, 'list', []));
  }, [dataResponse]);

  useEffect(() => {
    console.log(objFilter);
  }, [objFilter]);

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
      formatter: (cell, row) => (
        <Link href={`/sub/list/${row.id}/edit`}>{cell}</Link>
      ),
    },
    {
      data_field: 'name',
      column_name: 'Name',
      align: 'left',
    },
    {
      data_field: 'role_name',
      column_name: 'Role',
      align: 'left',
    },
    {
      data_field: 'brand_names',
      column_name: 'Brand',
      align: 'left',
    },
    {
      data_field: 'statuses',
      column_name: 'Status',
      align: 'center',
      formatter: (cell, row) => {
        const labels = row.statuses.map(item => item.status);
        return (
          <ChangeStatus
            types='viewStatus'
            linkApi={`/api/subs/${row.id}/update_status`}
            labels={labels}
            STATUS={STATUS_ALL}
            username={row.username}
            statuses={row.statuses}
          />
        );
      },
    },
    {
      data_field: 'created_at',
      column_name: 'Created At',
      align: 'left',
    },
    {
      data_field: 'last_logged_in',
      column_name: 'Last Login Time',
      align: 'left',
    },
    {
      data_field: 'action',
      column_name: 'Action',
      align: 'center',
      formatter: (cell, row) => {
        const newlabel = row.statuses[0] ? row.statuses[0].status : 'active';
        let STATUS = [];
        if (newlabel === 'active') STATUS = STATUS_ACTIVE;
        if (newlabel === 'locked') STATUS = STATUS_LOCKED;
        if (newlabel === 'suspended') STATUS = STATUS_SUSPENDED;
        if (row.statuses.length > 1) {
          STATUS = STATUS_LOCKED_SUSPENDED;
        }
        return (
          <ButtonGroup className={classes.root} style={{alignItems: 'center'}}>
            <ChangeStatus
              setRefreshData={setRefreshData}
              newlabel={newlabel}
              types={'editStatus'}
              linkApi={`/api/subs/${row.id}/update_status`}
              username={row.username}
              statuses={row.statuses}
              STATUS={STATUS}
            />
            <ChangePasswordForm
              linkApi={`/api/subs/${row.id}/update_password`}
              username={row.username}
            />
            <DeleteItem
              linkApi={`/api/subs/${row.id}/delete`}
              title={`Confirmation`}
              username={row.username}
              types='account'
            />
          </ButtonGroup>
        )
      }
    },
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
      page: 1,
      page_size: parseInt(event.target.value, 10),
    }));
  };

  const onSubmit = (dataSubmit) => {
    let dataForm = {
      ...dataSubmit,
      name_search: dataSubmit.name_search ? dataSubmit.name_search : '',
      status_search: dataSubmit.status_search,
      sort_order: dataSubmit.sort_order,
      page: 1,
      page_size: 30
    };

    console.log(dataSubmit)
    if (dataSubmit?.brand_ids === 'all') {
      dataForm = {
        ...dataForm,
        filter_type: 'all',
        brand_ids: [],
      };
    } else {
      dataForm = {
        ...dataForm,
        filter_type: 'brand',
        brand_ids: dataSubmit?.brand_ids ? [Number(dataSubmit?.brand_ids)] : [],
      };
    }
    setObjFilter((prevState) => ({
      ...prevState,
      ...dataForm,
    }));
  };

  const onResetFilter = () => {
    setObjFilter({
      name_search: '',
      sort_field: 'username',
      sort_order: 'asc',
      filter_type: "all",
      brand_ids: [],
      page: 1,
      page_size: 30,
      status_search: 'all'
    });
    methods.reset({
      name_search: '',
      sort_order: 'asc',
      sort_field: 'username',
      filter_type: 'all',
      brand_ids: 'all',
      status_search: 'all',
    });
  };

  const onGotoAddSubPage = () => {
    navigate('/sub/create');
  };

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <>
      {isLoading && <Loading />}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <SubAccountListFilter onResetFilter={onResetFilter} />
        </form>
      </FormProvider>
      <ContentCardPage>
        <Button
          className={classes.addRoleButton}
          variant="contained"
          style={{ backgroundColor: '#1cb13c' }}
          startIcon={<AddIcon />}
          onClick={onGotoAddSubPage}
        >
          Add Sub Account
        </Button>
        <TitlePage title="Sub Account List" />
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
      </ContentCardPage>
    </>
  );
};

export default SubAccountList;
