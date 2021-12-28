import {
  Card, CardContent, Grid,
} from '@material-ui/core';

import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import faker from 'faker';

// ChartJS.register({
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// });

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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

export const dataPie = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [30, 20, 15, 15, 12, 8],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const config = {
  type: 'line',
  data: data,
  options: {}
};

const Budget = (props) => {
  
  return (
    <Card
      sx={{ height: '100%' }}
      {...props}
    >
      <CardContent sx={{background: '#7c85ca',padding: '0 !important'}}>
        <Grid
          container
          sx={{ justifyContent: 'center', padding: '0.8rem', alignItems: 'center', background: '#7c85ca', color: '#fff', fontSize: '26px' }}
        >
            Welcome to Dashboard
        </Grid>
      </CardContent>
      <div> 
        <Bar options={options} data={data} config={config}/>
      </div>
      <div>
        <Pie data={dataPie} />
      </div>
    </Card>
  );
}

export default Budget;
