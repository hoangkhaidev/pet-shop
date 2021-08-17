import TableContainer from "@material-ui/core/TableContainer";
import Paper from '@material-ui/core/Paper';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import map from "lodash/map";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { array, object, number } from "prop-types";
import { TableBody } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import TablePagination from "./TablePagination";
import React from "react";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  tableHeader: {
    backgroundColor: "#5664d2",
  },
  tableCellHeader: {
    fontWeight: '600 !important',
    color: "#ffffff !important",
    border: '1px solid #fff',
  },
  tableCellBody: {
    minWidth: 150,
  }
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const TableHeader = ({ headers, listCurrency }) => {
  const { t } = useTranslation();
  const classes = useStyles();
    // console.log(headers)
  return (
    <TableHead className={classes.tableHeader}>
        <TableRow>
            <TableCell align="center">
              
            </TableCell>
            <TableCell 
                align="center" 
                colSpan={3} 
                classes={{
                    root: classes.tableCellHeader
                }}
            >
              Total (USD)
            </TableCell>
            {listCurrency?.map((item, index) => (
              <TableCell 
                key={index}
                align="center" 
                colSpan={3} 
                classes={{
                    root: classes.tableCellHeader
                }}
              >
                {item.currency_code}
              </TableCell>
            ))}
        </TableRow>
        
      <TableRow>
        {(headers || []).map((header, index) => (
          <TableCell
            align="center"
            key={index}
            classes={{
              root: classes.tableCellHeader
            }}
          >
            {t(header)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = {
  headers: array.isRequired,
};

const TableRowComponent = ({ rowData, cellInfo, indexRow }) => {
  const classes = useStyles();
  // console.log(rowData.currency_entry_list[cellInfo.currency_code])
 
  return (
    <StyledTableRow align={cellInfo.align}>
      {cellInfo.map((info, index) => {
        const locationIndex = rowData.currency_entry_list.findIndex((item) => item.currency_code === info.currency_code);

        const test = rowData.currency_entry_list[locationIndex];
        return (
          <TableCell
            sx={{
              padding: 1
            }}
            className={classes.tableCellBody}
            // key={info.data_field}
            key={index}
            align={info.align ? info.align : "left"}
          >
            {
              info.currency_code ? 
                info.formatter ? (
                  info.formatter(test?.[info.data_field])
                  ) : (
                    test?.[info.data_field]
                  )
              : info.formatter ? (
                  info.formatter(rowData[info.data_field], rowData)
                  ) : (
                    rowData[info.data_field]
                  )
            }
          </TableCell>
        )} 
      )}
    </StyledTableRow>
  );
};

TableRowComponent.propTypes = {
  rowData: object.isRequired,
  cellInfo: array.isRequired,
  indexRow: number.isRequired
};

const TableComponentGamesSummary = ({
  // eslint-disable-next-line react/prop-types
  data, dataType = null, dataSum = {}, listCurrency, columns, pagination, handleChangePage, handleChangeRowsPerPage, types, page, page_size
}) => {
  const formatNumber = (num) => {
    let cellFormat = (Math.round(num * 100)/100).toFixed(2);
    let formatNum = cellFormat?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return formatNum;
  }
  const classes = useStyles();
  // eslint-disable-next-line camelcase
  const cellInfo = map(columns, ({ data_field, currency_code, align, formatter, fontWeight }) => ({ data_field, currency_code, align, formatter, fontWeight
   }));

  console.log(dataSum?.currency_entry_list)

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="table-component">
        <TableHeader headers={columns.map(item => item.column_name)} listCurrency={listCurrency} />
        <TableBody>{data.length > 0 ? data.map((row, index) => {
              let startIndex = (page - 1) * page_size + 1; 
              return (
                <TableRowComponent indexRow={startIndex + index} key={index} rowData={row} cellInfo={cellInfo} />
              )
            }) : <TableRow>
                  <TableCell component="th" scope="row">
                    "No result found"
                  </TableCell>
                </TableRow>
          }
          { dataType === 'GamesSummary' && 
            <>
              <TableRow style={{ background: '#07bb5f' }}>
                <TableCell 
                  component="th" 
                  scope="row" 
                  sx={{
                    padding: 1
                  }}
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}
                >
                  Total:
                </TableCell>

                <TableCell 
                  sx={{
                    padding: 1
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {formatNumber(dataSum?.bet)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {formatNumber(dataSum?.win)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {formatNumber(dataSum?.margin)}
                </TableCell>
                {dataSum?.currency_entry_list?.map((item, index) => (
                  <React.Fragment key={index} >
                    <TableCell
                      sx={{
                        padding: 1
                      }} 
                      align="right"
                      style={{ fontWeight: '600' }} 
                      className={classes.tableCellBody}>
                      {formatNumber(item?.bet)}
                    </TableCell>
                    <TableCell 
                      sx={{
                        padding: 1
                      }} 
                      align="right"
                      style={{ fontWeight: '600' }} 
                      className={classes.tableCellBody}>
                      {formatNumber(item?.win)}
                    </TableCell>
                    <TableCell 
                      sx={{
                        padding: 1
                      }} 
                      align="right"
                      style={{ fontWeight: '600' }} 
                      className={classes.tableCellBody}>
                      {formatNumber(item?.margin)}
                    </TableCell>
                  </React.Fragment>
                ))}
              </TableRow>
            </>
          }
        </TableBody>
        {types !== 'RoleList' && 
          <TablePagination
            count={pagination.total_size}
            page={Number(pagination.page) - 1}
            rowsPerPage={pagination.page_size}
            onPageChange={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        }
      </Table>
    </TableContainer>
  );
};

TableComponentGamesSummary.propTypes = {
  data: array.isRequired,
  columns: array.isRequired,
  pagination: object
};

TableComponentGamesSummary.defaultProps = {
  pagination: {}
};

export default TableComponentGamesSummary;
