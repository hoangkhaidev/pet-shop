import { makeStyles } from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import Grid from "@material-ui/core/Grid";

import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";

const useStyles = makeStyles(() => ({
  playerInfoName: {
    display: "flex",
    alignItems: "center"
  },
  playerNameDisplay: {
    textTransform: "uppercase",
    marginLeft: 16,
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
    justifyContent: "space-between"
  },
  labelLine: {
    fontWeight: "bold",
  }
}));

const player_common_info = {
  player_id: {
    label: "Player ID",
    info: "2427465"
  },
  nickname: {
    label: "Nickname",
    info: "tri7_sinh"
  },
  casino_brand: {
    label: "Casino / Brand",
    info: "tri7"
  }
};

const player_system_info = {
  signup: {
    label: "Sign UP",
    info: "5 May 2021 17:06:00"
  },
  currency: {
    label: "Currency",
    info: "IDR"
  },
  language: {
    label: "Language",
    info: "English"
  },
  country: {
    label: "Country",
    info: "Vietnam"
  }
};

const last_login_info = {
  last_login_time: {
    label: "Last Login Time",
    info: "5 May 2021 17:06:00"
  },
  last_login_ip: {
    label: "Last Login IP",
    info: "118.69.55.180"
  },
  last_login_country: {
    label: "Last Login Country",
    info: "Vietnam"
  },
  last_login_client_information: {
    label: "Last Login Client Information",
    info: "Instant client, Chrome 90.0.4430, iOS"
  }
};

const PlayerInformation = () => {
  const classes = useStyles();

  return (
    <ContentCardPage>
      <div className={classes.playerInfoName}>
        <PersonIcon />
        <span className={classes.playerNameDisplay}>
          SON1234
        </span>
      </div>
      <Grid className={classes.infoContainer} sx={{ mt: 1 }} container spacing={2}>
        <Grid className={classes.infoColumn} item xs={12} xl={4} md={6}>
          {Object.keys(player_common_info).map(key => (
            <div className={classes.infoLine}>
              <span className={classes.labelLine}>
                {player_common_info[key].label}
              </span>
              <span>
                {player_common_info[key].info}
              </span>
            </div>
          ))}
        </Grid>
        <Grid className={classes.infoColumn} item xs={12} xl={4} md={6}>
          {Object.keys(player_system_info).map(key => (
            <div className={classes.infoLine}>
              <span className={classes.labelLine}>
                {player_system_info[key].label}
              </span>
              <span>
                {player_system_info[key].info}
              </span>
            </div>
          ))}
        </Grid>
        <Grid className={classes.infoColumn} item xs={12} xl={4} md={6}>
          {Object.keys(last_login_info).map(key => (
            <div className={classes.infoLine}>
              <span className={classes.labelLine}>
                {last_login_info[key].label}
              </span>
              <span>
                {last_login_info[key].info}
              </span>
            </div>
          ))}
        </Grid>
      </Grid>
    </ContentCardPage>
  );
};

export default PlayerInformation;
