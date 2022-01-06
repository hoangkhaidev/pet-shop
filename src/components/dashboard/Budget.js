/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card, CardContent, Grid, makeStyles,
} from '@material-ui/core';

import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import TitleDashboard from './TitleDashboard';
import useFetchData from 'src/utils/hooks/useFetchData';
import cloneDeep from 'lodash.clonedeep';
import { setParentParam } from 'src/features/parentParam/parentParam';
import { useDispatch, useSelector } from 'react-redux';
import NoPermissionPage from '../NoPermissionPage/NoPermissionPage';

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
  }
}));

const Budget = (props) => {
  const classes = useStyles();
  const { dataResponse } = useFetchData("/api/dashboard");
  const [dataChartBar, setDataChartBar] = useState({});
  const [dataChartLine, setDataChartLine] = useState({});
  const dispatch = useDispatch();
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionDashboard = {};
  permission_groups.map((item) => {
    if (item.name === 'Dashboard') {
      arrPermissionDashboard = item.permissions[0];
    }
    return item.name === 'Dashboard';
  });

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

    setDataChartLine({
      labels: monthChart2,
      datasets: [
        {
          label: 'GGR increase',
          data: ggrChart2,
          borderColor: 'rgb(255, 99, 132)',
          fill: false,
          tension: 0.1
        },
        {
          label: 'BET increase',
          data: betChart2,
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

  return (
    <>
      <TitleDashboard dataResponse={dataResponse}/>
      <Card
        sx={{ height: '100%' }}
        {...props}
      >
        <CardContent sx={{padding: '0 !important'}}>
          {/* <Grid
            container
            sx={{ justifyContent: 'center', padding: '0.8rem', alignItems: 'center', background: '#7c85ca', color: '#fff', fontSize: '26px' }}
          >
              Welcome to Dashboard
          </Grid> */}
        </CardContent>
        <Grid container spacing={2} style={{paddingTop: '20px'}}>
          <Grid item xs={12} xl={6} md={6}>
            <span className={classes.itemTitle}>BET / WIN by Month</span>
            <Bar options={options} data={dataChartBar}/>
          </Grid>
          <Grid item xs={12} xl={6} md={6}>
            <span className={classes.itemTitle}>% BET / GGR increase by Month</span>
            <Line 
              options={optionsLine} 
              data={dataChartLine} 
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default Budget;
