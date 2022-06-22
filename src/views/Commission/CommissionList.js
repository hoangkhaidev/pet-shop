/* eslint-disable no-nested-ternary */
/* eslint-disable no-lonely-if */
/* eslint-disable object-shorthand */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import get from 'lodash/get';
import CommissionListFilter from './CommissionListFilter';
import CommissionInput from './CommissionInput';
import { useTranslation } from 'react-i18next';
import UpdateCommission from './UpdateCommission';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useRouter from 'utils/hooks/useRouter';
import useFetchData from 'utils/hooks/useFetchData';
import { map } from 'lodash';
import api from 'utils/api';
import NoPermissionPage from 'views/NoPermissionPage/NoPermissionPage';
import Loading from 'views/Loading/Loading';
import MainCard from 'ui-component/cards/MainCard';
import TableComponent from 'views/TableComponent/TableComponent';

const getCommissionByProduct = (list, product_id) => {
  const product_commission = list.find((obj) => obj.product_id === product_id);
  if (product_commission) return product_commission;
  return {
    commission: '0',
    enable: false
  };
};

const CommissionList = () => {
  const router = useRouter();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [arrayCommissionColumn, setArrayCommissionColumn] = useState([]);
  const [listProductCommission, setListProductCommission] = useState([]);
  const { t } = useTranslation();
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionCommission = {};
  permission_groups?.map((item) => {
    if (item.name === 'Configuration') {
      item.permissions?.map((itemPermission) => {
        if (itemPermission.name === 'Commission') arrPermissionCommission = itemPermission;
        return itemPermission;
      });
    }
    return item.name === 'Configuration'
  });

  const [objFilter , setObjFilter] = useState({
    name_search: "",
    page: 1,
    page_size: 30,
    ...router.query,
  });

  const { register, getValues, control } = useForm();

  const methods = useForm({
    defaultValues: router.query,
  });

  const { dataResponse, total_size, isHasPermission } = useFetchData(
    '/api/commission',
    objFilter,
  );

  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const mapData = get(dataResponse, 'list', []);
    setData(mapData);

    let product_commission = [];
    mapData.map((item) => {
      item.product_commission.map((product) => {
        let index = product_commission.findIndex((pro) => {
          return pro.product_id === product.product_id;
        });
        if (index === -1) product_commission.push(product);
        return product;
      });
      return item;
    });
    setListProductCommission(product_commission);
  }, [dataResponse]);

  const getColumns = useCallback(async () => {
    if (listProductCommission && arrayCommissionColumn.length <= 0) {
      setIsLoading(true);
      const arrayColumns = map(listProductCommission, item => {
        return ({
          dataField: item?.product_id,
          column_name: `${t(item?.product_name)}`,
          align: 'center',
          formatter: (cell, row) => {
            let proCommission = getCommissionByProduct(row.product_commission, item?.product_id);
            let check = true;
            if (arrPermissionCommission?.full) {
              check = true;
            } else if (arrPermissionCommission?.view) {
              check = false;
            } else {
              check = true;
            }
            return (
              <CommissionInput 
                name={`${row.brand_name}_${item?.product_id}`}
                defaultValue={proCommission.commission}
                disabled={check ? !proCommission.enable : true}
                register={register(`${row.brand_name}_${item?.product_id}` ,  { required: true })}
                control={control}
                id={`${row.brand_name}_${item?.product_id}`}
                placeholder={t("Commission", { field: t("Commission") })}
              />
            );
          },
        })
    });
      setArrayCommissionColumn(arrayColumns);
      setIsLoading(false);
    }
  }, [listProductCommission]);

  const onHandleUpdate = async (brand_id, brand_name, row) => {
    const formData = getValues();

    let productCommission = [];
    row.product_commission?.forEach(item => {
      if (item.enable) {
        const inputKey = `${brand_name}_${item?.product_id}`
        let commissionChange = formData[inputKey];
        if (!commissionChange) {
          data.forEach((dataItem) => {
            if (dataItem.brand_name === brand_name) {
              dataItem.product_commission.forEach((itemPro) => {
                if (itemPro.product_id === item.product_id) {
                  commissionChange = itemPro.commission;
                }
              });
            }
          });
        }
        productCommission.push({
          "product_id": item?.product_id,
          "commission": commissionChange
        });
      }
    });

    const form = {
      brand_id: brand_id,
      product_commission: productCommission,
    };

    const response = await api.post('/api/commission/commission_update', form);
    if (get(response, "success", false)) {
      toast.success('Update Commission Success', {
        onClose: setTimeout(() => {
          // window.location.reload()
        }, 0)
      });
    } else {
      if (response?.err === 'err:form_validation_failed') {
        toast.warn('Invalid commission', {
          onClose: navigate("/configuration/commission")
        });
      } else if (response?.err === 'err:suspended_account') {
        toast.warn(t('suspended_account'));
      } else if (response?.err === 'err:no_permission') {
        toast.warn(t('no_permission'));
      } else {
        toast.warn('Product not enable', {
          onClose: navigate("/configuration/commission")
        });
      }
    }
  }

  useEffect(()=> {
    getColumns();
  }, [getColumns]);

  const columns = [ 
    {
      data_field: 'indexRow',
      column_name: '#',
      align: 'center',
    },
    {
      data_field: 'brand_name',
      column_name: 'Operator / Brand',
      align: 'left'
    },
    ...arrayCommissionColumn,
    arrPermissionCommission?.full ? (
      {
        data_field: 'action',
        column_name: 'Action',
        align: 'center',
        formatter: (cell, row) => {
          return (
            <UpdateCommission 
              onHandleUpdate={onHandleUpdate} 
              brand_id={row.brand_id} 
              name={row.brand_name} 
              row={row}
            />
          );
        },
      }
    ) : 
    arrPermissionCommission?.edit ? (
      {
        data_field: 'action',
        column_name: 'Action',
        align: 'center',
        formatter: (cell, row) => {
          return (
            <UpdateCommission 
              onHandleUpdate={onHandleUpdate} 
              brand_id={row.brand_id} 
              name={row.brand_name} 
              row={row}
            />
          );
        },
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
      page: 1,
      page_size: parseInt(event.target.value, 10),
    }));
  };

  const onSubmit = async (dataForm) => {
    const form = {
      ...dataForm,
      name_search:
        dataForm?.name_search ? dataForm?.name_search : '',
    };

    setObjFilter({
      ...form,
      page: 1,
      page_size: 30,
    });
  };

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  if (arrPermissionCommission.none) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      {isLoading && <Loading />}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CommissionListFilter />
        </form>
      </FormProvider>
      <MainCard sx={{mt: '15px'}}>
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

export default CommissionList;
