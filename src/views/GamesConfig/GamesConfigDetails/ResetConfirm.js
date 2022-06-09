/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useCallback } from "react";
import ModalComponent from "views/ModalComponent/ModalComponent";
import TitlePage from "views/TitlePage/TitlePage";
// import TooltipIcon from "src/components/shared/TooltipIcon/TooltipIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  title__text: {
    marginBottom: "1rem",
  },

  title__groupButton: {
      display: "flex",
      justifyContent: "space-evenly",
  },
  btnResetDefault: {
    background: '#d37b17 !important', 
    marginLeft: '115px !important',
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      marginLeft: '0 !important',
    }
  }
}));

const ResetConfirm = ({onResetItem, currency_code }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const resetItem = () => {
    onResetItem();
  }

  return (
    <div>
      <Button
        variant="contained"
        onClick={onOpenModal}
        className={classes.btnResetDefault}
      >
        Reset to Default
      </Button>
      <ModalComponent
        open={open}
        onClose={onClose}
      >
        <div>
          <TitlePage title={'Confirmation'} />
            <div className={classes.title__text}>{`Do you really want to reset bet scales for ${currency_code}?`}</div>
            <div className={classes.title__groupButton} style={{ justifyContent: 'flex-end' }}>
                <Button style={{ marginRight: '10px' }} variant="contained" color="primary" onClick={() => resetItem()}>
                    OK
                </Button>
                <Button variant="contained" color="error" onClick={() => onClose()}>
                    Cancel
                </Button>
            </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default ResetConfirm;
