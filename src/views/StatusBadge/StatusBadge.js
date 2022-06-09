/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { memo } from "react";
import { string } from "prop-types";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import { Chip } from "@mui/material";
import { capitalize } from "lodash";

const colors = {
  primary: '#14ca50',
  danger: '#ff1744',
  labelTab: '#0edec2',
  warning: '#ffc107',
  success: '#28a745',
  Inactivate: '#6e858e',
  plus: '#e3f2fd',
};

const colorDefine = {
  Inactive: {
    color: colors.Inactivate
  },
  Active: {
    color: colors.primary
  },
  Locked: {
    color: colors.danger
  },
  Suspended: {
    color: colors.warning
  }
};

const useStyles = makeStyles(() => ({
  labelBadge: {
    fontWeight: "bold",
  }
}));

const StatusBadge = memo(({
  label,
  colorText,
  onClick
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Chip
      size="small"
      label={capitalize(t(label))}
      style={{
        backgroundColor: colorText ? '#e3f2fd' : `${colorDefine[label]?.color}`
      }}
      sx={{ m: 0.25 }}
      classes={{
        root: classes.labelBadge
      }}
      onClick={onClick}
    />
  );
});

StatusBadge.propTypes = {
  label: string.isRequired
};

export default StatusBadge;
