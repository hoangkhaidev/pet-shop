import { Fragment, useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { FormProvider } from 'react-hook-form';
import cloneDeep from 'lodash/cloneDeep';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import TableComponent from 'src/components/shared/TableComponent/TableComponent';
import NoPermissionPage from 'src/components/NoPermissionPage/NoPermissionPage';
// import TitlePage from 'src/components/shared/TitlePage/TitlePage';
import Loading from 'src/components/shared/Loading/Loading';
import useFetchData from 'src/utils/hooks/useFetchData';
import RunDevelopmentTestFilter from './RunDevelopmentTestFilter';

const RunDevelopmentTest = () => {
  // const router = useRouter();
  // const classes = useStyles();
  const [data, setData] = useState([]);

  const { dataResponse, isLoading, isHasPermission } = useFetchData(
    '/api/currency',
    null,
  );

  useEffect(() => {
    let mapData = cloneDeep(dataResponse)
    setData(mapData)
  }, [dataResponse]);

  // useEffect(() => {
  //   console.log(cloneDeep(data).map(item => item.status));
  // }, [data]);

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  const columns = [ 
    {
      data_field: 'code',
      column_name: 'Test Name',
      align: 'left'
    },
    {
      data_field: 'name',
      column_name: 'Test Description',
      align: 'left',
    },
    {
      data_field: 'symbol',
      column_name: 'Test Result',
      align: 'left',
    },
    {
      data_field: 'rate',
      column_name: 'More Information',
      align: 'left',
    },
  ];

  return (
    <Fragment>
      {isLoading && <Loading />}
      <FormProvider>
        <RunDevelopmentTestFilter />
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
