import { string } from "prop-types";
import Typography from '@material-ui/core/Typography';
import { useTranslation } from "react-i18next";

const TitlePage = ({ title }) => {
  const { t } = useTranslation();
  return (
    <Typography variant="h5" gutterBottom>
      {t(title)}
    </Typography>
  );
};

TitlePage.propTypes = {
  title: string.isRequired,
};

export default TitlePage;
