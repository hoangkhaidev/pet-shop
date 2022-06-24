/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable import/no-cycle */
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const Login = lazy(() => import('views/pages/authentication/authentication3/Login3'));
const NotFound = lazy(() => import('views/page/NotFound'));
const Profile = lazy(() => import('views/Profile/Profile'));

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

const SubAccountCreate = Loadable(lazy(() => import('views/SubAccount/SubAccountCreate')));
const SubAccountList = Loadable(lazy(() => import('views/SubAccount/SubAccountList/SubAccountList')));
const SubAccountEdit = Loadable(lazy(() => import('views/SubAccount/SubAccountEdit')));
const SubAccountView = Loadable(lazy(() => import('views/SubAccount/SubAccountView')));

const RoleList = Loadable(lazy(() => import('views/RoleManagement/RoleList')));
const RoleAdd = Loadable(lazy(() => import('views/RoleManagement/RoleAdd')));
const RoleEdit = Loadable(lazy(() => import('views/RoleManagement/RoleEdit')));

const BrandList = Loadable(lazy(() => import('views/Brand/BrandList/BrandList')));
const BrandCreate = Loadable(lazy(() => import('views/Brand/BrandCreate')));
const BrandEdit = Loadable(lazy(() => import('views/Brand/BrandEdit')));
const BrandView = Loadable(lazy(() => import('views/Brand/BrandView')));

const OperatorList = Loadable(lazy(() => import('views/Operator/OperatorList')));
const OperatorCreate = Loadable(lazy(() => import('views/Operator/OperatorCreate')));
const OperatorEdit = Loadable(lazy(() => import('views/Operator/OperatorEdit')));
const OperatorView = Loadable(lazy(() => import('views/Operator/OperatorView')));

const PlayersList = Loadable(lazy(() => import('views/PlayersList/PlayersList')));
const SearchGameHistory = Loadable(lazy(() => import('views/SearchGameHistory/SearchGameHistory')));
const TransactionDetails = Loadable(lazy(() => import('views/TransactionDetails/TransactionDetails')));
const GameHistory = Loadable(lazy(() => import('views/GameHistory/GameHistory')));

const Group_BrandList = Loadable(lazy(() => import('views/Global/Group_BrandList')));
const BrandListBelow = Loadable(lazy(() => import('views/Global/BrandListBelow')));
const BrandGlobalEdit = Loadable(lazy(() => import('views/Global/BrandDetail/BrandDetail')));
const BrandGlobalView = Loadable(lazy(() => import('views/Global/BrandDetail/BrandDetailView')));
const FailedTransaction = Loadable(lazy(() => import('views/Global/FailedTransaction/FailedTransaction')));

const GamesConfig = Loadable(lazy(() => import('views/GamesConfig/GamesListConfig')));
const GamesConfigDetails = Loadable(lazy(() => import('views/GamesConfig/GamesConfigDetails/GamesConfigDetails')));
const GamesConfigDetailsView = Loadable(lazy(() => import('views/GamesConfig/GamesConfigDetails/GamesConfigDetailsView')));
const CurrencyList = Loadable(lazy(() => import('views/Currency/CurrencyList/CurrencyList')));
const CommissionList = Loadable(lazy(() => import('views/Commission/CommissionList')));

const BusinessSummary = Loadable(lazy(() => import('views/Reports/BusinessSummary/BusinessSummary')));
const GamesSummary = Loadable(lazy(() => import('views/Reports/GamesSummary/GamesSummary')));
const PlayerSummary = Loadable(lazy(() => import('views/Reports/BusinessSummary/PlayerSummary/PlayerSummary')));
const PlayersBusinessSummary = Loadable(lazy(() => import('views/Reports/PlayersBusinessSummary/PlayersBusinessSummary')));
const GameRTPSummary = Loadable(lazy(() => import('views/Reports/GameRTPSummary/GameRTPSummary')));


const AdminLogs = Loadable(lazy(() => import('views/Logs/AdminLogs/AdminLogs')));
const BrandLogs = Loadable(lazy(() => import('views/Logs/BrandLogs/BrandLogs')));
const OperatorLogs = Loadable(lazy(() => import('views/Logs/OperatorLogs/OperatorLogs')));


const routes = (isLoggedIn) => [
  {
    path: 'home',
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
    children: [
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
    ]
  },
  {
    path: 'sub',
    name: 'Sub Account',
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
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
        path: 'list/:id/view',
        fullpath: '/sub/list/:id/view',
        name: 'Sub Account Detail',
        element: <SubAccountView />,
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
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
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
      {
        path: 'list/:id/view',
        fullpath: '/operator/list/:id/view',
        name: 'Operator Detail',
        element: <OperatorView />,
      },
    ],
  },
  {
    path: 'brand',
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
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
      {
        path: 'list/:id/view',
        fullpath: '/brand/list/:id/view',
        name: 'Brand View',
        element: <BrandView />,
      },
    ],
  }, 
  {
    path: 'role',
    name: 'Role',
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
    children: [
      { 
        path: '/', 
        fullpath: '/role', 
        name: 'Role Management', 
        element: <RoleList /> },
      {
        path: '/add',
        fullpath: '/role/add',
        name: 'Add Role',
        element: <RoleAdd />,
      },
      {
        path: '/:id/edit',
        fullpath: '/role/:id/edit',
        active_name: '/role/edit',
        name: 'Edit Role',
        element: <RoleEdit />,
      },
    ],
  },
  {
    path: 'players',
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
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
        name: 'Game History',
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
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
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
        path: '/group_brand/brand_view/:id',
        fullpath: '/global/group_brand/brand_view/:id',
        name: 'Brand View',
        element: <BrandGlobalView />,
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
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
    children: [
      {
        path: '/games',
        fullpath: '/configuration/games',
        name: 'Games',
        element: <GamesConfig />,
      },
      {
        path: '/games/:id/brand_id/:brand_id/edit',
        fullpath: '/configuration/games/:id/brand_id/:brand_id/edit',
        name: 'Games Details',
        element: <GamesConfigDetails />,
      },
      {
        path: '/games/:id/brand_id/:brand_id/view',
        fullpath: '/configuration/games/:id/brand_id/:brand_id/view',
        name: 'Games Details View',
        element: <GamesConfigDetailsView />,
      },
      {
        path: '/currency',
        fullpath: '/configuration/currency',
        name: 'Currency List',
        element: <CurrencyList />,
      },
      {
        path: '/commission',
        fullpath: '/configuration/commission',
        name: 'Commission List',
        element: <CommissionList />,
      }
    ],
  },
  {
    path: 'reports',
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
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
      },
      {
        path: '/games_rtp_summary',
        fullpath: '/report/games_rtp_summary',
        name: 'Games RTP Summary',
        element: <GameRTPSummary />,
      }
    ],
  },
  {
    path: 'action-log',
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
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
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
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
    element: isLoggedIn ? <Navigate to="/home/dashboard" /> : <Login />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
