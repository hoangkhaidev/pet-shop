import { Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AdjustIcon from '@material-ui/icons/Adjust';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { func, string } from 'prop-types';

const useStyles = makeStyles(() => ({
  buttonGroup: {
    margin: '16px 0',
    display: 'flex',
    alignItems: 'center',
    float: 'right'
  }
}));

export const SubmitButton = ({text = "Submit", onClick, clickRef}) => (
  <Button
    startIcon={<AdjustIcon fontSize="small" />}
    variant="contained"
    type="submit"
    color="primary"
    ref={clickRef}
    onClick={onClick ? () => onClick() : null}
  >
    {text}
  </Button>
);

export const ResetButton = ({
  onAction, text
}) => (
  <Button
    startIcon={<ClearAllIcon fontSize="small" />}
    variant="contained"
    type="button"
    color="secondary"
    onClick={onAction}
    sx={{
      ml: 1
    }}
  >
    {text}
  </Button>
);

ResetButton.propTypes = {
  onAction: func,
  text: string,
};

ResetButton.defaultProps = {
  onAction: () => {},
  text: "reset"
};

const ButtonGroup = ({
  // eslint-disable-next-line react/prop-types
  children
}) => {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.buttonGroup}>
        {children}
      </div>
      <div className="clearfix" />
    </Fragment>
  );
};

export default ButtonGroup;
