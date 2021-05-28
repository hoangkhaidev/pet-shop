import { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from '@material-ui/core/styles';
import { node, bool, func } from "prop-types";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
