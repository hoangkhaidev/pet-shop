/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, lazy, Suspense, createContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import moment from 'moment';
import { makeStyles } from "@mui/styles";
import useRouter from "utils/hooks/useRouter";
import useFetchData from "utils/hooks/useFetchData";
import NoPermissionPage from "views/NoPermissionPage/NoPermissionPage";
import Loading from "views/Loading/Loading";
import PlayerInformation from "views/PlayerInformation/PlayerInformation";
import { AppBar, Tab, Tabs } from "@mui/material";
import TabPanel from "views/TabPanel/TabPanel";
// import TabPanel from "src/components/shared/TabPanel/TabPanel";
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
    borderRadius: '12px'
  },
  labelTab: {
    fontWeight: "bold !important",
    color: "#ccc",
  },
}));

const SearchGameHistory = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [gameName, setGameName] = useState('');
  const router = useRouter();

  const { dataResponse, isLoading, isHasPermission, total } = useFetchData(
    `/api/members/${router.query?.id}`,
    null
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataResponse);
  }, [dataResponse]);

  const [dateRange, setDateRange] = useState({
    start: moment().format("DD/MM/YYYY"),
    end: moment().format("DD/MM/YYYY")
  });
  const { t } = useTranslation();
  const valueContext = { dateRange, setDateRange };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onChangeTransaction = (gameName) => {
    setValue(0);
    setGameName(gameName);
  }

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  if (total === null) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <PlayerInformation data={data} />
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
          className={classes.aaaaaaaaa}
        >
          <Tab className={classes.labelTab} label="Game Transaction" {...a11yProps(0)} />
          <Tab className={classes.labelTab} label={t("Games")} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <DateRangeContext.Provider value={valueContext}>
        <Suspense fallback={<Loading />}>
          <TabPanel value={value} index={0}>
            <GameTransactions gameName={gameName} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <GamesList onChangeTransaction={onChangeTransaction}/>
          </TabPanel>
        </Suspense>
      </DateRangeContext.Provider>
      {isLoading && <Loading />}
    </div>
  );
};

export default SearchGameHistory;
