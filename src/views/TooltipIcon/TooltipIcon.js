/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import { memo } from "react";
import { string, node, func } from 'prop-types';
import { IconButton, Tooltip } from "@mui/material";

const TooltipIcon = memo(({
  IconComponent, title, arialLabel, onClick,
  color
}) => {
  return (
    <div>
      <Tooltip title={title}>
        <IconButton style={{ marginRight: 0 }} onClick={onClick} color={color} aria-label={arialLabel}>
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
