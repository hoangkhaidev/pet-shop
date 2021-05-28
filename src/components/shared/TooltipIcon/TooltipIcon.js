import { memo } from "react";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import { string, node, func } from 'prop-types';

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

const TooltipIcon = memo(({
  IconComponent, title, arialLabel, onClick,
  color
}) => {
  const classes = useStyles();

  return (
    <div>
      <Tooltip title={title}>
        <IconButton onClick={onClick} color={color} aria-label={arialLabel}>
          {IconComponent}
        </IconButton>
      </Tooltip>
    </div>
  );
});

TooltipIcon.propTypes = {
  title: string.isRequired,
  arialLabel: string,
  IconComponent: node.isRequired,
  onClick: func,
  color: string
};

TooltipIcon.defaultProps = {
  arialLabel: "",
  onClick: () => {},
  color: "primary"
};

export default TooltipIcon;
