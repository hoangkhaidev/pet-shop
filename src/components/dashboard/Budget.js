/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card, Grid, makeStyles,
} from '@material-ui/core';

import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import TitleDashboard from './TitleDashboard';
import useFetchData from 'src/utils/hooks/useFetchData';
import cloneDeep from 'lodash.clonedeep';
import { setParentParam } from 'src/features/parentParam/parentParam';
import { useDispatch, useSelector } from 'react-redux';
import NoPermissionPage from '../NoPermissionPage/NoPermissionPage';
import NoPermissionPageNotBack from '../NoPermissionPage/NoPermissionPageNotBack';
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  
  itemChart: {
    width: '50%',
    textAlign: 'center',
    paddingTop: '10px',
  },
  itemTitle: {
    fontSize: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  test: {
    position: 'absolute',
    bottom: '0px',
    right: '38%',
    padding: '15px 30px',
    '&:hover': {
      backgroundColor: 'red',
    },
  },
}));

const Budget = (props) => {
  const classes = useStyles();
  const { dataResponse } = useFetchData("/api/dashboard");
  const [dataChartBar, setDataChartBar] = useState({});
  const [dataChartLine, setDataChartLine] = useState({});
  const dispatch = useDispatch();
  const roleUserType = useSelector((state) => state.roleUser.account_type);
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionDashboard = {};
  let arrPermissionBrand = {};
  let arrPermissionPlayers = {};
  let arrPermissionGames = {};
  let checkPermissionFail = false;
  permission_groups.map((item) => {
    if (item.name === 'Dashboard') {
      arrPermissionDashboard = item.permissions[0];
    }
    if (item.name === 'Brand') {
      arrPermissionBrand = item.permissions[0];
    }
    if (item.name === 'Players') {
      arrPermissionPlayers = item.permissions[0];
    }
    if (item.name === 'Configuration') {
      arrPermissionGames = item.permissions[0];
    }
    if (item.name === 'Global') {
      item.permissions?.map((item2) => {
        if (item2.name === 'Failed Transaction') checkPermissionFail = item2.none;
        return item2.name === 'Failed Transaction';
      });
    }
    return item.name === 'Dashboard'
  });

  useEffect(() => {
    console.log(dataChartLine);
  }, [dataChartLine]);

  useEffect(() => {
    let dataChart1 = cloneDeep(dataResponse?.bet_win_list);
    const monthChart1 = dataChart1?.map((item) => item.month);
    const betChart1 = dataChart1?.map((item) => item.bet);
    const winChart1 = dataChart1?.map((item) => item.win);
    setDataChartBar({
      labels: monthChart1,
      datasets: [
        {
          label: 'Bets ($)',
          data: betChart1,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Wins ($)',
          data: winChart1,
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    });

    let dataChart2 = cloneDeep(dataResponse?.bet_margin_percent_list);
    const monthChart2 = dataChart2?.map((item) => item.month);
    const betChart2 = dataChart2?.map((item) => item.bet_percent);
    const ggrChart2 = dataChart2?.map((item) => item.margin_percent);

    let ggrChartTest = ['-66.55', '36.33', null, '-291.24', '91.24'];
    let monthTest = ['Dec 2021', 'Nov 2021', 'Oct 2021', 'Sep 2021', 'tesst 2021']

    setDataChartLine({
      labels: monthTest,
      datasets: [
        {
          label: 'GGR increase',
          data: ggrChartTest,
          borderColor: 'rgb(255, 99, 132)',
          fill: false,
          tension: 0.1
        },
        {
          label: 'BET increase',
          data: ggrChartTest,
          borderColor: 'rgb(53, 162, 235)',
          fill: false,
          tension: 0.1
        },
      ],
    });

  }, [dataResponse]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const optionsLine = {
    scales: {
      yAxes: [{
      ticks: {
             callback: function(value){return value+ "%"}
          },  
          scaleLabel: {
             display: true,
             labelString: "Percentage"
          }
      }]
    },
  };

  useEffect(() => {
    dispatch(setParentParam(`/home/dashboard`));
  }, []);

  if (arrPermissionDashboard.none) {
    return <NoPermissionPage />;
  }

  if (arrPermissionBrand?.none && arrPermissionPlayers?.none && checkPermissionFail) {
    return <NoPermissionPageNotBack />;
  }

  return (
    <>
      <TitleDashboard dataResponse={dataResponse}/>
      {
        roleUserType === 'operator' || roleUserType === 'operatorsub' || roleUserType === 'brand' || roleUserType === 'brandsub' ? 
          !arrPermissionBrand?.none && !arrPermissionPlayers?.none && !arrPermissionGames?.none ? (
            <Card
              sx={{ height: '100%' }}
              {...props}
            >
              <Grid container spacing={2} style={{paddingTop: '20px'}}>
                <Grid item xs={12} xl={6} md={6}>
                  <span className={classes.itemTitle}>BET / WIN by Month</span>
                  <Bar options={options} data={dataChartBar}/>
                </Grid>
                <Grid item xs={12} xl={6} md={6} style={{position: 'relative'}}>
                  <span className={classes.itemTitle}>% BET / GGR increase by Month</span>
                  <Line 
                    options={optionsLine} 
                    data={dataChartLine} 
                  />
                  {/* <div className={classes.test}>
                  </div> */}
                </Grid>
              </Grid>
            </Card>
          ) : ''
        : ''
      }
    </>
  );
}

export default Budget;
