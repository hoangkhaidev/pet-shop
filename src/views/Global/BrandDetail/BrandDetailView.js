/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-pascal-case */
import { useState, Suspense, createContext, useEffect } from "react";

import moment from 'moment';
// import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useNavigate } from "react-router";
import { makeStyles } from "@mui/styles";
import useRouter from "utils/hooks/useRouter";
import useFetchData from "utils/hooks/useFetchData";
import NoPermissionPage from "views/NoPermissionPage/NoPermissionPage";
import { AppBar, Tab, Tabs } from "@mui/material";
import Loading from "views/Loading/Loading";
import TabPanel from "views/TabPanel/TabPanel";
import MainCard from "ui-component/cards/MainCard";
import ButtonGroup, { BackButton } from "views/Button/Button";

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
  },
  playerInfoName: {
    display: "flex",
    paddingTop: 20,
  },
  playerNameDisplay: {
    marginRight: '5px',
    fontWeight: "bold",
    width: '50%',
  },
  profileNameDisplay: {
    width: '50%',
  },
  divItem: {
    width: '50%',
  },
  spanItem: {
    paddingBottom: 10,
  },
  titlePage: {
    fontSize: '24px',
    fontWeight: 600,
  }

}));

const BrandDetailView = () => {
  const classes = useStyles();
  const router = useRouter();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const [dateRange, setDateRange] = useState({
    start: moment().format("DD/MM/YYYY"),
    end: moment().format("DD/MM/YYYY")
  });

  const { dataResponse, isHasPermission } = useFetchData(
    `/api/global/brand_detail/${router.query?.id}`,
    null
  );

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

  const onCancel = () => {
    navigate('/global/group_brand');
  }

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
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
        </Tabs>
      </AppBar>
      <DateRangeContext.Provider value={valueContext}>
        <Suspense fallback={<Loading />}>
          <TabPanel value={value} index={0} className={classes.stylePanel}>
            <MainCard>
                <div className={classes.playerInfoName}>
                    <span className={classes.playerNameDisplay}>
                    Secret Key:
                    </span>
                    <span className={classes.profileNameDisplay}>
                        {dataResponse?.secret_key}  
                    </span>
                </div>
                <div className={classes.playerInfoName}>
                    <span className={classes.playerNameDisplay}>
                    API Key:
                    </span>
                    <span className={classes.profileNameDisplay}>
                        {dataResponse?.api_key}  
                    </span>
                </div>
                <div className={classes.playerInfoName}>
                    <span className={classes.playerNameDisplay}>
                        Whitelist IP Address for API:
                    </span>
                    <div className={classes.divItem}>
                        {
                            dataResponse?.api_whitelist_ip?.map((item, index) => (
                                <div key={index} className={classes.spanItem}>
                                    <span>
                                        {item}  
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={classes.playerInfoName}>
                    <span className={classes.playerNameDisplay}>
                    API Endpoint:
                    </span>
                    <span className={classes.profileNameDisplay}>
                        {dataResponse?.api_endpoint}  
                    </span>
                </div>
                <div className={classes.playerInfoName}>
                    <span className={classes.playerNameDisplay}>
                    Player Inactivity Logout Time:
                    </span>
                    <span className={classes.profileNameDisplay}>
                        {dataResponse?.player_inactivity_logout_after_mins} Minutes 
                    </span>
                </div>
                <div className={classes.playerInfoName}>
                    <span className={classes.playerNameDisplay}>
                    Manual retry/refund after:
                    </span>
                    <span className={classes.profileNameDisplay}>
                        {dataResponse?.manual_retry_refund_after_hours} Hours
                    </span>
                </div>
                <div className={classes.playerInfoName}>
                    <span className={classes.playerNameDisplay}>
                        Whitelist IP Address for BO:
                    </span>
                    <div className={classes.divItem}>
                        {
                            dataResponse?.whitelist_ips?.map((item, index) => (
                                <div key={index} className={classes.spanItem}>
                                    <span>
                                        {item}  
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <ButtonGroup>
                    <BackButton onAction={() => onCancel()} text='Back'/>
                </ButtonGroup>
            </MainCard>
          </TabPanel>
        </Suspense>
      </DateRangeContext.Provider>
    </div>
  );
};

export default BrandDetailView;
