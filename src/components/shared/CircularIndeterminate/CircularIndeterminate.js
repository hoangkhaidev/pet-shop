import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <div style={{display: 'flex', position: 'fixed', top: '45%', left: '45%', alignItems: 'center', justifyContent: 'center'}}>
        <CircularProgress value={100} />
        <span>&nbsp; Loading ...</span>
      </div>      
      {/* <CircularProgress color="secondary" /> */}
    </div>
  );
}
