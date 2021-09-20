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

import CurrencyListFilter from './CurrencyListFilter';
import ChangeStatusCurrency from 'src/components/Modal/ChangeStatusCurrency';
import RateHistory from './RateHistory';

const CurrencyList = () => {
  // const router = useRouter();
  // const classes = useStyles();
  const [data, setData] = useState([]);
  const [refreshData, setRefreshData] = useState(null);

  const { dataResponse, isLoading, isHasPermission } = useFetchData(
    '/api/currency',
    null,
    [refreshData]
  );

  const formatNumber = (num) => {
    let cellFormat = (Math.round(num * 100)/100).toFixed(2);
    let formatNum = cellFormat?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return formatNum;
  }

  useEffect(() => {
    let mapData = cloneDeep(dataResponse)
    setData(mapData)
  }, [dataResponse]);

  useEffect(() => {
    console.log(refreshData);
  }, [refreshData]);

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  const columns = [ 
    {
      data_field: 'code',
      column_name: 'Currency Code',
      align: 'left'
    },
    {
      data_field: 'name',
      column_name: 'Currency Name',
      align: 'left',
    },
    {
      data_field: 'symbol',
      column_name: 'Currency Symbol',
      align: 'left',
    },
    {
      data_field: 'rate',
      column_name: 'USD Rate',
      align: 'right',
      formatter: (cell, row) => {
        let titleCurrency = formatNumber(cell);
        return (
          <RateHistory titleCurrency={titleCurrency} currencyCode={row.code} />
        );
      }
    },
    {
      data_field: 'status',
      column_name: 'Status',
      align: 'center',
      formatter: (cell, row) => {
        const newlabel = row.status === true ? 'active' : 'inactive';
        // console.log(row.status)
        return (
          <ChangeStatusCurrency
            types='statusView'
            newlabel={newlabel}
            current_code={row.code}
          />
        );
      },
    },
    {
      data_field: 'action',
      column_name: 'Action',
      align: 'center',
      formatter: (cell, row) => {
        const newlabel = row.status === false ? 'active' : 'inactive';
        const currentStatus = row.status === true ? 'active' : 'inactive';
        return (
          <ChangeStatusCurrency
            newlabel={newlabel}
            current_code={row.code}
            currentStatus={currentStatus}
            setRefreshData={setRefreshData}
          />
        );
      },
    }
  ];

  return (
    <Fragment>
      {isLoading && <Loading />}
      <FormProvider>
        <CurrencyListFilter />
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

export default CurrencyList;
