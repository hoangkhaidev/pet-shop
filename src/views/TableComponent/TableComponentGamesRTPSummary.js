/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
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
          <TableCell align="center" style={{width: '20%'}}></TableCell>
          <TableCell align="center" style={{width: '20%'}}></TableCell>
          <TableCell align="center" style={{width: '12%'}}></TableCell>
          <TableCell align="center" style={{width: '12%'}}></TableCell>
          <TableCell 
              align="center" 
              colSpan={3} 
              classes={{
                  root: classes.tableCellHeader
              }}
              style={{width: '36%'}}
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
                  style={{width: '36%'}}
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
                  style={{width: '36%'}}
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
                  style={{width: '12%'}}
                >
                  {'Bet'}
                </TableCell>
                <TableCell
                  align="center"
                  classes={{
                    root: classes.tableCellHeader
                  }}
                  style={{width: '12%'}}
                >
                  {'Win'}
                </TableCell>
                <TableCell
                  align="center"
                  classes={{
                    root: classes.tableCellHeader
                  }}
                  style={{width: '12%'}}
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
        return (
          <TableCell
            sx={{
              padding: 1,
            }}
            style={{width: info.width}}
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

const TableComponentGamesRTPSummary = ({
  data, dataType = null, dataSum = {}, listCurrency, columns, pagination, handleChangePage, handleChangeRowsPerPage, types, page, page_size
}) => {
  const formatNumber = (num) => {
    let cellFormat = (Math.round(num * 100)/100).toFixed(2);
    let formatNum = cellFormat?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return formatNum;
  }
  const classes = useStyles();
  const cellInfo = map(columns, ({ data_field, currency_code, align, formatter, fontWeight, width }) => ({ data_field, currency_code, align, formatter, fontWeight, width
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
          { dataType === 'GamesSummaryRTP' && 
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
                  style={{ fontWeight: '600', width:'25%' }} 
                  className={classes.tableCellBody}
                >
                </TableCell>
                <TableCell 
                  component="th" 
                  scope="row" 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }}
                  align="right"
                  style={{ fontWeight: '600', width:'25%' }} 
                  className={classes.tableCellBody}
                >
                </TableCell>
                <TableCell 
                  component="th" 
                  scope="row" 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }}
                  align="right"
                  style={{ fontWeight: '600', width:'10%' }} 
                  className={classes.tableCellBody}
                >
                </TableCell>
                <TableCell 
                  component="th" 
                  scope="row" 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }}
                  align="right"
                  style={{ fontWeight: '600', width:'10%' }} 
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
                  style={{ fontWeight: '600', width:'10%' }} 
                  className={classes.tableCellBody}>
                  {formatNumber(dataSum?.bets)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600', width:'10%' }} 
                  className={classes.tableCellBody}>
                  {formatNumber(dataSum?.wins)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600', width:'10%' }} 
                  className={classes.tableCellBody}>
                  {formatNumber(dataSum?.margins)}
                </TableCell>
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

TableComponentGamesRTPSummary.propTypes = {
  data: array.isRequired,
  columns: array.isRequired,
  pagination: object
};

TableComponentGamesRTPSummary.defaultProps = {
  pagination: {}
};

export default TableComponentGamesRTPSummary;
