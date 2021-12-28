import { Grid, makeStyles } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
// Data
const useStyles = makeStyles((theme) => ({
  divContainer: {
    height: '135px',
    background: '#fff',
    borderRadius: '15px',
    padding: '0 20px',
    boxShadow: '#ddd 0px 5px 5px -3px, #ddd 0px 3px 14px 2px',
  },
  divItem: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '15px',
    paddingBottom: '20px',
    position: 'relative',
  },
  divLine: {
    height: '1px',
    background: '#eee',
  },
  title1: {
    color: '#9397ac',
    fontSize: '14px',
  },
  totalTitle: {
    fontWeight: '600',
    fontSize: '26px',
    paddingTop: '5px',
    color: '#344767',
  },
  titleNum: {
    color: 'green',
    fontWeight: '600',
    fontSize: '14px',
  },
  title2: {
    color: '#88898f',
    fontSize: '14px',
  },
  boxImage: {
    width: '64px',
    height: '64px',
    borderRadius: '15px',
    position: 'absolute',
    top: '-15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  
}));

function TitleDashboard() {
  const classes = useStyles();
  return (
    <Grid container spacing={2} style={{paddingBottom: '20px'}}>
        <Grid item xs={6} xl={3} md={3}>
          <div className={classes.divContainer}>
            <div className={classes.divItem}>
              <div className={classes.boxImage} style={{background: '#37373d'}}>
                <FontAwesomeIcon 
                  style={{width: '23px', height: '23px'}}
                  icon={faCouch} 
                  color={'#fff'} 
                  title={'Change status'} 
                />
              </div>
              <div></div>
              <div style={{textAlign: 'right'}}>
                <span className={classes.title1}>Bookings</span>
                <div className={classes.totalTitle}>
                  281
                </div>
              </div>
            </div>
            <div className={classes.divLine}></div>
            <div className={classes.divItem}>
              <div>
                <span className={classes.titleNum}>+55%</span>
                <span className={classes.title2}> than lask week</span>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} xl={3} md={3}>
        <div className={classes.divContainer}>
            <div className={classes.divItem}>
              <div className={classes.boxImage} style={{background: '#3892ee'}}>
                <FontAwesomeIcon 
                  icon={faChartBar} 
                  color={'#fff'} 
                  style={{width: '23px', height: '23px'}}
                  title={'Change status'} 
                />
              </div>
              <div></div>
              <div style={{textAlign: 'right'}}>
                <span className={classes.title1}>Bookings</span>
                <div className={classes.totalTitle}>
                  281
                </div>
              </div>
            </div>
            <div className={classes.divLine}></div>
            <div className={classes.divItem}>
              <div>
                <span className={classes.titleNum}>+55%</span>
                <span className={classes.title2}> than lask week</span>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} xl={3} md={3}>
        <div className={classes.divContainer}>
            <div className={classes.divItem}>
              <div className={classes.boxImage} style={{background: '#5ab25e'}}>
                <FontAwesomeIcon 
                  icon={faStore} 
                  color={'#fff'} 
                  style={{width: '23px', height: '23px'}}
                  title={'Change status'} 
                />
              </div>
              <div></div>
              <div style={{textAlign: 'right'}}>
                <span className={classes.title1}>Bookings</span>
                <div className={classes.totalTitle}>
                  281
                </div>
              </div>
            </div>
            <div className={classes.divLine}></div>
            <div className={classes.divItem}>
              <div>
                <span className={classes.titleNum}>+55%</span>
                <span className={classes.title2}> than lask week</span>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} xl={3} md={3}>
        <div className={classes.divContainer}>
            <div className={classes.divItem}>
              <div className={classes.boxImage} style={{background: '#e3306e'}}>
                <FontAwesomeIcon 
                  icon={faUserPlus} 
                  color={'#fff'} 
                  style={{width: '23px', height: '23px'}}
                  title={'Change status'} 
                />
              </div>
              <div></div>
              <div style={{textAlign: 'right'}}>
                <span className={classes.title1}>Bookings</span>
                <div className={classes.totalTitle}>
                  281
                </div>
              </div>
            </div>
            <div className={classes.divLine}></div>
            <div className={classes.divItem}>
              <div>
                <span className={classes.titleNum}>+55%</span>
                <span className={classes.title2}> than lask week</span>
              </div>
            </div>
          </div>
        </Grid>
    </Grid>
  );
}

export default TitleDashboard;
