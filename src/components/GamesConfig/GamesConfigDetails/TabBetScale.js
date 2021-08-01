import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TableBetScale from 'src/components/shared/TableComponent/TableBetScale';
import { Button, Input } from '@material-ui/core';
import ButtonGroup, { SubmitButton, } from 'src/components/shared/Button/Button';
import ClearAllIcon from '@material-ui/icons/ClearAll';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    marginLeft: '10px',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    textAlign: 'left',
  },
  w20: {
    width: '20%',
    textAlign: 'right',
  },
  w40: {
    width: '40%',
    textAlign: 'right',
  },
  w60: {
    width: '60%',
    marginLeft: '10px',
  },
  w80: {
    width: '80%',
    marginLeft: '10px',
  },
  tableConfiguration: {
    display: 'flex',
    paddingTop: '20px',
    alignItems: 'center',
  },
  inputTotal: {
    textAlign: 'right !important'
  }
}));

export default function TabBetScale() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TableBetScale />
        <div className={classes.tableConfiguration}>
            <span className={classes.w20}>Total bet limits:	</span> 
        </div> 
        <div className={classes.tableConfiguration}>
            <span className={classes.w40}>Total MIN: </span> 
            <span className={classes.w60}>
                <Input id="standard-basic" defaultValue={0.00} className={classes.inputTotal} />    
            </span> 
        </div> 
        <div className={classes.tableConfiguration}>
            <span className={classes.w40}>Total MAX: </span> 
            <span className={classes.w60}>
                <Input id="standard-basic" defaultValue={0.00} className={classes.inputTotal} />
            </span> 
        </div> 
        <div className={classes.tableConfiguration} style={{ justifyContent: 'flex-end' }}>
            <ButtonGroup>
                <SubmitButton text={'Save'}/>
                <Button
                    startIcon={<ClearAllIcon fontSize="small" />}
                    variant="contained"
                    type="button"
                    color="secondary"
                    sx={{
                    ml: 1
                    }}
                >
                    Cancel
                </Button>
            </ButtonGroup>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableBetScale />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TableBetScale />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TableBetScale />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <TableBetScale />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <TableBetScale />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <TableBetScale />
      </TabPanel>
    </div>
  );
}