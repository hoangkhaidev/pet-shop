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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    padding: '0',
    boxShadow: 'unset'
  },
  tableHeader: {
  },
  tableCellHeader: {
    fontWeight: '600 !important',
    color: "black",
    border: '1px solid #c8ced3',
  },
  tableCellBody: {
    minWidth: 150,
    backgroundColor: '#f2f2f2',
    border: '1px solid #c8ced3',
    '&:MuiChip-label MuiChip-labelSmall css-wjsjww-MuiChip-label': {
      color: '#fff'
    }
  },
  rootTable: {
    boxShadow: 'unset', 
    padding: '0',
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

  return (
    <StyledTableRow align={cellInfo.align}>
      {cellInfo.map((info, index) => {
        return (
          <TableCell
            sx={{
              padding: 1
            }}
            className={classes.tableCellBody}
            key={index}
            align={info.align ? info.align : "left"}
          >
            {info.formatter ? (
              info.formatter(rowData[info.data_field], rowData)
            ) : (
              info.data_field === 'indexRow' ? indexRow + 1 : rowData[info.data_field]
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

const TableComponentStatus = ({
  data, columns
}) => {
  const classes = useStyles();
  const cellInfo = map(columns, ({ data_field, align, formatter, fontWeight }) => ({ data_field, align, formatter, fontWeight
   }));

  return (
    <TableContainer component={Paper}  className={classes.rootTable}>
      <Table className={classes.table} aria-label="table-component">
        <TableHeader headers={columns.map(item => item.column_name)} />
        <TableBody>{ data.length > 0 ? data.map((row, index) => {
            return (
              <TableRowComponent indexRow={index} key={index} rowData={row} cellInfo={cellInfo} />
            )
          }) : <TableRow>
                <TableCell component="th" scope="row">
                  "No result found"
                </TableCell>
              </TableRow>
        }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableComponentStatus.propTypes = {
  data: array,
  columns: array.isRequired,
  pagination: object
};

TableComponentStatus.defaultProps = {
  pagination: {}
};

export default TableComponentStatus;
