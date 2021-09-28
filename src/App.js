import { Suspense, useEffect, useMemo, useState, createContext } from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Helmet } from "react-helmet";
import useRouter from "src/utils/hooks/useRouter";
import find from "lodash/find";
import { ToastContainer } from 'react-toastify';
import GlobalStyles from 'src/components/GlobalStyles';
import CircularIndeterminate from 'src/components/shared/CircularIndeterminate/CircularIndeterminate';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { store, persistor } from "./stores";
import 'react-toastify/dist/ReactToastify.css';
import "./global.scss";
import "./index.scss";

export const CurrentPageContext = createContext({
  currentMenu: null
});

const Routes = () => {
  const { isLoggedIn } = useSelector((state) => state.authentication);
  const [curPage, setCurPage] = useState({});
  const routing = useRoutes(routes(isLoggedIn));
  const router = useRouter();

  const routerHasUrl = useMemo(() => {
    let listUrl = [];
    routes().forEach(item => {
      listUrl = [...listUrl, ...item.children];
    });
    return listUrl;
  }, []);

  useEffect(() => {
    const currentPage = find(routerHasUrl, item => item.fullpath === router.pathname);
    setCurPage(currentPage);
  }, [router.pathname, routerHasUrl]);

  const currentMenu = find(routes(), item => router.pathname.includes(`/${item.path}/`));

  const valueContext = { currentMenu };

  return (
    <>
      <CurrentPageContext.Provider value={valueContext}>
        <Helmet>
          <title>
            {curPage?.name}
          </title>
        </Helmet>
        {routing}
      </CurrentPageContext.Provider>
    </>
  );
};

const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GlobalStyles />
        <Suspense fallback={CircularIndeterminate()}>
          <ToastContainer />
          <Routes />
        </Suspense>
      </PersistGate>
    </Provider>
  </ThemeProvider>
);

export default App;
