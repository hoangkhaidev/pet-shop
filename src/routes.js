/* eslint-disable import/no-cycle */
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
// import DashboardLayout from 'src/components/DashboardLayout';
// import MainLayout from 'src/components/MainLayout';
// import Account from 'src/pages/Account';
// import CustomerList from 'src/pages/CustomerList';
// import Dashboard from 'src/pages/Dashboard';
// import Login from 'src/pages/Login';
// import NotFound from 'src/pages/NotFound';
// import ProductList from 'src/pages/ProductList';
// import Register from 'src/pages/Register';
// import Settings from 'src/pages/Settings';

const MainLayout = lazy(() => import('src/components/MainLayout'));
const DashboardLayout = lazy(() => import('src/components/DashboardLayout'));
const Login = lazy(() => import('src/pages/Login'));
const Dashboard = lazy(() => import('src/pages/Dashboard'));
const NotFound = lazy(() => import('src/pages/NotFound'));
const DeviceReport = lazy(() => import('src/pages/DeviceReport/DeviceReport'));
const SubAccountCreate = lazy(() =>
  import('src/pages/SubAccount/SubAccountCreatePages')
);
const SubAccountList = lazy(() =>
  import('src/pages/SubAccount/SubAccountListPages')
);
const SubAccountEdit = lazy(() =>
  import('src/components/SubAccount/SubAccountEdit')
);
const OperatorCreate = lazy(() =>
  import('src/components/Operator/OperatorCreate')
);
const OperatorList = lazy(() => import('src/components/Operator/OperatorList'));
const OperatorEdit = lazy(() => import('src/components/Operator/OperatorEdit'));
const BrandCreate = lazy(() => import('src/components/Brand/BrandCreate'));
const BrandList = lazy(() =>
  import('src/components/Brand/BrandList/BrandList')
);
const BrandEdit = lazy(() => import('src/components/Brand/BrandEdit'));
const RoleAdd = lazy(() => import('src/components/RoleManagement/RoleAdd'));
const RoleList = lazy(() => import('src/components/RoleManagement/RoleList'));
const RoleEdit = lazy(() => import('src/components/RoleManagement/RoleEdit'));
const PlayersList = lazy(() =>
  import('src/components/PlayersList/PlayersList')
);
// const PlayerInformation = lazy(() =>
//   import('src/components/PlayerInformation/PlayerInformation')
// );
const SearchGameHistory = lazy(() =>
  import('src/components/SearchGameHistory/SearchGameHistory')
);
const TransactionDetails = lazy(() =>
  import('src/components/TransactionDetails/TransactionDetails')
);

const routes = (isLoggedIn) => [
  {
    path: 'home',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      // { path: 'account', element: <Account /> },
      // { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'device-report', element: <DeviceReport /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: 'sub',
    name: 'Sub Account',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      {
        path: 'create',
        fullpath: '/sub/create',
        name: 'Create Sub Account',
        element: <SubAccountCreate />,
      },
      {
        path: 'list',
        fullpath: '/sub/list',
        name: 'Sub Account List',
        element: <SubAccountList />,
      },
      {
        path: 'list/:id/edit',
        fullpath: '/sub/list/:id/edit',
        name: 'Edit Sub Account',
        element: <SubAccountEdit />,
      },
    ],
  },
  {
    path: 'operator',
    name: 'Operator',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      {
        path: 'create',
        fullpath: '/operator/create',
        name: 'Create Operator',
        element: <OperatorCreate />,
      },
      {
        path: '/list',
        fullpath: '/operator/list',
        name: 'Operator List',
        element: <OperatorList />,
      },
      {
        path: 'list/:id/edit',
        fullpath: '/operator/list/:id/edit',
        name: 'Edit Operator',
        element: <OperatorEdit />,
      },
    ],
  },
  {
    path: 'brand',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      {
        path: 'create',
        fullpath: '/brand/create',
        name: 'Create Brand',
        element: <BrandCreate />,
      },
      {
        path: '/list',
        fullpath: '/brand/list',
        name: 'Brand List',
        element: <BrandList />,
      },
      {
        path: 'list/:id/edit',
        fullpath: '/brand/list/:id/edit',
        name: 'Brand Edit',
        element: <BrandEdit />,
      },
    ],
  },
  {
    path: 'role',
    name: 'Role',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: '/', fullpath: '/role', name: 'Add Role', element: <RoleList /> },
      {
        path: '/add',
        fullpath: '/role/list',
        name: 'Role List',
        element: <RoleAdd />,
      },
      {
        path: '/:id/edit',
        fullpath: '/role/:id/edit',
        name: 'Edit Role',
        element: <RoleEdit />,
      },
    ],
  },
  {
    path: 'players',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      {
        path: '/players',
        fullpath: '/players/players',
        name: 'Players List',
        element: <PlayersList />,
      },
      {
        path: '/:id/information',
        fullpath: '/players/:id/information',
        name: 'Player Information',
        element: <SearchGameHistory />,
      },

      // {
      //   path: '/game-history',
      //   fullpath: '/players/game-history',
      //   name: 'Search game history',
      //   element: <PlayerInformation />,
      // },
      {
        path: 'transaction-details',
        fullpath: '/players/transaction-details',
        name: 'Transaction Details',
        element: <TransactionDetails />,
      },
    ],
  },
  {
    path: '/',
    element: !isLoggedIn ? <MainLayout /> : <Navigate to="/home/dashboard" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '/', element: <Navigate to="/login" /> },
      // { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
