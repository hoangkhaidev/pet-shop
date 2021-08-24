import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    tableDevelopment: {
      fontFamily: 'arial, sans-serif',
      borderCollapse: 'collapse',
      width: '100%',
    },
    tdDevelopment: {
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: '8px',
    }
}));

const TableDevelopmentVariables = () => {
  const classes = useStyles();

  return (
    <>
        <table className={classes.tableDevelopment}>
            <tr>
                <th></th>
                <th style={{ textAlign: 'left' }}>Nickname</th>
                <th style={{ textAlign: 'left' }}>Times</th>
                <th></th>
                <th></th>
            </tr>
            <tr>
                <td style={{ textAlign: 'right', fontWeight: '600', paddingRight: '5px' }} >Always Refund (for bet request)</td>
                <td className={classes.tdDevelopment} style={{ textAlign: 'left' }} >chauminhrau</td>
                <td className={classes.tdDevelopment} style={{ textAlign: 'right' }} >15</td>
                <td className={classes.tdDevelopment} style={{ textAlign: 'center' }} >Submit</td>
                <td className={classes.tdDevelopment} style={{ textAlign: 'center' }} >Reset</td>
            </tr>
            <tr>
                <td style={{ textAlign: 'right', fontWeight: '600', paddingRight: '5px' }} >Always Retry (for result request)</td>
                <td className={classes.tdDevelopment} style={{ textAlign: 'left' }} >chauminhrau</td>
                <td className={classes.tdDevelopment} style={{ textAlign: 'right' }} >15</td>
                <td className={classes.tdDevelopment} style={{ textAlign: 'center' }} >Submit</td>
                <td className={classes.tdDevelopment} style={{ textAlign: 'center' }} >Reset</td>
            </tr>
        </table>
        <table className={classes.tableDevelopment} style={{ marginTop : '2rem' }}>
            <tr>
                <th></th>
                <th style={{ textAlign: 'left' }}>Nickname</th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
            <tr>
                <td style={{ textAlign: 'right', fontWeight: '600', paddingRight: '5px' }} >Always manual refund (for bet request)</td>
                <td colspan="2" className={classes.tdDevelopment} style={{ textAlign: 'left', width: '218px' }} >chauminhrau</td>
                <td className={classes.tdDevelopment} style={{ textAlign: 'center' }} >Submit</td>
                <td className={classes.tdDevelopment} style={{ textAlign: 'center' }} >Reset</td>
            </tr>
            <tr>
                <td style={{ textAlign: 'right', fontWeight: '600', paddingRight: '5px' }} >Always manual retry (for result request)</td>
                <td colspan="2" className={classes.tdDevelopment} style={{ textAlign: 'left', width: '218px' }} >chauminhrau</td>
                <td className={classes.tdDevelopment} style={{ textAlign: 'center' }} >Submit</td>
                <td className={classes.tdDevelopment} style={{ textAlign: 'center' }} >Reset</td>
            </tr>
        </table>
    </>
  );
};

export default TableDevelopmentVariables;
