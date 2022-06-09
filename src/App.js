/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
/* eslint-disable prettier/prettier */
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { createContext, useEffect, useMemo, useState, Suspense } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import useRouter from 'utils/hooks/useRouter';
import { Helmet } from "react-helmet";
import SocketComponent from 'SocketComponent';
import { persistor, store } from 'stores';
import CircularIndeterminate from 'views/page/CircularIndeterminate';
import { NotificationProvider } from 'context/NotificationContext';
import routes from 'routes';
import "./index.scss"; 
// ==============================|| APP ||============================== //

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
          // console.log(firstToken)
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

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
      <Provider store={store}>
          <PersistGate persistor={persistor}>
              <Suspense fallback={CircularIndeterminate()}>
                  <ToastContainer />
                  <NotificationProvider initialState={initialNotification} reducer={notificationReducer}>
                    <StyledEngineProvider injectFirst>
                        <ThemeProvider theme={themes(customization)}>
                            <CssBaseline />
                            <NavigationScroll>
                                <Routes />
                            </NavigationScroll>
                        </ThemeProvider>
                    </StyledEngineProvider>
                  </NotificationProvider>
              </Suspense>
          </PersistGate>
      </Provider>
    );
};

export default App;
