/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useCallback } from "react";
import ModalComponent from "views/ModalComponent/ModalComponent";
import TitlePage from "views/TitlePage/TitlePage";
import TooltipIcon from "views/TooltipIcon/TooltipIcon";
import DeleteIcon from '@mui/icons-material/Delete';

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

const DeleteConfirm = ({onDeleteItem, name }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const deleteItem = () => {
    onDeleteItem(name);
    onClose();
  }

  return (
    <div>
      <TooltipIcon
        IconComponent={<DeleteIcon />}
        title="Delete"
        color="error"
        onClick={onOpenModal}
      />
      <ModalComponent
        open={open}
        onClose={onClose}
      >
        <div>
          <TitlePage title={'Confirmation'} />
            <div className={classes.title__text}>{`Are you sure you want to delete this : ${name}?`}</div>
            <div className={classes.title__groupButton} style={{ justifyContent: 'flex-end' }}>
                <Button style={{ marginRight: '10px' }} variant="contained" color="primary" onClick={() => deleteItem()}>
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

export default DeleteConfirm;
