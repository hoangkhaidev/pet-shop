/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { CircularProgress } from '@mui/material';
import React from 'react';

export default function CircularIndeterminate() {

  return (
    <div>
      <div style={{display: 'flex', position: 'fixed', top: '45%', left: '45%', alignItems: 'center', justifyContent: 'center'}}>
        <CircularProgress value={100} />
        <span>&nbsp; Loading ...</span>
      </div>      
    </div>
  );
}
