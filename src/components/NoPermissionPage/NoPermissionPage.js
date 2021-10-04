import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import HttpsIcon from '@material-ui/icons/Https';
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";

const useStyles = makeStyles(() => ({
  noPermissionWrap: {
    textAlign: "center"
  }
}));

const NoPermissionPage = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onGoback = () => {
    navigate("/");
  };

  return (
    <ContentCardPage>
      <div className={classes.noPermissionWrap}>
        <HttpsIcon color="primary" style={{ fontSize: 40 }} />
        <Typography variant="h4" gutterBottom>
          No Permission
        </Typography>
        <div>
          {t("NoPermissionHelpText")}
        </div>
        <Button
          variant="contained"
          onClick={onGoback}
          type="button"
          sx={{
            marginTop: 2
          }}
        >
          Back
        </Button>
      </div>
    </ContentCardPage>
  );
};

export default NoPermissionPage;
