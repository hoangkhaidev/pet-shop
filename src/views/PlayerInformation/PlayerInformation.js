/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { makeStyles } from '@mui/styles';
import { clearPage, setPageName } from 'features/parentParam/parentParam';
import { Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { BackButton } from 'views/Button/Button';

const useStyles = makeStyles(() => ({
  playerInfoName: {
    display: "flex",
    alignItems: "center"
  },
  playerNameDisplay: {
    textTransform: "uppercase",
    marginLeft: 16,
    marginRight: '5px',
    fontWeight: "bold"
  },
  profileNameDisplay: {
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
  },
  labelLine: {
    fontWeight: "bold",
    width: '40%',
  },
  w50: {
    width: '60%',
    lineBreak: 'anywhere',
  },
  titleTransaction: {
    fontWeight: '600 !important',
  }
 
}));

const PlayerInformation = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionPlayers = {};
  permission_groups.map((item) => {
    if (item.name === 'Players') {
      arrPermissionPlayers = item.permissions;
    }
    return item.name === 'Players'
  });

  const parentParam = useSelector((state) => state.parentParam.parentParam);

  const navigate = useNavigate();

  const onCancel = () => {
    navigate(parentParam);
  }

  useEffect(() => {
    document.title = 'Player Information';
  }, []);

  useEffect(() => {
    dispatch(setPageName("player_info"));
    return () => {
      dispatch(clearPage());
    }
  }, []);

  if (arrPermissionPlayers[0]?.none) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      <div style={{ padding: '25px' }}>
        <Typography 
          variant="h3" 
          gutterBottom 
          className={classes.titleTransaction}
        >
          Player Information
        </Typography>
        <BackButton
          text="Back"
          onAction={() => onCancel()}
        />
        <MainCard>
          <div className={classes.playerInfoName}>
            <span className={classes.profileNameDisplay}>
              Profile:
            </span>
            <span className={classes.playerNameDisplay}>
              {data?.id}  
            </span>
            <span> ({data?.username}, signed up {data?.created_at})</span>
          </div>
          <Grid className={classes.infoContainer} sx={{ mt: 1 }} container spacing={3}>
            <Grid className={classes.infoColumn} item xs={12} xl={4} md={4}>
                <div className={classes.infoLine}>
                  <span className={classes.labelLine}>
                    Player ID
                  </span>
                  <span className={classes.w50}>
                    {data?.id} 
                  </span>
                </div>
                <div className={classes.infoLine}>
                  <span className={classes.labelLine}>
                    Nickname
                  </span>
                  <span className={classes.w50}>
                    {data?.username} 
                  </span>
                </div>
                <div className={classes.infoLine}>
                  <span className={classes.labelLine}>
                    Brand
                  </span>
                  <span className={classes.w50}>
                    {data?.brand_name} 
                  </span>
                </div>
            </Grid>
            <Grid className={classes.infoColumn} item xs={12} xl={4} md={4}>
                <div className={classes.infoLine}>
                  <span className={classes.labelLine}>
                    Sign Up
                  </span>
                  <span className={classes.w50}>
                    {data?.created_at}
                  </span>
                </div>
                <div className={classes.infoLine}>
                  <span className={classes.labelLine}>
                    Currency
                  </span>
                  <span className={classes.w50}>
                    {data?.currency_code}
                  </span>
                </div>
                <div className={classes.infoLine}>
                  <span className={classes.labelLine}>
                    Language
                  </span>
                  <span className={classes.w50}>
                    {data?.language}
                  </span>
                </div>
                <div className={classes.infoLine}>
                  <span className={classes.labelLine}>
                    Country
                  </span>
                  <span className={classes.w50}>
                    {data?.country}
                  </span>
                </div>
            </Grid>
            <Grid className={classes.infoColumn} item xs={12} xl={4} md={4}>
                <div className={classes.infoLine}>
                  <span className={classes.labelLine}>
                    Last Login Time
                  </span>
                  <span className={classes.w50}>
                    {data?.last_logged_in}
                  </span>
                </div>
                <div className={classes.infoLine}>
                  <span className={classes.labelLine}>
                    Last Login IP
                  </span>
                  <span className={classes.w50}>
                    {data?.last_logged_ip}
                  </span>
                </div>
                <div className={classes.infoLine}>
                  <span className={classes.labelLine}>
                    Last Login Country
                  </span>
                  <span className={classes.w50}>
                    {data?.last_logged_in_country}
                  </span>
                </div>
                <div className={classes.infoLine}>
                  <span className={classes.labelLine}>
                    Last Login Client Information
                  </span>
                  <span className={classes.w50}>
                    {data?.last_logged_in_info}
                  </span>
                </div>
            </Grid>
          </Grid>
        </MainCard>
      </div>
    </>
  );
};

export default PlayerInformation;
