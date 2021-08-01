import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Radio } from '@material-ui/core';
import DeleteItem from 'src/components/Modal/DeleteItem';
import { Input } from '@material-ui/core';

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
  }
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function TableBetScale() {
  const classes = useStyles();
  const [checkedRadio, setCheckedRadio] = useState(false);

  const handleChange = (event) => {
      console.log(event.target.checked)
    setCheckedRadio(event.target.checked)
  };

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
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell className={classes.cellTable} align="right">
                {row.name}
              </TableCell>
              <TableCell className={classes.cellTable} align="right">{row.calories}</TableCell>
              <TableCell className={classes.cellTable} align="center">
                <Radio
                    checked={checkedRadio}
                    name="default"
                    onChange={handleChange}
                />
              </TableCell>
              <TableCell className={classes.cellTable} align="center">
                <DeleteItem />
              </TableCell>
            </TableRow>
          ))}
            <TableRow>
              <TableCell className={classes.cellTable} align="left" colSpan={3}>
                <Input id="standard-basic" defaultValue={0.00} className={classes.inputTotal} />
              </TableCell>
              <TableCell className={classes.cellTable} align="center">
                <Button
                    variant="contained"
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