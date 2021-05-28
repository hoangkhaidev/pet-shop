import { node } from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  cardStyle: {
    zIndex: 1,
    overflow: "initial !important"
  }
}));

const ContentCardPage = ({ children }) => {
  const classes = useStyles();

  return (
    <Card className={classes.cardStyle} sx={{ p: 1, mt: 2, mb: 2 }}>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

ContentCardPage.propTypes = {
  children: node.isRequired
};

export default ContentCardPage;
