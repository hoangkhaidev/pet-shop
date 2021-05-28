import { useState, lazy, Suspense, createContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTranslation } from "react-i18next";
import moment from 'moment';

import TabPanel from "src/components/shared/TabPanel/TabPanel";
import Loading from "src/components/shared/Loading/Loading";
import { colors } from "src/utils/styles";

const GameTransactions = lazy(() => import("./GameTransactions/GameTransactions"));
const GamesList = lazy(() => import("./Games/GamesList"));

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
    color: `${colors.labelTab} !important`
  }
}));

const SearchGameHistory = () => {
  const classes = useStyles();
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
        >
          <Tab className={classes.labelTab} label="Player Infomation" {...a11yProps(0)} />
          <Tab className={classes.labelTab} label={t("Games")} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <DateRangeContext.Provider value={valueContext}>
        <Suspense fallback={<Loading />}>
          <TabPanel value={value} index={0}>
            <GameTransactions />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <GamesList />
          </TabPanel>
        </Suspense>
      </DateRangeContext.Provider>
    </div>
  );
};

export default SearchGameHistory;
