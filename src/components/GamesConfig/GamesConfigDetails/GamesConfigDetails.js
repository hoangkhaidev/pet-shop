/* eslint-disable no-unused-vars */
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import TitlePage from 'src/components/shared/TitlePage/TitlePage';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import TablePayoutConfiguration from 'src/components/shared/TableComponent/TablePayoutConfiguration';
import TabBetScale from './TabBetScale';

const useStyles = makeStyles(() => ({
  playerInfoName: {
    display: "flex",
    alignItems: "center",
    paddingTop: '20px',
  },
  playerNameDisplay: {
    textTransform: "uppercase",
    marginLeft: 16,
    marginRight: '5px',
    fontWeight: "bold"
  },
  infoContainer: {
    marginTop: 16,
    justifyContent: "space-between"
  },
  infoColumn: {
    display: "flex",
    flexDirection: "column"
  },
  infoLine: {
    display: "flex",
    alignItems: "center",
    marginBottom: '2rem',
    // justifyContent: "space-between"
  },
  labelLine: {
    fontWeight: "bold",
    width: '40%',
  },
  w20: {
    width: '20%',
    textAlign: 'right',
  },
  w80: {
    width: '80%',
    marginLeft: '10px',
  },
  tableConfiguration: {
    display: 'flex',
    paddingTop: '20px',
  }
}));

const GamesConfigDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const onCancel = () => {
    navigate('/configuration/games');
  };

  return (
    <ContentCardPage>
      <TitlePage title="Game Details" />
      <Button
        startIcon={<ClearAllIcon fontSize="small" />}
        variant="contained"
        type="button"
        color="secondary"
        onClick={() => onCancel()}
      >
        Back
      </Button>
      <div className={classes.InfoGameConfig}>
        <div className={classes.playerInfoName}>
          <span className={classes.w20}>
            Game Code:
          </span>
          <span className={classes.w80}> vs15diamond</span>
        </div>
        <div className={classes.playerInfoName}>
          <span className={classes.w20}>
            Game Name:
          </span>
          <span className={classes.w80}> Diamond Strike</span>
        </div>
        <div className={classes.playerInfoName}>
          <span className={classes.w20}>
            Lines:
          </span>
          <span className={classes.w80}> 15</span>
        </div>
        <div className={classes.playerInfoName}>
          <span className={classes.w20}>
            Brand:
          </span>
          <span className={classes.w80}> super88</span>
        </div>
        <div className={classes.playerInfoName}>
          <span className={classes.w20}>
            Participate in PJP:
          </span>
          <span className={classes.w80}> Disabled</span>
        </div>
        <div className={classes.playerInfoName}>
          <span className={classes.w20}>
            Payout Configuration:
          </span>
          <span className={classes.w80}> </span>
        </div>
      </div>
      <div className={classes.tableConfiguration}>
        <span className={classes.w20}></span> 
        <TablePayoutConfiguration />
      </div> 
      <div className={classes.playerInfoName}>
        <span className={classes.w20}>
          Bet Scale Configuration:
        </span>
        <span className={classes.w80}> 
          <Button
            variant="contained"
          >
            Reset to Default
          </Button>
        </span>
      </div>
      <div className={classes.tableConfiguration}>
        <span className={classes.w20}></span> 
        <TabBetScale />
      </div> 
    </ContentCardPage>
  );
};

export default GamesConfigDetails;
