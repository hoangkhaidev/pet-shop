/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useCallback } from "react";
import ModalComponent from "views/ModalComponent/ModalComponent";
import TitlePage from "views/TitlePage/TitlePage";

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
  }
}));

const UpdateCommission = ({onHandleUpdate, name, brand_id, row }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const updateItem = () => {
    onClose();
    onHandleUpdate(brand_id, name , row);
  }

  return (
    <div>
      <Button
        variant="contained"
        onClick={onOpenModal}
        color="primary"
      >
        Save
      </Button>
      <ModalComponent
        open={open}
        onClose={onClose}
      >
        <div>
          <TitlePage title={'Confirmation'} />
            <div className={classes.title__text}>{`Are you sure you want to update this: ${name}?`}</div>
            <div className={classes.title__groupButton} style={{ justifyContent: 'flex-end' }}>
                <Button style={{ marginRight: '10px' }} variant="contained" color="primary" onClick={() => updateItem()}>
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

export default UpdateCommission;
