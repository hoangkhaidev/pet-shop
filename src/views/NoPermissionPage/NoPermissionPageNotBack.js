/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
import HttpsIcon from '@mui/icons-material/Https';
import { Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import MainCard from 'ui-component/cards/MainCard';

const useStyles = makeStyles(() => ({
  noPermissionWrap: {
    textAlign: "center"
  }
}));

const NoPermissionPageNotBack = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <MainCard>
      <div className={classes.noPermissionWrap}>
        <HttpsIcon color="primary" style={{ fontSize: 40 }} />
        <Typography variant="h4" gutterBottom>
          No Permission
        </Typography>
        <div>
          {t("NoPermissionHelpText")}
        </div>
      </div>
    </MainCard>
  );
};

export default NoPermissionPageNotBack;
