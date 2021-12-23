/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Radio } from '@material-ui/core';
import validate from 'validate.js';

const useStyles = makeStyles({
  table: {
    minWidth: 590,
  },
  root: {
    width: '80%',
    marginLeft: '10px',
  },
  boldTable: {
    fontWeight: '600 !important',
    border: '1px solid #e0e0e0',
  },
  cellTable: {
    border: '1px solid #e0e0e0',
  },
  inputTotal: {
    textAlign: 'right !important'
  },
  checkHelperText: {
    color: 'red !important',
    fontSize: '12px !important',
    marginLeft: '15px',
    paddingTop: '5px !important'
  }
});

const schema = {
  bet_scale: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      greaterThan: 0.01,
    }
  },
}

export default function TableBetScaleView({ dataDetail, setFormState, default_bet_scale }) {
  const classes = useStyles();
  let betScaleList = dataDetail?.bet_scale_list;

  const [dataScale, setDataScale] = useState(betScaleList);
  const [checkedRadio, setCheckedRadio] = useState(default_bet_scale);

  const initNewScale = {
    isValid: false,
    values: {
      bet_scale: 0,
      total_bet: 0
    },
    errors: {},
    touched: {}
  };

  const [newScale, setNewScale] = useState(initNewScale);

  const handleChange = (event) => {
    setCheckedRadio(event.target.value)
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        default_bet_scale: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  useEffect(() => {
    setCheckedRadio(default_bet_scale);
  }, [default_bet_scale]);

  useEffect(() => {
    setDataScale(betScaleList);
    setNewScale(initNewScale);
  }, [betScaleList]);

  useEffect(() => {
    let dataScaleNew = (dataScale || []).map((item) => {
      return { 
        bet_scale: item.bet_scale
      }
    });
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        bet_scale_list: dataScaleNew
      },
      touched: {
        ...formState.touched,
      }
    }));
  }, [dataScale]);

  useEffect(() => {
    const errors = validate(newScale.values, schema);
    setNewScale((newScale) => ({
      ...newScale,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [newScale.values]);

  return (
    <TableContainer component={Paper} >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.boldTable} align="left">Bets</TableCell>
            <TableCell className={classes.boldTable} align="left">Total Bet</TableCell>
            <TableCell className={classes.boldTable} align="left">Default</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(dataScale || []).map((row, index) => {
            let total_bet = Number(row.bet_scale) * Number(dataDetail.lines);
            let bet_scale = Number(row.bet_scale);
            return (
              <TableRow key={index}>
                <TableCell className={classes.cellTable} align="right">
                  {bet_scale.toFixed(2)}
                </TableCell>
                <TableCell className={classes.cellTable} align="right">{total_bet.toFixed(2)}</TableCell>
                <TableCell className={classes.cellTable} align="center">
                  <Radio
                      value={row.bet_scale}
                      checked={checkedRadio === String(row.bet_scale) ? true : false}
                      name="default_bet_scale"
                      onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}