/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
import { useState, lazy, Suspense, createContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import moment from 'moment';
import NoPermissionPage from "../NoPermissionPage/NoPermissionPage";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { makeStyles } from "@mui/styles";
import { AppBar, Tab, Tabs } from "@mui/material";
import Loading from "views/Loading/Loading";
import TabPanel from "views/TabPanel/TabPanel";

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
    color: "#ccc",
  },
}));

const GameHistory = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [dateRange, setDateRange] = useState({
    start: moment().format("DD/MM/YYYY"),
    end: moment().format("DD/MM/YYYY")
  });
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionPlayers = {};
  permission_groups.map((item) => {
    if (item.name === 'Players') {
      arrPermissionPlayers = item.permissions;
    }
    
    return item.name;
  });

  useEffect(() => {
    document.title = 'Game History';
    
  }, []);

  const [isHasAccessPermission, setIsHasPermission] = useState(true);

  const { t } = useTranslation();
  const valueContext = { dateRange, setDateRange };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!isHasAccessPermission) {
    return <NoPermissionPage />;
  }
  
  if (arrPermissionPlayers[0]?.none) {
    return <Navigate to="/404" />;
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
