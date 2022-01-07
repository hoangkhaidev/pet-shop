import { Grid, Link, makeStyles } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
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

function TitleDashboard({dataResponse}) {
  const classes = useStyles();

  const formatNumber = (num) => {
    let cellFormat = (Math.round(num * 100)/100).toFixed(2);
    let formatNum = cellFormat?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return formatNum;
  }

  const roleUserType = useSelector((state) => state.roleUser.account_type);
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionBrand = {};
  let arrPermissionPlayers = {};
  let arrPermissionGames = {};
  let checkPermissionFail = false;
  permission_groups.map((item) => {
    if (item.name === 'Brand') {
      arrPermissionBrand = item.permissions[0];
    }
    if (item.name === 'Players') {
      arrPermissionPlayers = item.permissions[0];
    }
    if (item.name === 'Global') {
      item.permissions?.map((item2) => {
        if (item2.name === 'Failed Transaction') checkPermissionFail = item2.none;
        return item2.name === 'Failed Transaction';
      });
    }
    if (item.name === 'Configuration') {
      arrPermissionGames = item.permissions[0];
    }
    
    return item.name === 'Brand'
  });

  return (
    <Grid container spacing={2} >
      {
        roleUserType !== 'brand' && roleUserType !== 'brandsub' ? 
          !arrPermissionBrand?.none ? (
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
                    <span className={classes.title1}>Brands</span>
                    <div className={classes.totalTitle}>
                      {dataResponse?.number_of_accounts}
                    </div>
                  </div>
                </div>
                <div className={classes.divLine}></div>
                <div className={classes.divItem}>
                  <div>
                    <span className={classes.title2}> 
                      Go to <span className={classes.titleNum}><Link href={`/brand/list`}>Brand List</Link></span>
                    </span>
                  </div>
                </div>
              </div>
            </Grid>
          ) : ''
        : ''
      }
      {
        !arrPermissionPlayers?.none && !arrPermissionBrand?.none ? (
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
                    {dataResponse?.number_of_players}
                  </div>
                </div>
              </div>
              <div className={classes.divLine}></div>
              <div className={classes.divItem}>
                <div>
                  <span className={classes.title2}> 
                    Go to 
                    <span className={classes.titleNum}><Link href={`/players/players`}> Player List</Link></span>
                  </span>
                  
                </div>
              </div>
            </div>
          </Grid>
        ) : ''
      }
      {
        !checkPermissionFail && (
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
                    {dataResponse?.number_of_fail_transactions}
                  </div>
                </div>
              </div>
              <div className={classes.divLine}></div>
              <div className={classes.divItem}>
                <div>
                  <span className={classes.title2}> 
                    Go to 
                    <span className={classes.titleNum}><Link href={`/global/failed_transaction`}> Fail Transaction List</Link></span>
                  </span>
                </div>
              </div>
            </div>
          </Grid>
        )
      }
      {
        roleUserType === 'operator' || roleUserType === 'operatorsub' || roleUserType === 'brand' || roleUserType === 'brandsub' ? (
          <>
            {
              !arrPermissionBrand?.none && !arrPermissionGames?.none ? (
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
                          {dataResponse?.number_of_games}
                        </div>
                      </div>
                    </div>
                    <div className={classes.divLine}></div>
                    <div className={classes.divItem}>
                      <div>
                        <span className={classes.title2}> 
                          Go to 
                          <span className={classes.titleNum}><Link href={`/configuration/games`}> Game List</Link></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Grid>
              ) : ''
            }
            {
              !arrPermissionBrand?.none && !arrPermissionPlayers?.none && !arrPermissionGames?.none ? (
                <>
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
                          <span className={classes.title1}>Game Most Players</span>
                          <div className={classes.totalTitle}>
                            {dataResponse?.highest_player_name}
                          </div>
                        </div>
                      </div>
                      <div className={classes.divLine}></div>
                      <div className={classes.divItem}>
                        <div>
                          <span className={classes.titleNum}>Games has "{dataResponse?.highest_player_count}" Players </span>
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
                          <span className={classes.title1}>Top BET Player</span>
                          <div className={classes.totalTitle}>
                            <Link href={`/players/${dataResponse?.highest_bet_member_id}/information`}> {dataResponse?.highest_bet_member_name}</Link>
                          </div>
                        </div>
                      </div>
                      <div className={classes.divLine}></div>
                      <div className={classes.divItem}>
                        <div>
                          <span className={classes.titleNum}>Player has BET: {formatNumber(dataResponse?.highest_bet_total)}</span>
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
                            <Link href={`/players/${dataResponse?.highest_bet_member_id}/information`}> {dataResponse?.highest_win_member_name}</Link>
                          </div>
                        </div>
                      </div>
                      <div className={classes.divLine}></div>
                      <div className={classes.divItem}>
                        <div>
                          <span className={classes.titleNum}>Player has Win: {formatNumber(dataResponse?.highest_win_total)}</span>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </>
              ) : ''
            }
            
          </>
        ) : ''
      }  

        
    </Grid>
  );
}

export default TitleDashboard;
