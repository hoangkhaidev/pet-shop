/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import get from 'lodash/get';
import RunDevelopmentTestFilter from './RunDevelopmentTestFilter';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useRouter from 'utils/hooks/useRouter';
import api from 'utils/api';
import TableComponent from 'views/TableComponent/TableComponent';
import MainCard from 'ui-component/cards/MainCard';

const RunDevelopmentTest = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const methods = useForm({
    defaultValues: router.query,
  });

  const [data, setData] = useState([]);
  
  const onSubmitFilter = async (data) => {
    try {
        const response = await api.post(`/api/global/brand_detail/${router?.query?.id}/verify_api_integration`, data);
        
        if (get(response, 'success', false)) {
          const mapData = response?.data;
          setData(mapData);
        } else {
          if (response?.err === 'err:brand_not_found') {
            toast.warn(t('brand_not_found'));
          }
          if (response?.err === 'err:account_not_found') {
            toast.warn(t('brand_not_found'));
          }
          if (response?.err === 'err:suspended_account') {
            toast.warn(t('suspended_account'));
          }
        }
    } catch (e) {
      console.log('e', e);
    }
  };

  const columns = [ 
    {
      data_field: 'test_name',
      column_name: 'Test Name',
      align: 'left'
    },
    {
      data_field: 'test_description',
      column_name: 'Test Description',
      align: 'left',
    },
    {
      data_field: 'test_result',
      column_name: 'Test Result',
      align: 'left',
    },
    {
      data_field: 'more_information',
      column_name: 'More Information',
      align: 'left',
      formatter: (cell, row) => {
        let newText = cell.split("\n").map((item, i) => {
          return <p key={i}>{item}</p>;
        });
        return <div style={{ textAlign: 'left' }}>{newText}</div>;
      },
    },
  ];

  return (
    <>
      <FormProvider {...methods}>
        <RunDevelopmentTestFilter onSubmitFilter={onSubmitFilter} />
      </FormProvider>
      <MainCard>
        <TableComponent
          data={data}
          columns={columns}
          types="RoleList"
        />
      </MainCard>
    </>
  );
};

export default RunDevelopmentTest;