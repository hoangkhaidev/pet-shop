/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import get from 'lodash/get';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import TableComponent from 'src/components/shared/TableComponent/TableComponent';
import RunDevelopmentTestFilter from './RunDevelopmentTestFilter';
import useRouter from 'src/utils/hooks/useRouter';
import api from 'src/utils/api';

const RunDevelopmentTest = () => {
  const router = useRouter();

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
          console.log(response)
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
        {/* <form onSubmit={methods.handleSubmit(onSubmit)}> */}
          <RunDevelopmentTestFilter onSubmitFilter={onSubmitFilter} />
        {/* </form> */}
      </FormProvider>
      <ContentCardPage>
        <TableComponent
          data={data}
          columns={columns}
          types="RoleList"
        />
      </ContentCardPage>
    </>
  );
};

export default RunDevelopmentTest;
