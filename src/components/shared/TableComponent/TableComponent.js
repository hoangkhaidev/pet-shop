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
import moment from "moment";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  tableHeader: {
    backgroundColor: "#5664d2",
  },
  tableCellHeader: {
    fontWeight: '600 !important',
    color: "#ffffff !important"
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

const TableHeader = ({ headers }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <TableHead className={classes.tableHeader}>
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
  let newAt = moment(rowData.at).format("DD/MM/YY, hh:mm a");
  rowData.at = newAt; 
  return (
    <StyledTableRow align={cellInfo.align}>
      {cellInfo.map((info, index) => {
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
  // eslint-disable-next-line react/prop-types
  data, roleUser , dataType = null, dataSum = {}, dataAverage = {}, columns, pagination, handleChangePage, handleChangeRowsPerPage, types, page, page_size
}) => {
  const formatNumber = (num) => {
    let cellFormat = (Math.round(num * 100)/100).toFixed(2);
    let formatNum = cellFormat?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return formatNum;
  }
  const classes = useStyles();
  // eslint-disable-next-line camelcase
  const cellInfo = map(columns, ({ data_field, align, formatter, fontWeight }) => ({ data_field, align, formatter, fontWeight
   }));

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="table-component">
        <TableHeader headers={columns.map(item => item.column_name)} />
        <TableBody>{data.length > 0 ? data.map((row, index) => {
              // console.log(row);
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
          { dataType === 'BusinessSummary' && 
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
                  className={classes.tableCellBody}
                >
                  {dataSum?.new_players}
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
                <TableCell 
                  sx={{
                    padding: 1
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {dataSum?.players_played}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {dataSum?.play_sessions}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {formatNumber(dataSum?.operator_total)}
                </TableCell>
                {roleUser === 'admin' ?
                    <TableCell 
                      sx={{
                        padding: 1
                      }} 
                      align="right"
                      style={{ fontWeight: '600' }} 
                      className={classes.tableCellBody}>
                      {formatNumber(dataSum?.company_total)}
                    </TableCell>
                  : 
                    <TableCell 
                      sx={{
                        padding: 1
                      }} 
                      align="right"
                      style={{ fontWeight: '600' }} 
                      className={classes.tableCellBody}>
                    </TableCell>
                }
              </TableRow>
              <TableRow style={{ background: '#07bb5f' }}>
                <TableCell 
                  sx={{
                    padding: 1
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
                    padding: 1
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }}
                  className={classes.tableCellBody}
                >
                  {dataAverage?.new_players}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }}
                  className={classes.tableCellBody}
                >
                  {formatNumber(dataAverage?.bet)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }}
                  className={classes.tableCellBody}
                >
                  {formatNumber(dataAverage?.win)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }}
                  className={classes.tableCellBody}
                >
                  {formatNumber(dataAverage?.margin)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }}
                  className={classes.tableCellBody}
                >
                  {dataAverage?.players_played}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }}
                  className={classes.tableCellBody}
                >
                  {dataAverage?.play_sessions}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }}
                  className={classes.tableCellBody}
                >
                  {formatNumber(dataAverage?.operator_total)}
                </TableCell>
                {roleUser === 'admin' ?
                    <TableCell 
                      sx={{
                        padding: 1
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
                        padding: 1
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
              <TableRow style={{ background: '#07bb5f' }}>
                <TableCell 
                  component="th" 
                  scope="row" 
                  sx={{
                    padding: 1
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
                    padding: 1
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}
                >
                  {formatNumber(dataSum?.bet_native)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {formatNumber(dataSum?.win_native)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {formatNumber(dataSum?.margin_native)}
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                </TableCell>
                <TableCell 
                  sx={{
                    padding: 1
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {dataSum?.players_played}
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
                <TableCell 
                  sx={{
                    padding: 1
                  }} 
                  align="right"
                  style={{ fontWeight: '600' }} 
                  className={classes.tableCellBody}>
                  {formatNumber(dataSum?.operator_total)}
                </TableCell>
                {roleUser === 'admin' ?
                  <TableCell 
                    sx={{
                      padding: 1
                    }} 
                    align="right"
                    style={{ fontWeight: '600' }} 
                    className={classes.tableCellBody}>
                    {formatNumber(dataSum?.company_total)}
                  </TableCell>
                : 
                  <TableCell 
                    sx={{
                      padding: 1
                    }} 
                    align="right"
                    style={{ fontWeight: '600' }} 
                    className={classes.tableCellBody}>
                  </TableCell>
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

TableComponent.propTypes = {
  data: array.isRequired,
  columns: array.isRequired,
  pagination: object
};

TableComponent.defaultProps = {
  pagination: {}
};

export default TableComponent;
