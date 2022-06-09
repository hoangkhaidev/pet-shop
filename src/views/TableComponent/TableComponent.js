/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import map from "lodash/map";
import { array, object, number } from "prop-types";
import { useTranslation } from "react-i18next";

import TablePagination from "./TablePagination";
import moment from "moment";
import { makeStyles, withStyles } from "@mui/styles";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { minWidth } from "@mui/system";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    // tableLayout: 'fixed',
  },
  tableHeader: {
    backgroundColor: "#3245b9",
  },
  tableCellHeader: {
    fontWeight: '600 !important',
    color: "#ffffff !important",
    whiteSpace: 'nowrap',
    border: 'none !important',
  },
  tableCellBody: {
    minWidth: 80,
    padding: '5px 16px !important',
    // wordWrap: 'break-word !important',
    // borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
  tableCellBodyNowrap: {
    minWidth: 100,
    whiteSpace: 'nowrap',
    padding: '5px 16px !important',
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

const TableHeader = ({ headers, brand }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <TableHead className={classes.tableHeader}>
      <TableRow>
        {(headers || []).map((header, index) => {
          return (
            <TableCell
              align={header?.align}
              key={index}
              classes={{
                root: classes.tableCellHeader
              }}
              sx={
                brand === 'transactionDetail' ? { minWidth: 150 } : {}
              }
            >
              {t(header?.column_name)}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = {
  headers: array.isRequired,
};

const TableRowComponent = ({ rowData, cellInfo, indexRow }) => {
  const classes = useStyles();
  let newAt = moment(rowData.at, ["DD/MM/YY, hh:mm a"]);
  rowData.at = newAt;
  return (
    <StyledTableRow align={cellInfo.align}>
      {cellInfo.map((info, index) => {
        return (
          <TableCell
            // sx={ info.data_field === 'indexRow' ? {
            //   padding: 1,
            //   width: '50px'
            // } : { padding: 1, }}
            sx={ 
              info.data_field === 'ip' 
                ? { 
                    wordWrap: 'break-word !important', 
                    maxWidth: '150px', 
                  } 
                : info.data_field === 'indexRow' 
                    ? {
                        padding: 1,
                        width: '50px'
                      } 
                    : { padding: 1, }
            }
            className={info.nowrap ? classes.tableCellBodyNowrap : classes.tableCellBody}
            key={index}
            align={info.align ? info.align : "left"}
          >
            {info.formatter ? (
              info.formatter(rowData[info.data_field], rowData)
            ) : (
              info.data_field === 'indexRow' ? indexRow : rowData[info.data_field]
            )}
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

const TableComponent = ({
  data, brand, roleUser , dataType = null, dataSum = {}, dataAverage = {}, columns, pagination, handleChangePage, handleChangeRowsPerPage, types, page, page_size
}) => {
  const formatNumber = (num) => {
    let cellFormat = (Math.round(num * 100)/100).toFixed(2);
    let formatNum = cellFormat?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return formatNum;
  }
  const classes = useStyles();
  const cellInfo = map(columns, ({ data_field, align, formatter, fontWeight, nowrap }) => ({ data_field, align, formatter, fontWeight, nowrap
   }));

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="table-component">
        <TableHeader headers={columns} brand={brand}/>
        <TableBody>{data.length > 0 ? data.map((row, index) => {
              let startIndex = 1; 

              if (!page) {
                startIndex = 1
              } else {
                startIndex = (page - 1) * page_size + 1
              }

              return (
                <TableRowComponent
                  indexRow={startIndex + index}
                  key={`${row?.game_code ?? row?.brand_id}_${index}`}
                  rowData={row}
                  cellInfo={cellInfo}
                />
              )
            }) : <TableRow>
                  <TableCell component="th" scope="row">
                    "No result found"
                  </TableCell>
                </TableRow>
          }
          { dataType === 'BusinessSummary' && 
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
                  className={classes.tableCellBody}
                >
                  {dataSum?.new_players}
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
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {dataSum?.players_played}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {dataSum?.play_sessions}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {formatNumber(dataSum?.operator_total)}
                </TableCell>
                {roleUser === 'admin' || roleUser === 'adminsub' ?
                    <TableCell 
                      sx={{
                        padding: 1,
                        // color: '#fff'
                      }} 
                      align="right"
                      style={{ fontWeight: '600' }} 
                      className={classes.tableCellBody}>
                      {formatNumber(dataSum?.company_total)}
                    </TableCell>
                  : 
                    <TableCell 
                      sx={{
                        padding: 1,
                        // color: '#fff'
                      }} 
                      align="right"
                      style={{ fontWeight: '600' }} 
                      className={classes.tableCellBody}>
                    </TableCell>
                }
              </TableRow>
              <TableRow style={{ background: '#e3f2fd' }}>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }}
                  className={classes.tableCellBody} 
                  component="th"
                  align="right"
                  style={{ fontWeight: '600' }}  
                  scope="row"
                >
                  Average:
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }}
                  className={classes.tableCellBody}
                >
                  {dataAverage?.new_players}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }}
                  className={classes.tableCellBody}
                >
                  {formatNumber(dataAverage?.bet)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }}
                  className={classes.tableCellBody}
                >
                  {formatNumber(dataAverage?.win)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }}
                  className={classes.tableCellBody}
                >
                  {formatNumber(dataAverage?.margin)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }}
                  className={classes.tableCellBody}
                >
                  {dataAverage?.players_played}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }}
                  className={classes.tableCellBody}
                >
                  {dataAverage?.play_sessions}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }}
                  className={classes.tableCellBody}
                >
                  {formatNumber(dataAverage?.operator_total)}
                </TableCell>
                {roleUser === 'admin' || roleUser === 'adminsub' ?
                    <TableCell 
                      sx={{
                        padding: 1,
                        // color: '#fff'
                      }} 
                      align="right"
                      style={{ fontWeight: '600' }}
                      className={classes.tableCellBody}
                    >
                      {formatNumber(dataAverage?.company_total)}
                    </TableCell>
                  :
                    <TableCell 
                      sx={{
                        padding: 1,
                        // color: '#fff'
                      }} 
                      align="right"
                      style={{ fontWeight: '600' }}
                      className={classes.tableCellBody}
                    >
                    </TableCell>
                }
              </TableRow>
            </>
          }
          { dataType === 'PlayerSummary' && 
            <>
              <TableRow style={{ background: '#e3f2fd' }}>
                <TableCell 
                  component="th" 
                  scope="row" 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }}
                  colSpan={4}
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
                  className={classes.tableCellBody}
                >
                  {formatNumber(dataSum?.bet_native)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {formatNumber(dataSum?.win_native)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {formatNumber(dataSum?.margin_native)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {dataSum?.players_played}
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
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {formatNumber(dataSum?.operator_total)}
                </TableCell>
                {roleUser === 'admin' || roleUser === 'adminsub' ?
                  <TableCell 
                    sx={{
                      padding: 1,
                      // color: '#fff'
                    }} 
                    align="right"
                    style={{ fontWeight: '600' }} 
                    className={classes.tableCellBody}>
                    {formatNumber(dataSum?.company_total)}
                  </TableCell>
                : 
                  <TableCell 
                    sx={{
                      padding: 1,
                      // color: '#fff'
                    }} 
                    align="right"
                    style={{ fontWeight: '600' }} 
                    className={classes.tableCellBody}>
                  </TableCell>
                }
              </TableRow>
            </>
          }
          { dataType === 'PlayersBusinessSummary' && 
            <>
              <TableRow style={{ background: '#e3f2fd' }}>
                <TableCell 
                  component="th" 
                  scope="row" 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }}
                  colSpan={5}
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
                  className={classes.tableCellBody}
                >
                  {formatNumber(dataSum?.bet_native)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {formatNumber(dataSum?.win_native)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {formatNumber(dataSum?.margin_native)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1,
                    // color: '#fff'
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {dataSum?.players_played}
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

TableComponent.propTypes = {
  data: array.isRequired,
  columns: array.isRequired,
  pagination: object
};

TableComponent.defaultProps = {
  pagination: {}
};

export default TableComponent;
