import { Grid, Link, makeStyles } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
// Data
const useStyles = makeStyles((theme) => ({
  divContainer: {
    background: '#fff',
    borderRadius: '15px',
    padding: '0 20px',
    marginBottom: '20px',
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
    <Grid container spacing={2} >
        <Grid item xs={6} xl={3} md={3}>
          <div className={classes.divContainer}>
            <div className={classes.divItem}>
              <div className={classes.boxImage} style={{background: '#37373d'}}>
                <FontAwesomeIcon 
                  style={{width: '30px', height: '30px'}}
                  icon={faUsersCog} 
                  color={'#fff'} 
                  title={'Change status'} 
                />
              </div>
              <div></div>
              <div style={{textAlign: 'right'}}>
                <span className={classes.title1}>Brands / Operators</span>
                <div className={classes.totalTitle}>
                  281
                </div>
              </div>
            </div>
            <div className={classes.divLine}></div>
            <div className={classes.divItem}>
              <div>
                
                <span className={classes.title2}> 
                  Go to <span className={classes.titleNum}><Link href={`/brand/list`}>Brand (Operator) List</Link></span> page
                </span>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} xl={3} md={3}>
          <div className={classes.divContainer}>
            <div className={classes.divItem}>
              <div className={classes.boxImage} style={{background: '#3892ee'}}>
                <FontAwesomeIcon 
                  icon={faUsers} 
                  color={'#fff'} 
                  style={{width: '30px', height: '30px'}}
                  title={'Change status'} 
                />
              </div>
              <div></div>
              <div style={{textAlign: 'right'}}>
                <span className={classes.title1}>Total Players</span>
                <div className={classes.totalTitle}>
                  281
                </div>
              </div>
            </div>
            <div className={classes.divLine}></div>
            <div className={classes.divItem}>
              <div>
                <span className={classes.title2}> 
                  Go to 
                  <span className={classes.titleNum}><Link href={`/players/players`}> Player List</Link></span> page
                </span>
                
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} xl={3} md={3}>
          <div className={classes.divContainer}>
            <div className={classes.divItem}>
              <div className={classes.boxImage} style={{background: '#5ab25e'}}>
                <FontAwesomeIcon 
                  icon={faExchangeAlt} 
                  color={'#fff'} 
                  style={{width: '30px', height: '30px'}}
                  title={'Change status'} 
                />
              </div>
              <div></div>
              <div style={{textAlign: 'right'}}>
                <span className={classes.title1}>Failed Transactions</span>
                <div className={classes.totalTitle}>
                  281
                </div>
              </div>
            </div>
            <div className={classes.divLine}></div>
            <div className={classes.divItem}>
              <div>
                <span className={classes.title2}> 
                  Go to 
                  <span className={classes.titleNum}><Link href={`/global/failed_transaction`}> Fail Transaction List</Link></span> page
                </span>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} xl={3} md={3}>
          <div className={classes.divContainer}>
            <div className={classes.divItem}>
              <div className={classes.boxImage} style={{background: '#e3306e'}}>
                <FontAwesomeIcon 
                  icon={faGamepad} 
                  color={'#fff'} 
                  style={{width: '30px', height: '30px'}}
                  title={'Change status'} 
                />
              </div>
              <div></div>
              <div style={{textAlign: 'right'}}>
                <span className={classes.title1}>Total Games</span>
                <div className={classes.totalTitle}>
                  281
                </div>
              </div>
            </div>
            <div className={classes.divLine}></div>
            <div className={classes.divItem}>
              <div>
                <span className={classes.title2}> 
                  Go to 
                  <span className={classes.titleNum}><Link href={`/configuration/games`}> Game List</Link></span> page
                </span>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} xl={3} md={3}>
          <div className={classes.divContainer}>
            <div className={classes.divItem}>
              <div className={classes.boxImage} style={{background: '#37373d'}}>
                <FontAwesomeIcon 
                  icon={faHeart} 
                  color={'#fff'} 
                  style={{width: '30px', height: '30px'}}
                  title={'Change status'} 
                />
              </div>
              <div></div>
              <div style={{textAlign: 'right'}}>
                <span className={classes.title1}>Game most players</span>
                <div className={classes.totalTitle}>
                  281
                </div>
              </div>
            </div>
            <div className={classes.divLine}></div>
            <div className={classes.divItem}>
              <div>
                <span className={classes.titleNum}>Game has highest Players</span>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} xl={3} md={3}>
          <div className={classes.divContainer}>
            <div className={classes.divItem}>
              <div className={classes.boxImage} style={{background: '#3892ee'}}>
                <FontAwesomeIcon 
                  icon={faCrown} 
                  color={'#fff'} 
                  style={{width: '30px', height: '30px'}}
                  title={'Change status'} 
                />
              </div>
              <div></div>
              <div style={{textAlign: 'right'}}>
                <span className={classes.title1}>Top BET player</span>
                <div className={classes.totalTitle}>
                  281
                </div>
              </div>
            </div>
            <div className={classes.divLine}></div>
            <div className={classes.divItem}>
              <div>
                <span className={classes.titleNum}>The player has highest BET</span>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} xl={3} md={3}>
          <div className={classes.divContainer}>
            <div className={classes.divItem}>
              <div className={classes.boxImage} style={{background: '#5ab25e'}}>
                <FontAwesomeIcon 
                  icon={faTrophy} 
                  color={'#fff'} 
                  style={{width: '30px', height: '30px'}}
                  title={'Change status'} 
                />
              </div>
              <div></div>
              <div style={{textAlign: 'right'}}>
                <span className={classes.title1}>Top Winning Player</span>
                <div className={classes.totalTitle}>
                  281
                </div>
              </div>
            </div>
            <div className={classes.divLine}></div>
            <div className={classes.divItem}>
              <div>
                <span className={classes.titleNum}>The player has highest Win</span>
              </div>
            </div>
          </div>
        </Grid>
    </Grid>
  );
}

export default TitleDashboard;
