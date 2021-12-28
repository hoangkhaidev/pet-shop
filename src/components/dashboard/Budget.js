import {
  Card, CardContent, makeStyles,
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
// 'January', 'February', 'March', 'April', 'May', 'June', 

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
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: 'rgb(255, 99, 132)',
      fill: false,
      tension: 0.1
      // backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'BET increase',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: 'rgb(53, 162, 235)',
      fill: false,
      tension: 0.1
      // backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
        <div style={{display: 'flex'}}> 
          <div className={classes.itemChart} >
            <span style={{ fontSize: '20px' }}>BET / WIN by Month</span>
            <Bar options={options} data={data}/>
          </div> 
          <div className={classes.itemChart} >
            <span style={{ fontSize: '20px' }}>% BET / GGR increase by Month</span>
            <Line options={options} data={dataLine} />
          </div>
        </div>
      </Card>
    </>
  );
}

export default Budget;
