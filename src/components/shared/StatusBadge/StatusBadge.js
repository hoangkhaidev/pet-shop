/* eslint-disable arrow-body-style */
import { memo } from "react";
import { string } from "prop-types";
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from "react-i18next";
import capitalize from "lodash/capitalize";

import { colors } from "src/utils/styles";

const colorDefine = {
  inactive: {
    color: colors.inactive
  },
  active: {
    color: colors.primary
  },
  locked: {
    color: colors.danger
  },
  suspended: {
    color: colors.warning
  }
};

const useStyles = makeStyles(() => ({
  labelBadge: {
    fontWeight: "bold",
  }
}));

const StatusBadge = memo(({
  label
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
    />
  );
});

StatusBadge.propTypes = {
  label: string.isRequired
};

export default StatusBadge;
