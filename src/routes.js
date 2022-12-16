/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable import/no-cycle */
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';

const NotFound = lazy(() => import('views/page/NotFound'));

// dashboard routing
const HomePage = Loadable(lazy(() => import('views/HomePage/HomePage')));
const MainLayout = Loadable(lazy(() => import('views/MainLayout/MainLayout')));
const Product = Loadable(lazy(() => import('views/Product/Product')));
const News = Loadable(lazy(() => import('views/News/News')));
const Search = Loadable(lazy(() => import('views/Search/Search')));

const routes = () => [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
          path: '/',
          name: 'Home Page',
          element: <HomePage />
      },
    ]
  },
  {
    path: 'categories',
    name: 'Categories',
    element:  <MainLayout />,
    children: [
      {
          path: '/:name',
          fullpath: '/categories/:name',
          name: 'Categories',
          element: <Product />
      },
    ]
  },
  {
    path: 'news',
    name: 'News',
    element:  <MainLayout />,
    children: [
      {
          path: '/:name',
          fullpath: 'news/:name',
          name: 'News',
          element: <News />
      },
    ]
  },
  {
    path: 'trang-thong-tin-tim-kiem',
    name: 'Trang Tìm Kiếm',
    element:  <MainLayout />,
    children: [
      {
          path: '/',
          fullpath: '/trang-thong-tin-tim-kiem',
          name: 'Trang Tìm Kiếm',
          element: <Search />
      },
    ]
  },
  {
    path: '/',
    element: <Navigate to="/" />,
    children: [
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
