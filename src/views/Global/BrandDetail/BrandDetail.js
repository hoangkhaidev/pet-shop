/* eslint-disable spaced-comment */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-pascal-case */
import { useState, lazy, Suspense, createContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import moment from 'moment';
import GameParamCloning from "./GameParamCloning";
import { useSelector } from "react-redux";
import RunDevelopmentTest from "./RunDevelopmentTest/RunDevelopmentTest";
import DevelopmentVariables from "./DevelopmentVariables/DevelopmentVariables";
import { Navigate } from "react-router";
import { makeStyles } from "@mui/styles";
import useRouter from "utils/hooks/useRouter";
import useFetchData from "utils/hooks/useFetchData";
import NoPermissionPage from "views/NoPermissionPage/NoPermissionPage";
import { AppBar, Tab, Tabs } from "@mui/material";
import Loading from "views/Loading/Loading";
import TabPanel from "views/TabPanel/TabPanel";

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
    borderRadius: '12px',
    '& .MuiPaper-root': {
      borderTopRightRadius: '12px',
      borderTopLeftRadius: '12px',
    },
    '& .MuiTabs-root': {
      borderTopRightRadius: '12px',
      borderTopLeftRadius: '12px',
    }
  },
  labelTab: {
    fontWeight: "bold !important",
    color: '#ccc'
  },

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
      <AppBar 
        position="static"
        sx={{
          background: '#3245b9', 
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Search game history"
          // indicatorColor="error"
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
            <>
              <TabPanel value={value} index={1} className={classes.stylePanel}>
                <GameParamCloning />
              </TabPanel>
              <TabPanel value={value} index={2} className={classes.stylePanel}>
                <RunDevelopmentTest />
              </TabPanel>
              <TabPanel value={value} index={3} className={classes.stylePanel}>
                <DevelopmentVariables setValueTab={setValue} />
              </TabPanel>
            </>
          )}
          {roleUser.account_type === 'brand' && (
            <TabPanel value={value + 1} index={2} className={classes.stylePanel}>
              <RunDevelopmentTest />
            </TabPanel>
          )}
          {roleUser.account_type === 'brand' && (
            <TabPanel value={value + 1} index={3} className={classes.stylePanel}>
              <DevelopmentVariables setValueTab={setValue} />
            </TabPanel>
          )}
        </Suspense>
      </DateRangeContext.Provider>
    </div>
  );
};

export default BrandDetail;
