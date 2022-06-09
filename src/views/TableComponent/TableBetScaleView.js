/* eslint-disable import/no-duplicates */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { Paper, Radio, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { TableContainer } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
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