import { number, func } from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";

import { PER_PAGE_LIST } from "src/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  abc: {
    '& .MuiTablePagination-toolbar.css-11bfvty-MuiToolbar-root-MuiTablePagination-toolbar':{
      float: 'left',
    }
  }
}));

const TablePaginationActions = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

TablePaginationActions.propTypes = {
  count: number.isRequired,
  onPageChange: func,
  page: number,
  rowsPerPage: number,
};

TablePaginationActions.defaultProps = {
  rowsPerPage: 30,
  page: 1,
  onPageChange: () => {}
};

const CustomTablePagination = ({
  count, page, rowsPerPage, onPageChange, handleChangeRowsPerPage
}) => {
  const classes = useStyles();
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          className={classes.abc}
          rowsPerPageOptions={PER_PAGE_LIST}
          colSpan={4}
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          }}
          onPageChange={onPageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  )
}

CustomTablePagination.propTypes = {
  count: number.isRequired,
  onPageChange: func,
  page: number,
  rowsPerPage: number,
  handleChangeRowsPerPage: func
};

CustomTablePagination.defaultProps = {
  rowsPerPage: 30,
  page: 1,
  onPageChange: () => {},
  handleChangeRowsPerPage: () => {}
};

export default CustomTablePagination;
