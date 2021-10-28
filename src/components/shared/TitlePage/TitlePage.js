import { string } from "prop-types";
import Typography from '@material-ui/core/Typography';
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core";

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
    <Typography variant="h5" gutterBottom className={classes.titleMobile}>
      {t(title)}
    </Typography>
  );
};

TitlePage.propTypes = {
  title: string.isRequired,
};

export default TitlePage;
