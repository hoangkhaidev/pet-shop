/* eslint-disable arrow-body-style */
import { memo } from "react";
import { string } from "prop-types";
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from "react-i18next";
import capitalize from "lodash/capitalize";

import { colors } from "src/utils/styles";

const colorDefine = {
  Inactivate: {
    color: colors.Inactivate
  },
  Activate: {
    color: colors.primary
  },
  Lock: {
    color: colors.danger
  },
  Suspend: {
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
  onClick
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Chip
      size="small"
      label={capitalize(t(label))}
      style={{
        backgroundColor: `${colorDefine[label]?.color}`
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
