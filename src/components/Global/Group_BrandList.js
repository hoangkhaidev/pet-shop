/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import Link from '@material-ui/core/Link';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import TableComponent from 'src/components/shared/TableComponent/TableComponent';
import NoPermissionPage from 'src/components/NoPermissionPage/NoPermissionPage';
import Loading from 'src/components/shared/Loading/Loading';
import useFetchData from 'src/utils/hooks/useFetchData';
import useRouter from 'src/utils/hooks/useRouter';
// import api from 'src/utils/api';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
import Group_BrandFilter from './Group_BrandFilter';
import BrandListBelow from './BrandListBelow';

const Group_BrandList = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [objFilter , setObjFilter] = useState({
    key_search: ""
  });

  const methods = useForm({
    defaultValues: router.query,
  });

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/global',
    objFilter
  );

  useEffect(() => {
    setData(dataResponse);
  }, [dataResponse]);

  // useEffect(()=> {
  //   console.log(objFilter);
  // }, [objFilter]);

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  const columns = [ 
    {
      data_field: 'operator_name',
      column_name: 'Group / Operator',
      align: 'left',
      formatter: (cell, row) => {
        console.log(row)
        return (
          <Link href={`/operator/list/${row.operator_id}/edit`}>{cell}</Link>
        )
      }
    },
    {
      data_field: 'brand_total',
      column_name: 'Brand Total',
      align: 'right',
      formatter: (cell, row) => {
        return (
          <BrandListBelow roundId={row.operator_id} cell={cell} />
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
    };
    // console.log(form)

    setObjFilter({
      ...form,
    });
  };

  return (
    <Fragment>
      {isLoading && <Loading />}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Group_BrandFilter />
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
          types="RoleList"
        />
      </ContentCardPage>
    </Fragment>
  );
};

export default Group_BrandList;
