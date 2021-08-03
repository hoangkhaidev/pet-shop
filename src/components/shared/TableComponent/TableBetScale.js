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
import { Button, FormLabel, Radio } from '@material-ui/core';
import { Input } from '@material-ui/core';
import cloneDeep from 'lodash.clonedeep';
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
      greaterThan: 0,
    }
  },
}

export default function TableBetScale({ dataDetail }) {
  const classes = useStyles();
  let defaultBet = dataDetail?.default_bet_scale;
  let betScaleList = dataDetail?.bet_scale_list;
  let lines = dataDetail?.lines;

  const [checkedRadio, setCheckedRadio] = useState(defaultBet);
  const [dataScale, setDataScale] = useState(betScaleList);

  // const [newScale, setNewScale] = useState({
  //   bet_scale: "",
  //   total_bet: ""
  // });

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
  };

  const onAddNewBet = () => {
    if (newScale.isValid === true) {
      setDataScale([...dataScale, newScale.values]);
    }
  }

  const onDeleteItem = (bet_scale) => {
    let newDataScale = cloneDeep(dataScale);
    let index = newDataScale.map((item) => item.bet_scale).indexOf(bet_scale);
    newDataScale.splice(index, 1);
    setDataScale(newDataScale);
  }

  const handleChangeInput = (event) => {
    event.persist();
    let value = event.target.value?.trim() ? Number(event.target.value?.trim()) : '';
    let valueTotal = Number(value) * Number(lines);

    setNewScale((newScale) => ({
      ...newScale,
      values: {
        ...newScale.values,
        bet_scale: value,
        total_bet: valueTotal,
      },
      touched: {
        ...newScale.touched,
        [event.target.name]: true
      }
    }));
  }

  useEffect(() => {
    setCheckedRadio(defaultBet);
  }, [defaultBet]);

  useEffect(() => {
    setDataScale(betScaleList);
    setNewScale(initNewScale);
  }, [betScaleList]);

  useEffect(() => {
    const errors = validate(newScale.values, schema);
    console.log(newScale.values.bet_scale);
    setNewScale((newScale) => ({
      ...newScale,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [newScale.values]);

  const hasError = (field) => newScale.touched[field] && newScale.errors[field] ? true : false;

  console.log(newScale);

  return (
    <TableContainer component={Paper} >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.boldTable} align="left">Bets</TableCell>
            <TableCell className={classes.boldTable} align="left">Total Bet</TableCell>
            <TableCell className={classes.boldTable} align="left">Default</TableCell>
            <TableCell className={classes.boldTable} align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(dataScale || []).map((row, index) => {
            console.log(row);
            let total_bet = Number(row.bet_scale) * Number(dataDetail.lines);
            let bet_scale = Number(row.bet_scale);
            return (
              <TableRow key={index}>
                <TableCell className={classes.cellTable} align="right">
                  {bet_scale}
                </TableCell>
                <TableCell className={classes.cellTable} align="right">{total_bet.toFixed(2)}</TableCell>
                <TableCell className={classes.cellTable} align="center">
                  <Radio
                      value={row.bet_scale}
                      checked={checkedRadio === row.bet_scale ? 'checked' : null}
                      name="default"
                      onChange={handleChange}
                  />
                </TableCell>
                <TableCell className={classes.cellTable} align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onDeleteItem(row.bet_scale) }
                  >
                    Delete
                </Button>
                </TableCell>
              </TableRow>
            )
          })}
            <TableRow>
              <TableCell className={classes.cellTable} align="left" colSpan={3}>
                <Input 
                  type="number"
                  id="standard-basic" 
                  name="bet_scale"
                  defaultValue={0.00} 
                  className={classes.inputTotal} 
                  error={hasError('bet_scale')}
                  onChange={handleChangeInput}
                />
                <FormLabel component="legend" className={classes.checkHelperText}>
                 { hasError('bet_scale') ? newScale.errors.bet_scale[0] : null }
                </FormLabel>
              </TableCell>
              <TableCell className={classes.cellTable} align="center">
                <Button
                    variant="contained"
                    onClick={() => onAddNewBet()}
                    disabled={!newScale.isValid}
                >
                    Add new bet
                </Button>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}