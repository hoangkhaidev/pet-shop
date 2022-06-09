/* eslint-disable prettier/prettier */
import { Box } from "@mui/system";
import { node, any } from "prop-types";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: node,
  index: any.isRequired,
  value: any.isRequired,
};

export default TabPanel;
