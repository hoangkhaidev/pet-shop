import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles2 = makeStyles({
  table: {
    minWidth: 500
  }
});

export default function TotalTable() {
  const classes = useStyles2();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Total:
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              123
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              123
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              123
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              123
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              123
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              123
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              123
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              123
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Average:
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              123
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              123
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              123
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              123
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              123
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              123
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              123
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              123
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
