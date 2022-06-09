/* eslint-disable import/no-duplicates */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import map from "lodash/map";
import { array, object, number } from "prop-types";
import { useTranslation } from "react-i18next";
import TablePagination from "./TablePagination";
import { Fragment } from "react";
import { makeStyles, withStyles } from "@mui/styles";
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Table } from "@mui/material";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  tableHeader: {
    backgroundColor: "#3245b9",
  },
  tableCellHeader: {
    fontWeight: '600 !important',
    color: "#ffffff !important",
    border: '1px solid #fff',
  },
  tableCellBody: {
    minWidth: 150,
    // borderRight: '1px solid rgba(224, 224, 224, 1)',
  }
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const TableHeader = ({ headers, listCurrency, listCurrencyFetch }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <TableHead className={classes.tableHeader}>
      <TableRow>
          <TableCell align="center"></TableCell>
          <TableCell 
              align="center" 
              colSpan={3} 
              classes={{
                  root: classes.tableCellHeader
              }}
          >
            Total (USD)
          </TableCell>

          {
            listCurrency?.length > 0 ?
              listCurrency?.map((item, index) => (
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
              )) : listCurrencyFetch?.map((item, index) => (
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
              ))
          }
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
        {
          listCurrency?.length > 0 ?
            '' : listCurrencyFetch?.map((item, index) => (
              <Fragment key={index}>
                <TableCell
                  align="center"
                  classes={{
                    root: classes.tableCellHeader
                  }}
                >
                  {'Bet'}
                </TableCell>
                <TableCell
                  align="center"
                  classes={{
                    root: classes.tableCellHeader
                  }}
                >
                  {'Win'}
                </TableCell>
                <TableCell
                  align="center"
                  classes={{
                    root: classes.tableCellHeader
                  }}
                >
                  {'Margin'}
                </TableCell>
              </Fragment>
            ))
        }
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = {
  headers: array.isRequired,
};

const TableRowComponent = ({ rowData, cellInfo, indexRow }) => {
  const classes = useStyles();
 
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
  data, dataType = null, dataSum = {}, listCurrency, columns, pagination, handleChangePage, handleChangeRowsPerPage, types, page, page_size
}) => {
  const formatNumber = (num) => {
    let cellFormat = (Math.round(num * 100)/100).toFixed(2);
    let formatNum = cellFormat?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return formatNum;
  }
  const classes = useStyles();
  const cellInfo = map(columns, ({ data_field, currency_code, align, formatter, fontWeight }) => ({ data_field, currency_code, align, formatter, fontWeight
   }));

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="table-component">
        <TableHeader headers={columns.map(item => item.column_name)} listCurrency={listCurrency} listCurrencyFetch={dataSum?.currency_entry_list}/>
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
              <TableRow style={{ background: '#e3f2fd' }}>
                <TableCell 
                  component="th" 
                  scope="row" 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }}
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}
                >
                  Total:
                </TableCell>

                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {formatNumber(dataSum?.bet)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {formatNumber(dataSum?.win)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {formatNumber(dataSum?.margin)}
                </TableCell>
                {
                  dataSum?.currency_entry_list?.map((item, index) => (
                    <Fragment key={index} >
                      <TableCell
                        sx={{
                          padding: 1,
                          // color: '#fff'
                        }} 
                        align="right"
                        style={{ fontWeight: '600' }} 
                        className={classes.tableCellBody}>
                        {formatNumber(item?.bet)}
                      </TableCell>
                      <TableCell 
                        sx={{
                          padding: 1,
                          // color: '#fff'
                        }} 
                        align="right"
                        style={{ fontWeight: '600' }} 
                        className={classes.tableCellBody}>
                        {formatNumber(item?.win)}
                      </TableCell>
                      <TableCell 
                        sx={{
                          padding: 1,
                          // color: '#fff'
                        }} 
                        align="right"
                        style={{ fontWeight: '600' }} 
                        className={classes.tableCellBody}>
                        {formatNumber(item?.margin)}
                      </TableCell>
                    </Fragment>
                  ))
                }
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
