import { useState, lazy, Suspense, createContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTranslation } from "react-i18next";
import moment from 'moment';
import TabPanel from "src/components/shared/TabPanel/TabPanel";
import Loading from "src/components/shared/Loading/Loading";
import PlayerInformation from "../PlayerInformation/PlayerInformation";
import NoPermissionPage from "../NoPermissionPage/NoPermissionPage";
import useRouter from "src/utils/hooks/useRouter";
import useFetchData from "src/utils/hooks/useFetchData";
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
  },
  aaaaaaaaa: {
    '& .MuiButtonBase-root.MuiTab-root.MuiTab-textColorPrimary.Mui-selected.makeStyles-labelTab-6.css-1760dni-MuiButtonBase-root-MuiTab-root': {
      color: '#fff !important',
    },
  }

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
