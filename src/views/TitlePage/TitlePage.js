/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { string } from "prop-types";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  titleMobile: {
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      margin: '24px !important',
    }
  }
}));

const TitlePage = ({ title }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Typography variant="h3" gutterBottom className={classes.titleMobile}>
      {t(title)}
    </Typography>
  );
};

TitlePage.propTypes = {
  title: string.isRequired,
};

export default TitlePage;
