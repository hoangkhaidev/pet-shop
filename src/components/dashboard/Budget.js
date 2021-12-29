import {
  Card, CardContent, Grid, makeStyles,
} from '@material-ui/core';

import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import faker from 'faker';
import TitleDashboard from './TitleDashboard';

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

export const options = {
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

export const optionsLine = {
  scales: {
    yAxes: [{
    ticks: {
           min: 0,
           max: 100,
           callback: function(value){return value+ "%"}
        },  
        scaleLabel: {
           display: true,
           labelString: "Percentage"
        }
    }]
  },
};

const labels = ['July', 'August', 'September', 'October', 'November', 'December'];
export const data = {
  labels,
  datasets: [
    {
      label: 'Bets ($)',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Wins ($)',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
export const dataLine = {
  labels,
  datasets: [
    {
      label: 'GGR increase',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: 'rgb(255, 99, 132)',
      fill: false,
      tension: 0.1
    },
    {
      label: 'BET increase',
      data: [42, 13, 23, 50, 24, 32],
      borderColor: 'rgb(53, 162, 235)',
      fill: false,
      tension: 0.1
    },
  ],
};

const Budget = (props) => {
  const classes = useStyles();
  return (
    <>
      <TitleDashboard />
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
            <Bar options={options} data={data}/>
          </Grid>
          <Grid item xs={12} xl={6} md={6}>
            <span className={classes.itemTitle}>% BET / GGR increase by Month</span>
            <Line 
              options={optionsLine} 
              data={dataLine} 
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default Budget;
