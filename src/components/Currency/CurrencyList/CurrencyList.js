import { useState, useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import cloneDeep from 'lodash/cloneDeep';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import TableComponent from 'src/components/shared/TableComponent/TableComponent';
import NoPermissionPage from 'src/components/NoPermissionPage/NoPermissionPage';
import Loading from 'src/components/shared/Loading/Loading';
import useFetchData from 'src/utils/hooks/useFetchData';
import CurrencyListFilter from './CurrencyListFilter';
import ChangeStatusCurrency from 'src/components/Modal/ChangeStatusCurrency';
import RateHistory from './RateHistory';
import { useSelector } from 'react-redux';

const CurrencyList = () => {
  const [data, setData] = useState([]);
  const [refreshData, setRefreshData] = useState(null);
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionCurrency = {};
  permission_groups?.map((item) => {
    if (item.name === 'Configuration') {
      arrPermissionCurrency = (item.permissions[0]);
    }
    return item.name === 'Configuration'
  });

  const { dataResponse, isLoading, isHasPermission, total } = useFetchData(
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
        return (
          <ChangeStatusCurrency
            types='statusView'
            newlabel={newlabel}
            current_code={row.code}
          />
        );
      },
    },
    arrPermissionCurrency?.full ? (
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
    ) :
    arrPermissionCurrency?.edit ? (
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
    ) : {}
    
  ];

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  if (total === null) {
    return <Loading />;
  }

  return (
    <>
      <FormProvider>
        <CurrencyListFilter arrPermissionCurrency={arrPermissionCurrency} />
      </FormProvider>
      <ContentCardPage>
        <TableComponent
          data={data}
          columns={columns}
          types="RoleList"
        />
      </ContentCardPage>
      {isLoading && <Loading />}
    </>
  );
};

export default CurrencyList;
