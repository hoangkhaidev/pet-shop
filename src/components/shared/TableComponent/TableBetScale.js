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
import DeleteConfirm from 'src/components/GamesConfig/GamesConfigDetails/DeleteConfirm';

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

export default function TableBetScale({ dataDetail, setFormState }) {
  const classes = useStyles();
  let defaultBet = dataDetail?.default_bet_scale;
  let betScaleList = dataDetail?.bet_scale_list;
  let lines = dataDetail?.lines;

  const [dataScale, setDataScale] = useState(betScaleList);
  const [checkedRadio, setCheckedRadio] = useState(defaultBet);

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

  const onAddNewBet = () => {
    let newBetScale = String(newScale.values.bet_scale)
    let newDataScale = cloneDeep(dataScale);
    let index = newDataScale.findIndex((item) => {
      let newScale = String(Math.round(item.bet_scale * 100) / 100);
      return newScale === newBetScale;
    });
  
    if (index >= 0) {
      // console.log("Bet scale is duplicated");
      const errors = {
        bet_scale: ["Bet scale is duplicated"]
      };
      setNewScale((newScale) => ({
        ...newScale,
        isValid: false,
        errors: errors || {}
      }));
    } else {
      if (newScale.isValid === true) {
        let newBetScale = String(newScale.values.bet_scale);
        let newTotalScale = String(newScale.values.total_bet);
        let dataScaleNew = {
          bet_scale: newBetScale,
          total_bet: newTotalScale
        }
        setDataScale([...dataScale, dataScaleNew]);
        setNewScale(initNewScale);
      }
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
    let dataScaleNew = (dataScale || []).map((item) => {
      let betNew = (Math.round(item.bet_scale * 100)/100).toFixed(2);
      return { 
        bet_scale: betNew
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
    // console.log(newScale.values.bet_scale);
    setNewScale((newScale) => ({
      ...newScale,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [newScale.values]);

  const hasError = (field) => newScale.touched[field] && newScale.errors[field] ? true : false;

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
                <TableCell className={classes.cellTable} align="center">
                  {/* <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onDeleteItem(row.bet_scale) }
                  >
                    Delete
                  </Button> */}
                  <DeleteConfirm onDeleteItem={onDeleteItem}  name={row.bet_scale} />
                </TableCell>
              </TableRow>
            )
          })}
            <TableRow>
              <TableCell className={classes.cellTable} align="left" colSpan={3}>
                <Input 
                  type="text"
                  id="standard-basic" 
                  name="bet_scale"
                  value={newScale.values.bet_scale}
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