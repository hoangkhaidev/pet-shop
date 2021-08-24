/* eslint-disable react/jsx-pascal-case */
import { useState, lazy, Suspense, createContext } from "react";
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
  const roleUser = useSelector((state) => state.roleUser);
  const [value, setValue] = useState(0);
  const [dateRange, setDateRange] = useState({
    start: moment().format("DD/MM/YYYY"),
    end: moment().format("DD/MM/YYYY")
  });
  const { t } = useTranslation();
  const valueContext = { dateRange, setDateRange };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Search game history"
          indicatorColor="secondary"
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
          <TabPanel value={value} index={0}>
            <Endpoint_Settings />
          </TabPanel>
          {roleUser.account_type !== 'brand' && (
            <TabPanel value={value} index={1}>
              <GameParamCloning />
            </TabPanel>
          )}
          <TabPanel value={value} index={2}>
            <RunDevelopmentTest />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <DevelopmentVariables />
          </TabPanel>
        </Suspense>
      </DateRangeContext.Provider>
    </div>
  );
};

export default BrandDetail;
