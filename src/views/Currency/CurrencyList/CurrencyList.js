/* eslint-disable arrow-body-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import cloneDeep from 'lodash/cloneDeep';
import CurrencyListFilter from './CurrencyListFilter';
import RateHistory from './RateHistory';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import useFetchData from 'utils/hooks/useFetchData';
import ChangeStatusCurrency from 'views/Modal/ChangeStatusCurrency';
import NoPermissionPage from 'views/NoPermissionPage/NoPermissionPage';
import Loading from 'views/Loading/Loading';
import TableComponent from 'views/TableComponent/TableComponent';
import MainCard from 'ui-component/cards/MainCard';
// import ChangeStatusGamesConfig from 'views/Modal/ChangeStatusGamesConfig';
import ChangeCheckboxCurrency from 'views/Modal/changeCheckboxCurrency';

const CurrencyList = () => {
  const [data, setData] = useState([]);
  const [refreshData, setRefreshData] = useState(null);
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionCurrency = {};
  permission_groups?.map((item) => {
    if (item.name === 'Configuration') {
      item.permissions?.map((itemPermission) => {
        if (itemPermission.name === 'Currency') arrPermissionCurrency = itemPermission;
        return itemPermission;
      });
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
      data_field: 'indexRow',
      column_name: '#',
      align: 'center',
    },
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
    arrPermissionCurrency?.full ? (
      {
        data_field: "action",
        column_name: "Currency Activation",
        align: "center",
        formatter: (cell, row) => {
          const newlabel = row.status === false ? 'active' : 'inactive';
          const currentStatus = row.status === true ? 'active' : 'inactive';
          return (
            <ChangeCheckboxCurrency
              status={row.status} 
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

  useEffect(() => {
    document.title = 'Currency List';
  }, []);

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  if (total === null) {
    return <Loading />;
  }

  if (arrPermissionCurrency.none) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      <FormProvider>
        <CurrencyListFilter arrPermissionCurrency={arrPermissionCurrency} />
      </FormProvider>
      <MainCard sx={{mt: '15px'}}>
        <TableComponent
          data={data}
          columns={columns}
          types="RoleList"
        />
      </MainCard>
      {isLoading && <Loading />}
    </>
  );
};

export default CurrencyList;
