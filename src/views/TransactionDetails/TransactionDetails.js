/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useCallback, useState, createContext, lazy } from "react";
import moment from 'moment';
import { makeStyles } from "@mui/styles";
import { AppBar, Button, Tab, Tabs } from "@mui/material";
import TabPanel from "views/TabPanel/TabPanel";
import TransactionRequestResponse from "./TransactionRequestResponse";
import ModalComponentRateHistory from "views/ModalComponent/ModalComponentRateHistory";
import TransactionDetailInfo from "./TransactionDetailInfo";

const TransactionDetailsTable = lazy(() => import("./TransactionDetailsTable"));

export const DateRangeContext = createContext({
  dateRange: {
    start: moment().startOf("day"),
    end: moment().endOf("day")
  },
  setDateRange: () => {}
});

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  labelTab: {
    fontWeight: "bold !important",
    color: "#ccc",
  },
}));

const TransactionDetails = ({roundId}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  let screenWidth = window.innerWidth;

  return (
    <>
      <Button style={{ textTransform: 'none', padding: '10px 0' }} onClick={(onOpenModal)}>{roundId}</Button>
      <ModalComponentRateHistory
        open={open}
        onClose={onClose}
        width={ screenWidth > 991 ? '70%' : '100%'}
      >
        <TransactionDetailInfo onClose={onClose} roundId={roundId}/>
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
            <Tab className={classes.labelTab} label="Transactions" {...a11yProps(0)} />
            <Tab className={classes.labelTab} label="Request Response" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <TransactionDetailsTable roundId={roundId} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TransactionRequestResponse roundId={roundId} />
        </TabPanel>
      </ModalComponentRateHistory>
    </>
  );
};

export default TransactionDetails;
