import {
  Card,
  CardContent,
  Grid,
} from '@material-ui/core';


const Budget = (props) => (
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
  </Card>
);

export default Budget;
