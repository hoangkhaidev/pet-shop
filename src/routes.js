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
const ProductDetail = Loadable(lazy(() => import('views/ProductDetail/ProductDetail')));
const PageContent = Loadable(lazy(() => import('views/PageContent/PageContent')));
const Search = Loadable(lazy(() => import('views/Search/Search')));
const Contact = Loadable(lazy(() => import('views/Contact/Contact')));
const PetService = Loadable(lazy(() => import('views/PetService/PetService')));
const Cart = Loadable(lazy(() => import('views/Cart/Cart')));
const Payment = Loadable(lazy(() => import('views/Payment/Payment')));
const SuccessPayment = Loadable(lazy(() => import('views/Payment/SuccessPayment')));
const Register = Loadable(lazy(() => import('views/Account/Register')));

const routes = () => [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
          path: '/',
          name: 'Trang Chủ',
          element: <HomePage />
      },
    ]
  },
  {
    path: 'danh-muc',
    name: 'Sản Phẩm',
    element:  <MainLayout />,
    children: [
      {
          path: '/:name',
          fullpath: '/danh-muc/:name',
          name: 'Sản Phẩm',
          element: <Product />
      },
    ]
  },
  {
    path: 'hang-san-xuat',
    name: 'Thương Hiệu',
    element:  <MainLayout />,
    children: [
      {
          path: '/:name',
          fullpath: '/hang-san-xuat/:name',
          name: 'Thương Hiệu',
          element: <Product />
      },
    ]
  },
  {
    path: 'san-pham',
    name: 'Chi Tiết Sản Phẩm',
    element:  <MainLayout />,
    children: [
      {
          path: '/:name',
          fullpath: '/san-pham/:name',
          name: 'Chi Tiết Sản Phẩm',
          element: <ProductDetail />
      },
    ]
  },
  {
    path: 'tin-tuc',
    name: 'Tin Tức',
    element:  <MainLayout />,
    children: [
      {
          path: '/:name',
          fullpath: '/tin-tuc/:name',
          name: 'Tin Tức',
          element: <News />
      },
    ]
  },
  {
    path: 'huong-dan',
    name: 'Hướng Dẫn Khách Hàng',
    element:  <MainLayout />,
    children: [
      {
          path: '/:name',
          fullpath: '/huong-dan/:name',
          name: 'Hướng Dẫn Khách Hàng',
          element: <PageContent />
      },
    ]
  },
  {
    path: 'chinh-sach',
    name: 'Chính Sách Cửa Hàng',
    element:  <MainLayout />,
    children: [
      {
          path: '/:name',
          fullpath: '/chinh-sach/:name',
          name: 'Chính Sách Cửa Hàng',
          element: <PageContent />
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
    path: 'dich-vu-cham-soc-thu-cung',
    name: 'Dịch Vụ Chăm Sóc Thú Cưng',
    element:  <MainLayout />,
    children: [
      {
          path: '/',
          fullpath: '/dich-vu-cham-soc-thu-cung',
          name: 'Dịch Vụ Chăm Sóc Thú Cưng',
          element: <PetService />
      },
    ]
  },
  {
    path: 'trang-gio-hang',
    name: 'Trang Giỏ Hàng',
    element:  <MainLayout />,
    children: [
      {
          path: '/',
          fullpath: '/trang-gio-hang',
          name: 'Trang Giỏ Hàng',
          element: <Cart />
      },
    ]
  },
  {
    path: 'hinh-thuc-thanh-toan',
    name: 'Hình thức thanh toán',
    element:  <MainLayout />,
    children: [
      {
          path: '/',
          fullpath: '/hinh-thuc-thanh-toan',
          name: 'Hình thức thanh toán',
          element: <Payment />
      },
    ]
  },
  {
    path: 'trang-thong-bao',
    name: 'Trang thông báo',
    element:  <MainLayout />,
    children: [
      {
          path: '/',
          fullpath: '/trang-thong-bao',
          name: 'Trang thông báo',
          element: <SuccessPayment />
      },
    ]
  },
  {
    path: 'lien-he',
    name: 'Liên Hệ',
    element:  <MainLayout />,
    children: [
      {
          path: '/',
          fullpath: '/lien-he',
          name: 'Liên Hệ',
          element: <Contact />
      },
    ]
  },
  {
    path: 'dang-ky',
    name: 'Đăng ký tài khoản',
    element:  <MainLayout />,
    children: [
      {
          path: '/',
          fullpath: '/dang-ky',
          name: 'Đăng ký tài khoản',
          element: <Register />
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
