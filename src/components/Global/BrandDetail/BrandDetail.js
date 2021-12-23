/* eslint-disable react/jsx-pascal-case */
import { useState, lazy, Suspense, createContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTranslation } from "react-i18next";
import moment from 'moment';
import TabPanel from "src/components/shared/TabPanel/TabPanel";
import Loading from "src/components/shared/Loading/Loading";
import GameParamCloning from "./GameParamCloning";
import { useSelector } from "react-redux";
import RunDevelopmentTest from "./RunDevelopmentTest/RunDevelopmentTest";
import DevelopmentVariables from "./DevelopmentVariables/DevelopmentVariables";
import useRouter from "src/utils/hooks/useRouter";
import NoPermissionPage from "src/components/NoPermissionPage/NoPermissionPage";
import useFetchData from "src/utils/hooks/useFetchData";
import { Navigate } from "react-router";

const Endpoint_Settings = lazy(() => import("./Endpoint_Settings"));

export const DateRangeContext = createContext({
  dateRange: {
    start: moment().startOf("day"),
    end: moment().endOf("day")
  },
  setDateRange: () => {}
});

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  labelTab: {
    fontWeight: "bold !important",
  },
  aaaaaaaaa: {
    '& .MuiButtonBase-root.MuiTab-root.MuiTab-textColorPrimary.Mui-selected.makeStyles-labelTab-6.css-1760dni-MuiButtonBase-root-MuiTab-root': {
      color: '#fff !important',
    },
  }

}));

const BrandDetail = () => {
  const classes = useStyles();
  const router = useRouter();
  const roleUser = useSelector((state) => state.roleUser);
  const [value, setValue] = useState(0);
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionGlobalBrand = {};
  permission_groups.map((item) => {
    if (item.name === 'Global') {
      arrPermissionGlobalBrand = item.permissions[0];
    }
    return item.name === 'Global'
  });

  const [dateRange, setDateRange] = useState({
    start: moment().format("DD/MM/YYYY"),
    end: moment().format("DD/MM/YYYY")
  });

  const { dataResponse, isHasPermission } = useFetchData(
    `/api/global/brand_detail/${router.query?.id}`,
    null
  );

  const { t } = useTranslation();
  const valueContext = { dateRange, setDateRange };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    document.title = 'Brand Detail';
    return () => {
      document.title = '';
    }
  }, []);

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  if (!arrPermissionGlobalBrand.full) {
    if (arrPermissionGlobalBrand.none || arrPermissionGlobalBrand.view || arrPermissionGlobalBrand.create) {
      return <Navigate to="/404" />;
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Search game history"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          className={classes.aaaaaaaaa}
        >
          <Tab className={classes.labelTab} label="Endpoint & Settings" {...a11yProps(0)} />
          {roleUser.account_type !== 'brand' && (
            <Tab className={classes.labelTab} label={t("Game Param Cloning")} {...a11yProps(1)} />
          )}
          <Tab className={classes.labelTab} label={t("Run Development Test")} {...a11yProps(2)} />
          <Tab className={classes.labelTab} label={t("Development Variables")} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <DateRangeContext.Provider value={valueContext}>
        <Suspense fallback={<Loading />}>
          <TabPanel value={value} index={0} className={classes.stylePanel}>
            <Endpoint_Settings dataResponse={dataResponse} />
          </TabPanel>
          {roleUser.account_type !== 'brand' && (
            <TabPanel value={value} index={1} className={classes.stylePanel}>
              <GameParamCloning />
            </TabPanel>
          )}
          <TabPanel value={value} index={2} className={classes.stylePanel}>
            <RunDevelopmentTest />
          </TabPanel>
          <TabPanel value={value} index={3} className={classes.stylePanel}>
            <DevelopmentVariables setValueTab={setValue} />
          </TabPanel>
        </Suspense>
      </DateRangeContext.Provider>
    </div>
  );
};

export default BrandDetail;
