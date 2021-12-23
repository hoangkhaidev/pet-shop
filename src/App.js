/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useEffect, useMemo, useState, createContext } from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useNavigate, useRoutes } from 'react-router-dom';
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
import SocketComponent from "./SocketComponent";
import { NotificationProvider } from "./context/NotificationContext";

export const CurrentPageContext = createContext({
  currentMenu: null
});

const initialNotification = {
  deposit: 0,
  withdraw: 0,
  needUpdate: false
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'update_notification':
      return {
        ...state,
        has_new_request: action.has_new_request,
        deposit: action.deposit,
        withdraw: action.withdraw,
      };
    case 'reconnect_notification': {
      return {
        ...state,
        needUpdate: !state.needUpdate
      }
    }
    default:
      return state;
  }
};

const Routes = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.authentication);

  const [curPage, setCurPage] = useState({});
  const routing = useRoutes(routes(isLoggedIn));
  const router = useRouter();

  const token = useSelector(state => state.authentication.token);
  const [firstToken, setFirstToken] = useState(token);

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

  useEffect(() => {

    if (firstToken && firstToken !== token) {
      if (token === "") {
        navigate("/login");
      } else {
        console.log(firstToken)
        window.location.reload();
      }
    }
  }, [token, firstToken])

  useEffect(() => {
    if (!firstToken) {
      setFirstToken(token)
    }
  }, [token, setFirstToken])

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
        <SocketComponent />
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
          <NotificationProvider initialState={initialNotification} reducer={notificationReducer}>
            <Routes />
          </NotificationProvider>
        </Suspense>
      </PersistGate>
    </Provider>
  </ThemeProvider>
);

export default App;
