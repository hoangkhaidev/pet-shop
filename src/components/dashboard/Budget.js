import {
  Card, CardContent, Grid,
} from '@material-ui/core';

import React from 'react';
import { Bar } from 'react-chartjs-2';
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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
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
      <Bar options={options} data={data} />

    </Card>
  );
}

export default Budget;
