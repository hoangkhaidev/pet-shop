import { Fragment, useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import cloneDeep from 'lodash/cloneDeep';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import TableComponent from 'src/components/shared/TableComponent/TableComponent';
import NoPermissionPage from 'src/components/NoPermissionPage/NoPermissionPage';
// import TitlePage from 'src/components/shared/TitlePage/TitlePage';
import Loading from 'src/components/shared/Loading/Loading';
import useFetchData from 'src/utils/hooks/useFetchData';
import RunDevelopmentTestFilter from './RunDevelopmentTestFilter';
import useRouter from 'src/utils/hooks/useRouter';

const RunDevelopmentTest = () => {
  const router = useRouter();
  // const classes = useStyles();
  const [data, setData] = useState([]);
  const [objFilter, setObjFilter] = useState({
    token: ""
  });

  const methods = useForm({
    defaultValues: router.query,
  });

  const { dataResponse, isLoading, isHasPermission } = useFetchData(
    `/api/global/brand_detail/${router?.query?.id}/verify_api_integration`,
    objFilter,
  );

  
  useEffect(() => {
    let mapData = cloneDeep(dataResponse)
    setData(mapData)
  }, [dataResponse]);

  const onSubmit = async (dataForm) => {
    const form = {
      token: dataForm?.token,
    };

    setObjFilter({
      ...form,
    });
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

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <Fragment>
      {isLoading && <Loading />}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <RunDevelopmentTestFilter />
        </form>
      </FormProvider>
      <ContentCardPage>
        <TableComponent
          data={data}
          columns={columns}
          types="RoleList"
        />
      </ContentCardPage>
    </Fragment>
  );
};

export default RunDevelopmentTest;
