/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { func, string } from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';

const useStyles = makeStyles(() => ({
  buttonGroup: {
    margin: '16px 0',
    display: 'flex',
    alignItems: 'center',
    float: 'right',
  },
  buttonGroupTable: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
  },
}));

export const SubmitButton = ({text = "Submit", onClick, clickRef, disabled}) => {
  return (
    <Button
      variant="contained"
      type="submit"
      color="primary"
      ref={clickRef}
      disabled={disabled}
      onClick={
        onClick ? () => onClick() : null
      }
    >
      {text}
    </Button>
  );
}

export const BackButton = ({
  onAction, text
}) => (
  <Button
    startIcon={<ArrowBackIcon fontSize="small" />}
    variant="contained"
    type="button"
    onClick={onAction}
    sx={{mb: '15px', marginLeft: 'auto', display: 'flex', backgroundColor: 'rgb(128,128,128)'}}
  >
    {text}
  </Button>
);

export const CancelButton = ({
  onAction, text
}) => (
  <Button
    variant="contained"
    type="button"
    onClick={onAction}
    sx={{
      ml: 1,
      backgroundColor: 'rgb(128,128,128)',
      '&:hover': {
        backgroundColor: '#4F4F4F'
      }
    }}
  >
    {text}
  </Button>
);

export const ResetButton = ({
  onAction, text
}) => (
  <Button
    startIcon={<RotateLeftIcon fontSize="small" />}
    variant="contained"
    type="button"
    color="error"
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

export const ButtonGroupTable = ({
  // eslint-disable-next-line react/prop-types
  children
}) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.buttonGroupTable}>
        {children}
      </div>
      <div className="clearfix" />
    </>
  );
};

const ButtonGroup = ({
  // eslint-disable-next-line react/prop-types
  children
}) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.buttonGroup}>
        {children}
      </div>
      <div className="clearfix" />
    </>
  );
};

export default ButtonGroup;



