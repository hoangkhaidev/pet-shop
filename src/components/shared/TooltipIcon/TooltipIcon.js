import { memo } from "react";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from "@material-ui/core/Tooltip";
import { string, node, func } from 'prop-types';

const TooltipIcon = memo(({
  IconComponent, title, arialLabel, onClick,
  color
}) => {

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
