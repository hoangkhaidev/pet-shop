/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, lazy } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import get from 'lodash/get';
import Link from '@material-ui/core/Link';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import TableComponent from 'src/components/shared/TableComponent/TableComponent';
import NoPermissionPage from 'src/components/NoPermissionPage/NoPermissionPage';
import TitlePage from 'src/components/shared/TitlePage/TitlePage';
import Loading from 'src/components/shared/Loading/Loading';
import useFetchData from 'src/utils/hooks/useFetchData';
import useRouter from 'src/utils/hooks/useRouter';
import BrandListFilter from './BrandListFilter';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';

const ChangePasswordForm = lazy(() =>
  import('src/components/Modal/ChangePasswordForm')
);
const ChangeStatus = lazy(() => import('src/components/Modal/ChangeStatus'));
const DeleteItem = lazy(() => import('src/components/Modal/DeleteItem'));

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

const BrandList = () => {
  const router = useRouter();
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [objFilter, setObjFilter] = useState({
    name_search: '',
    status_search: '',
    operator_id: 0,
    sort_field: 'username',
    sort_order: 'asc',
    page: 1,
    page_size: 30,
    ...{
      ...router.query,
      operator_id: router.query.operator_id ? Number(router.query.operator_id) : 0,
    },
  });
  
  const methods = useForm();
  const [refreshData, setRefreshData] = useState('');

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/brand',
    objFilter,
    [refreshData]
  );
    
  const [operatorData, setOperatorData] = useState([]);

  const onResetFilter = () => {
    methods.reset({
      name_search: '',
      status_search: 'all',
      operator_id: 'all',
      sort_field: 'username',
      sort_order: 'asc',
      page: 1,
      page_size: 30,
    });
    setObjFilter({
      name_search: '',
      status_search: 'all',
      operator_id: 0,
      sort_field: 'username',
      sort_order: 'asc',
      page: 1,
      page_size: 30,
    });
  };

  useEffect(() => {
    const mapData = get(dataResponse, 'list', []);
    mapData.map((data) => (data.id = data.account_id));
    setData(mapData);

    const dataList = dataResponse?.list;
    if (!data) return;
    let mapDataO = [{
      id: 0,
      value: 'all',
      label: 'All',
    }];
    dataList?.forEach((data) => {
      let optionData = {
        id: data.operator_id,
        value: data.operator_id,
        label: data.username,
      };
      mapDataO.push(optionData);
    });
    setOperatorData([...mapDataO]);
  }, [dataResponse]);

  const onSubmit = async (dataForm) => {
    const form = {
      ...dataForm,
      name_search:
        dataForm?.name_search ? dataForm?.name_search : '',
      status_search:
        dataForm?.status_search ? dataForm?.status_search : '',
      operator_id:
        dataForm?.operator_id === 'all' ? 0 : Number(dataForm.operator_id),
    };

    setObjFilter({
      ...form,
      page: 1,
      page_size: 30,
    });
  };

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
        <Link href={`/brand/list/${row.id}/edit`}>{cell}</Link>
      ),
    },
    {
      data_field: 'brand_name',
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
      data_field: 'member_count',
      column_name: 'Players',
      align: 'right',
      formatter: (cell, row) => {
        return (
          <Link href={`/players/players?brand_id=${row.brand_id}&currency=&from_date=${moment().format("DD/MM/YYYY")}&ip_address=&language=&nick_name=&page=1&page_size=30&player_id=0&sort_field=id&sort_order=desc&to_date=${moment().format("DD/MM/YYYY")}`}>{cell}</Link>
        )
      }
    },
    {
      data_field: 'api_endpoint',
      column_name: 'Api Endpoint',
      align: 'left',
    },
    {
      data_field: 'product_names',
      column_name: 'Product',
      align: 'left',
      formatter: (cell) => cell.join(', '),
    },
    {
      data_field: 'statuses',
      column_name: 'Status',
      align: 'center',
      formatter: (cell, row) => {
        const labels = row.statuses.map(item => item.status);
        return (
          <ChangeStatus
            linkApi={`/api/brand/${row.account_id}/update_status`}
            types='viewStatus'
            labels={labels}
            STATUS={STATUS_ALL}
            username={row.username}
            statuses={row.statuses}
          />
        );
      },
    },
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
          <ButtonGroup className={classes.root} style={{alignItems: 'center'}}>
            <ChangeStatus
              setRefreshData={setRefreshData}
              newlabel={newlabel}
              types={'editStatus'}
              STATUS={STATUS}
              linkApi={`/api/brand/${row.id}/update_status`}
              username={row.username}
              statuses={row.statuses}
            />
            <ChangePasswordForm
              linkApi={`/api/brand/${row.account_id}/update_password`}
              username={row.username}
            />
            <DeleteItem
              linkApi={`/api/brand/${row.account_id}/delete`}
              title={`Confirmation`}
              types='brand'
              username={row.username}
            />
          </ButtonGroup>
        )
      }
    }
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

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <>
      {isLoading && <Loading />}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <BrandListFilter onResetFilter={onResetFilter} operatorData={operatorData} />
        </form>
      </FormProvider>
      <ContentCardPage>
        <TitlePage title="Brand List" />
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

export default BrandList;
