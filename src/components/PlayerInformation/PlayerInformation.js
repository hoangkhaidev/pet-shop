import { Button, makeStyles } from "@material-ui/core";
// import PersonIcon from '@material-ui/icons/Person';
import Grid from "@material-ui/core/Grid";
import ClearAllIcon from '@material-ui/icons/ClearAll';
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import { useNavigate } from "react-router";
import useFetchData from "src/utils/hooks/useFetchData";
import { useEffect, useState } from "react";
import useRouter from "src/utils/hooks/useRouter";
import NoPermissionPage from "../NoPermissionPage/NoPermissionPage";
import Loading from "../shared/Loading/Loading";

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
    // justifyContent: "space-between"
  },
  labelLine: {
    fontWeight: "bold",
    width: '40%',
  },
  w50: {
    width: '60%',
    lineBreak: 'anywhere',
  }
 
}));

const PlayerInformation = () => {
  const classes = useStyles();
  const router = useRouter();

  const { dataResponse, isLoading, isHasPermission } = useFetchData(
    `/api/members/${router.query?.id}`,
    null
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataResponse);
  }, [dataResponse]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const navigate = useNavigate();
  const onCancel = () => {
    navigate('/players/players');
  }

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <>
      <Button
        startIcon={<ClearAllIcon fontSize="small" />}
        variant="contained"
        type="button"
        color="secondary"
        onClick={() => onCancel()}
        sx={{
          ml: 1
        }}
      >
        Back
      </Button>
      <ContentCardPage>
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
                  {data?.brand_id} 
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
                  Instant client, Chrome 90.0.4430, iOS
                </span>
              </div>
          </Grid>
        </Grid>
        {isLoading && <Loading />}
      </ContentCardPage>
    </>
  );
};

export default PlayerInformation;
