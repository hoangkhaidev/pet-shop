import { Fragment, useState, useEffect, lazy } from 'react';
// import { useTranslation } from 'react-i18next';
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

const ChangePasswordForm = lazy(() =>
  import('src/components/Modal/ChangePasswordForm')
);
const ChangeStatus = lazy(() => import('src/components/Modal/ChangeStatus'));

const DeleteItem = lazy(() => import('src/components/Modal/DeleteItem'));

const STATUS = [
  {
    id: 1,
    value: 'active',
    label: 'active',
  },
  {
    id: 2,
    value: 'inactive',
    label: 'inactive',
  },
  {
    id: 3,
    value: 'suspended',
    label: 'suspended',
  },
  {
    id: 4,
    value: 'unsuspended',
    label: 'unsuspended',
  },
  {
    id: 5,
    value: 'locked',
    label: 'locked',
  },
  {
    id: 6,
    value: 'unlocked',
    label: 'unlocked',
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
  
  const methods = useForm({
    defaultValues: router.query,
  });
  // const { t } = useTranslation();
  // console.log(t);
  
  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/brand',
    objFilter
    );
    
  const [operatorData, setOperatorData] = useState([]);

  const onResetFilter = () => {
    methods.reset({
      name_search: '',
      status_search: '',
      operator_id: 'all',
      sort_field: 'username',
      sort_order: 'asc',
      page: 1,
      page_size: 30,
    });
    setObjFilter({
      name_search: '',
      status_search: '',
      operator_id: 0,
      sort_field: 'username',
      sort_order: 'asc',
      page: 1,
      page_size: 30,
    });
  }

  useEffect(() => {
    console.log(objFilter);
  }, [objFilter]);

  useEffect(() => {
    const mapData = get(dataResponse, 'list', []);
    mapData.map((data) => (data.id = data.account_id));
    setData(mapData);
  }, [dataResponse]);

  useEffect(() => {
    const data = dataResponse?.list;
    if (!data) return;
    let mapData = [{
      id: 0,
      value: 'all',
      label: 'All',
    }];
    data.forEach((data) => {
      let optionData = {
        id: data.operator_id,
        value: data.operator_id,
        label: data.username,
      };
      mapData.push(optionData);
    });
    setOperatorData([...mapData]);
  }, [dataResponse]);

  const onSubmit = async (dataForm) => {
    // console.log(dataForm)
    const form = {
      ...dataForm,
      name_search:
        dataForm?.name_search ? dataForm?.name_search : '',
      status_search:
        dataForm?.status_search === 'all' ? '' : dataForm?.status_search,
      operator_id:
        dataForm?.operator_id === 'all' ? 0 : Number(dataForm.operator_id),
    };
    // console.log(form)

    setObjFilter({
      ...form,
      page: 1,
      page_size: 30,
    });
  };

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

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
      data_field: 'name',
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
      formatter: (cell, row) => (
        <Link href={`/player/list`}>{cell}</Link>
      ),
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
    },
    {
      data_field: 'statuses',
      column_name: 'Status',
      align: 'center',
      formatter: (cell, row) => {
        const newlabel = row.statuses[0] ? row.statuses[0].status : 'active';
        return (
          <ChangeStatus
            newlabel={newlabel}
            linkApi={`/api/brand/${row.account_id}/update_status`}
            STATUS={STATUS}
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
      formatter: (cell, row) => (
        <ButtonGroup className={classes.root}>
          <ChangePasswordForm
            linkApi={`/api/brand/${row.account_id}/update_password`}
            username={row.username}
          />
          <DeleteItem
            linkApi={`/api/brand/${row.account_id}/delete`}
            title={`Confirmation`}
            types='brand'
          />
        </ButtonGroup>
      ),
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

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default BrandList;
