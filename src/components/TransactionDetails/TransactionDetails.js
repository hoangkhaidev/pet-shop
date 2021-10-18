/* eslint-disable arrow-body-style */
import { Button, makeStyles } from "@material-ui/core";
import { useCallback, useState, createContext, lazy } from "react";
import moment from 'moment';
import TransactionDetailsInfo from "./TransactionDetailInfo";
import TabPanel from "src/components/shared/TabPanel/TabPanel";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import TransactionRequestResponse from "./TransactionRequestResponse";
import ModalComponentRateHistory from "../shared/ModalComponent/ModalComponentRateHistory";

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
  },
  aaaaaaaaa: {
    '& .MuiButtonBase-root.MuiTab-root.MuiTab-textColorPrimary.Mui-selected.makeStyles-labelTab-6.css-1760dni-MuiButtonBase-root-MuiTab-root': {
      color: '#fff !important',
    },
  }
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

  return (
    <>
      <Button style={{ textTransform: 'none' }} onClick={(onOpenModal)}>{roundId}</Button>
      <ModalComponentRateHistory
        open={open}
        onClose={onClose}
        width="800px"
      >
        <TransactionDetailsInfo onClose={onClose} roundId={roundId}/>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Search game history"
            indicatorColor="secondary"
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
