/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import get from 'lodash/get';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import TableComponent from 'src/components/shared/TableComponent/TableComponent';
import NoPermissionPage from 'src/components/NoPermissionPage/NoPermissionPage';
import Loading from 'src/components/shared/Loading/Loading';
import useFetchData from 'src/utils/hooks/useFetchData';
// import { makeStyles } from '@material-ui/core';
import map from "lodash/map";
import CommissionListFilter from './CommissionListFilter';
import useRouter from 'src/utils/hooks/useRouter';
import CommissionInput from './CommissionInput';
import { useTranslation } from 'react-i18next';
import UpdateCommission from './UpdateCommission';
import api from 'src/utils/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
  const [objFilter , setObjFilter] = useState({
    name_search: "",
    page: 1,
    page_size: 30,
    ...router.query,
  });

  const methods = useForm({
    defaultValues: router.query,
  });

  const { dataResponse, total_size, isHasPermission } = useFetchData(
    '/api/commission',
    objFilter,
  );

  const [isLoading, setIsLoading] = useState(false);

  const { register, getValues, control } = useForm();
  
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
          align: 'right',
          formatter: (cell, row) => {
            let proCommission = getCommissionByProduct(row.product_commission, item?.product_id);
            return (
              <CommissionInput 
                name={`${row.brand_name}_${item?.product_id}`}
                defaultValue={proCommission.commission}
                disabled={!proCommission.enable}
                {...register(`${row.brand_name}_${item?.product_id}` ,  { required: true })}
                ref={`${row.brand_name}_${item?.product_id}`.ref}
                control={control}
                id={`${row.brand_name}_${item?.product_id}`}
                placeholder={t("EnterField", { field: t("Commission") })}
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
    row.product_commission.forEach(item => {
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
          window.location.reload()
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
      data_field: 'brand_name',
      column_name: 'Operator / Brand',
      align: 'left'
    },
    ...arrayCommissionColumn,
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

  return (
    <>
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
    </>
  );
};

export default CommissionList;
