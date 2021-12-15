/* eslint-disable react/jsx-pascal-case */
/* eslint-disable import/no-cycle */
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
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

const SearchGameHistory = lazy(() =>
  import('src/components/SearchGameHistory/SearchGameHistory')
);

const TransactionDetails = lazy(() =>
  import('src/components/TransactionDetails/TransactionDetails')
);

const GameHistory = lazy(() =>
  import('src/components/GameHistory/GameHistory')
);

const GamesConfig = lazy(() =>
  import('src/components/GamesConfig/GamesListConfig')
);

const GamesConfigDetails = lazy(() =>
  import('src/components/GamesConfig/GamesConfigDetails/GamesConfigDetails')
);

const CurrencyList = lazy(() =>
  import('src/components/Currency/CurrencyList/CurrencyList')
);

const CommissionList = lazy(() =>
  import('src/components/Commission/CommissionList')
);

const Group_BrandList = lazy(() =>
  import('src/components/Global/Group_BrandList')
);

const BrandListBelow = lazy(() =>
  import('src/components/Global/BrandListBelow')
);

const BrandGlobalEdit = lazy(() =>
  import('src/components/Global/BrandDetail/BrandDetail')
);

const BusinessSummary = lazy(() =>
  import('src/components/Reports/BusinessSummary/BusinessSummary')
);

const GamesSummary = lazy(() =>
  import('src/components/Reports/GamesSummary/GamesSummary')
);

const PlayerSummary = lazy(() =>
  import('src/components/Reports/BusinessSummary/PlayerSummary/PlayerSummary')
);

const PlayersBusinessSummary = lazy(() =>
  import('src/components/Reports/PlayersBusinessSummary/PlayersBusinessSummary')
);

const AdminLogs = lazy(() =>
  import('src/components/Logs/AdminLogs/AdminLogs')
);

const BrandLogs = lazy(() =>
  import('src/components/Logs/BrandLogs/BrandLogs')
);

const OperatorLogs = lazy(() =>
  import('src/components/Logs/OperatorLogs/OperatorLogs')
);

const Profile = lazy(() =>
  import('src/components/Profile/Profile')
);

const FailedTransaction = lazy(() =>
  import('src/components/Global/FailedTransaction/FailedTransaction')
);

const routes = (isLoggedIn) => [
  {
    path: 'home',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
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
      {
        path: '/game-history',
        fullpath: '/players/game-history',
        name: 'Game history',
        element: <GameHistory />,
      },
      {
        path: 'transaction-details',
        fullpath: '/players/transaction-details',
        name: 'Transaction Details',
        element: <TransactionDetails />,
      },
    ],
  },
  {
    path: 'global',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      {
        path: '/group_brand',
        fullpath: '/global/group_brand',
        name: 'Group/Brand List',
        element: <Group_BrandList />,
      },
      {
        path: '/group_brand/:id/operator_name/:operator_name',
        fullpath: '/global/group_brand/:id/operator_name/:operator_name',
        name: 'Brand List Below',
        element: <BrandListBelow />,
      },
      {
        path: '/group_brand/brand_detail/:id',
        fullpath: '/global/group_brand/brand_detail/:id',
        name: 'Brand Detail',
        element: <BrandGlobalEdit />,
      },
      {
        path: '/failed_transaction',
        fullpath: '/global/failed_transaction',
        name: 'Failed Transaction',
        element: <FailedTransaction />,
      },
    ],
  },
  {
    path: 'configuration',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      {
        path: '/games',
        fullpath: '/configuration/games',
        name: 'Games List',
        element: <GamesConfig />,
      },
      {
        path: '/games/:id/brand_id/:brand_id/edit',
        fullpath: 'configuration/games/:id/brand_id/:brand_id/edit',
        name: 'Games Details',
        element: <GamesConfigDetails />,
      },
      {
        path: '/currency',
        fullpath: 'configuration/currency',
        name: 'Currency List',
        element: <CurrencyList />,
      },
      {
        path: '/commission',
        fullpath: 'configuration/commission',
        name: 'Commission List',
        element: <CommissionList />,
      }
    ],
  },
  {
    path: 'reports',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      {
        path: '/business_summary',
        fullpath: '/reports/business_summary',
        name: 'Business Summary',
        element: <BusinessSummary />,
      },
      {
        path: ':id/player_summary',
        fullpath: '/reports/:identifier/player_summary',
        name: 'Player Summary',
        element: <PlayerSummary />,
      },
      {
        path: '/games_summary',
        fullpath: '/reports/games_summary',
        name: 'Games Summary',
        element: <GamesSummary />,
      },
      {
        path: '/players_business_summary',
        fullpath: '/reports/players_business_summary',
        name: 'Players Business Summary',
        element: <PlayersBusinessSummary />,
      }
    ],
  },
  {
    path: 'action-log',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      {
        path: '/admin-logs',
        fullpath: '/action-log/admin-logs',
        name: 'Admin Logs',
        element: <AdminLogs />,
      },
      {
        path: '/brand-logs',
        fullpath: '/action-log/brand-logs',
        name: 'Brand Logs',
        element: <BrandLogs />,
      },
      {
        path: '/operator-logs',
        fullpath: '/action-log/operator-logs',
        name: 'Operator Logs',
        element: <OperatorLogs />,
      },
    ],
  },
  {
    path: 'profile',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      {
        path: '/',
        fullpath: '/profile',
        name: 'Profile',
        element: <Profile />,
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
