import { useState, lazy, Suspense, createContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTranslation } from "react-i18next";
import moment from 'moment';
import TabPanel from "src/components/shared/TabPanel/TabPanel";
import Loading from "src/components/shared/Loading/Loading";
import NoPermissionPage from "../NoPermissionPage/NoPermissionPage";

const GameTransactionHistory = lazy(() => import("./GameTransactionHistory/GameTransactionHistory"));
const GamesListHistory = lazy(() => import("./GameHistory/GamesListHistory"));

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

const GameHistory = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [dateRange, setDateRange] = useState({
    start: moment().format("DD/MM/YYYY"),
    end: moment().format("DD/MM/YYYY")
  });
  const [isHasAccessPermission, setIsHasPermission] = useState(true);

  const { t } = useTranslation();
  const valueContext = { dateRange, setDateRange };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!isHasAccessPermission) {
    return <NoPermissionPage />;
  }

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
          <Tab className={classes.labelTab} label="Game Transaction" {...a11yProps(0)} />
          <Tab className={classes.labelTab} label={t("Games")} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <DateRangeContext.Provider value={valueContext}>
        <Suspense fallback={<Loading />}>
          <TabPanel value={value} index={0}>
            <GameTransactionHistory setIsHasPermission={setIsHasPermission} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <GamesListHistory />
          </TabPanel>
        </Suspense>
      </DateRangeContext.Provider>
    </div>
  );
};

export default GameHistory;
