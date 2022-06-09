/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import HttpsIcon from '@mui/icons-material/Https';

const useStyles = makeStyles(() => ({
  noPermissionWrap: {
    textAlign: "center",
    justifyContent: 'center'
  }
}));

const NoPermissionPage = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onGoback = () => {
    // navigate("/");
    navigate(-5);
  };

  return (
    <Box>
      <MainCard sx={{justifyContent: 'center'}}>
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
      </MainCard>
    </Box>
  );
};

export default NoPermissionPage;
