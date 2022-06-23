/* eslint-disable arrow-body-style */
/* eslint-disable no-lonely-if */
/* eslint-disable prefer-const */
/* eslint-disable spaced-comment */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from '@mui/material';
import { setParentParam } from 'features/parentParam/parentParam';
import { cloneDeep } from 'lodash';
import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import MainCard from 'ui-component/cards/MainCard';
import useFetchData from 'utils/hooks/useFetchData';
import useRouter from 'utils/hooks/useRouter';
import Loading from 'views/Loading/Loading';
import NoPermissionPage from 'views/NoPermissionPage/NoPermissionPage';
import TableComponent from 'views/TableComponent/TableComponent';
import Group_BrandFilter from './Group_BrandFilter';

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
      item.permissions?.map((itemPermission) => {
        if (itemPermission.name === 'Global / Brand') arrPermissionGlobalBrand = itemPermission;
        return itemPermission;
      });
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

  useEffect(() => {
    document.title = 'Group/Brand List';
  }, []);

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

  console.log(objFilter);


  return (
    <>
      {isLoading && <Loading />}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Group_BrandFilter />
        </form>
      </FormProvider>
      <MainCard>
        <TableComponent
          data={data}
          columns={columns}
          types="RoleList"
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

export default Group_BrandList;
