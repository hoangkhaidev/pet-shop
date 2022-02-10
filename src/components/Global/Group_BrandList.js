/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Link from '@material-ui/core/Link';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import TableComponent from 'src/components/shared/TableComponent/TableComponent';
import NoPermissionPage from 'src/components/NoPermissionPage/NoPermissionPage';
import Loading from 'src/components/shared/Loading/Loading';
import useFetchData from 'src/utils/hooks/useFetchData';
import useRouter from 'src/utils/hooks/useRouter';
import Group_BrandFilter from './Group_BrandFilter';
import cloneDeep from 'lodash.clonedeep';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { setParentParam } from 'src/features/parentParam/parentParam';

const Group_BrandList = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [objFilter , setObjFilter] = useState({
    key_search: ""
  });
  ///handle permission
  const roleUser = useSelector((state) => state.roleUser);
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionGlobalBrand = {};
  permission_groups.map((item) => {
    if (item.name === 'Global') {
      arrPermissionGlobalBrand = item.permissions[0];
    }
    return item.name === 'Global'
  });

  let arrPermissionOperator = {};
  permission_groups.map((item) => {
    if (item.name === 'Operator') {
      arrPermissionOperator = item.permissions[0];
    }
    return item.name === 'Operator'
  });

  const methods = useForm({
    defaultValues: router.query,
  });

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/global',
    objFilter
  );

  useEffect(() => {
    let mapData = cloneDeep(dataResponse);
    setData(mapData);
  }, [dataResponse]);

  useEffect(() => {
    dispatch(setParentParam(`${router.location.pathname}${router.location.search}`));
  }, [router]);

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  const columns = [ 
    {
      data_field: 'operator_name',
      column_name: 'Group / Operator',
      align: 'left',
      formatter: (cell, row) => {
        let link = '';

        if (roleUser.account_type === 'operator' || roleUser.account_type === 'operatorsub' || roleUser.account_type === 'brand' || roleUser.account_type === 'brandsub') {
          link = cell;
        } else {
          if (arrPermissionOperator?.full) {
            link = (<Link href={`/operator/list/${row.account_id}/edit`}>{cell}</Link>);
          } else if (arrPermissionOperator?.view || arrPermissionOperator?.create) {
            link = (<Link href={`/operator/list/${row.account_id}/view`}>{cell}</Link>);
          } else if (arrPermissionOperator?.none) {
            link = cell;
          } else {
            link = (<Link href={`/operator/list/${row.account_id}/edit`}>{cell}</Link>);
          }
        }
        return link;
      }
    },
    {
      data_field: 'brand_total',
      column_name: 'Brand Total',
      align: 'right',
      formatter: (cell, row) => {
        return (
          <Link href={`/global/group_brand/${row.operator_id}/operator_name/${row.operator_name}`}>
            {cell}
          </Link>
        );
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

  const onSubmit = async (dataForm) => {
    const form = {
      ...dataForm,
    };

    setObjFilter({
      ...form,
    });
  };

  if (arrPermissionGlobalBrand.none) {
    return <Navigate to="/404" />;
  }

  return (
    <>
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
    </>
  );
};

export default Group_BrandList;
