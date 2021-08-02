import { Fragment, useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import get from 'lodash/get';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import TableComponent from 'src/components/shared/TableComponent/TableComponent';
import NoPermissionPage from 'src/components/NoPermissionPage/NoPermissionPage';
import Loading from 'src/components/shared/Loading/Loading';
import useFetchData from 'src/utils/hooks/useFetchData';
// import { makeStyles } from '@material-ui/core';
import CommissionListFilter from './CommissionListFilter';
import useRouter from 'src/utils/hooks/useRouter';
import { SubmitButton } from '../shared/Button/Button';

const CommissionList = () => {
  const router = useRouter();
  // const classes = useStyles();
  const [data, setData] = useState([]);
  const [refreshData , setRefreshData] = useState('');
  const [objFilter , setObjFilter] = useState({
    name_search: "",
    page: 1,
    page_size: 30
  });

  const methods = useForm({
    defaultValues: router.query,
  });

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/commission',
    objFilter,
    [refreshData]
  );

  useEffect(() => {
    const mapData = get(dataResponse, 'list', []);
    mapData.map((data) => (data.id = data.account_id));
    setData(mapData);
  }, [dataResponse]);
  useEffect(() => {
    console.log(dataResponse)
  }, [dataResponse]);

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  const columns = [ 
    {
      data_field: 'brand_name',
      column_name: 'Operator / Brand',
      align: 'left'
    },
    {
      data_field: 'name',
      column_name: 'Slot',
      align: 'left',
    },
    {
      data_field: 'symbol',
      column_name: '[product 2]',
      align: 'left',
    },
    {
      data_field: 'action',
      column_name: 'Action',
      align: 'center',
      formatter: (cell, row) => {
        return (
          <SubmitButton text="Submit"/>
        );
      },
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

  const onSubmit = async (dataForm) => {
    // console.log(dataForm)
    const form = {
      ...dataForm,
      name_search:
        dataForm?.name_search ? dataForm?.name_search : '',
    };
    // console.log(form)

    setObjFilter({
      ...form,
      page: 1,
      page_size: 30,
    });
  };

  return (
    <Fragment>
      {isLoading && <Loading />}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CommissionListFilter />
        </form>
      </FormProvider>
      <ContentCardPage>
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

export default CommissionList;
