/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
import { useState } from "react";
import { node, bool, func } from "prop-types";
import CancelIcon from '@mui/icons-material/Cancel';
import { makeStyles } from "@mui/styles";
import { Modal } from "@mui/material";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    borderRadius: '12px',
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 550,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    }
  },
  closer: {
    cursor: 'pointer',
    position: 'absolute',
    top: '3%',
    right: '3%',
  },
}));

const ModalComponent = ({ children, open, onClose }) => {
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div style={modalStyle} className={classes.paper}>
        <div onClick={onClose} className={classes.closer}>
          <CancelIcon />
        </div>
        {children}
      </div>
    </Modal>
  );
};

ModalComponent.propTypes = {
  children: node.isRequired,
  open: bool,
  onClose: func
};

ModalComponent.defaultProps = {
  open: false,
  onClose: () => {}
};

export default ModalComponent;