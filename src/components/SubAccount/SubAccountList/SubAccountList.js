import { useState, useEffect, lazy, Fragment } from 'react';
import get from 'lodash/get';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import TooltipIcon from 'src/components/shared/TooltipIcon/TooltipIcon';
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

const STATUS = [
  {
    id: 1,
    value: 'suspended',
    label: 'suspended',
  },
  {
    id: 2,
    value: 'locked',
    label: 'locked',
  },
  {
    id: 3,
    value: 'unsuspended',
    label: 'unsuspended',
  },
  {
    id: 4,
    value: 'unlocked',
    label: 'unlocked',
  }
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
    brand_ids: [1],
    page: 1,
    page_size: 30,
    ...{
      ...router.query,
      brand_ids: router.query.brand_ids ? [Number(router.query.brand_ids)] : [1],
    },
  });
  const navigate = useNavigate();
  const classes = useStyles();

  const methods = useForm({
    defaultValues: router.query,
  });

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/subs',
    objFilter
  );

  useEffect(() => {
    setData(get(dataResponse, 'list', []));
  }, [dataResponse]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const columns = [
    {
      data_field: 'indexRow',
      column_name: 'No',
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
        const newlabel = row.statuses[0] ? row.statuses[0].status : 'active';
        // console.log(row.statuses)
        return (
          <ChangeStatus
            types='viewStatus'
            newlabel={newlabel}
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
        return (
          <ButtonGroup className={classes.root}>
            <ChangeStatus
              newlabel={newlabel}
              linkApi={`/api/subs/${row.id}/update_status`}
              STATUS={STATUS}
              username={row.username}
              statuses={row.statuses}
            />
            <ChangePasswordForm
              linkApi={`/api/subs/${row.id}/update_password`}
              username={row.username}
            />
            <DeleteItem
              linkApi={`/api/subs/${row.id}/delete`}
              title={`Delete ${row.username} Account`}
            />
            <TooltipIcon />
          </ButtonGroup>
        )
      }
    },
  ];

  const handleChangePage = (page) => {
    setObjFilter((prevState) => ({
      ...prevState,
      page,
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
    let data = {
      ...dataSubmit,
      name_search: dataSubmit.name_search ? dataSubmit.name_search : '',
      status_search: dataSubmit.status_search,
      sort_order: dataSubmit.sort_order,
      page: 1,
      page_size: 30
    };
    if (dataSubmit?.brand === 'all') {
      data = {
        ...data,
        filter_type: dataSubmit?.brand,
        brand_ids: [1],
      };
    } else {
      data = {
        ...data,
        filter_type: 'brand',
        brand_ids: dataSubmit?.brand ? [Number(dataSubmit?.brand)] : [1],
      };
    }
    delete data.brand;
    // console.log(data)
    setObjFilter((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  const onResetFilter = () => {
    setObjFilter({
      name_search: '',
      sort_field: 'username',
      sort_order: 'asc',
      filter_type: "all",
      brand_ids: [1],
      page: 1,
      page_size: 30,
      status_search: ''
    });
    methods.reset({
      name_search: '',
      sort_order: 'asc',
      filter_type: "all",
      brand_ids: [1],
      status_search: '',
    });
  };

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  const onGotoAddSubPage = () => {
    navigate('/sub/create');
  };

  return (
    <Fragment>
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
          color="primary"
          startIcon={<AddIcon />}
          onClick={onGotoAddSubPage}
        >
          Add Sub Account
        </Button>
        <TitlePage title="Sub Account List" />
        <TableComponent
          data={data}
          columns={columns}
          pagination={{
            total_size,
            page: objFilter.page,
            page_size: objFilter.page_size,
          }}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </ContentCardPage>
    </Fragment>
  );
};

export default SubAccountList;
