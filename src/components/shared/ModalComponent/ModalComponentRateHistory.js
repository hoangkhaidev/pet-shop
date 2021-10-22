/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from '@material-ui/core/styles';
import { node, bool, func } from "prop-types";
import CancelIcon from '@material-ui/icons/Cancel';

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: '20px',
    left: `${left}%`,
    transform: `translate(-${top}%, 0)`,
    height: '100%',
    overflow:'scroll',
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 550,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  closer: {
    cursor: 'pointer',
    position: 'absolute',
    top: '3%',
    right: '3%',
  },
}));

const ModalComponentRateHistory = ({ children, open, onClose, width }) => {
  const [modalStyle, setModalStyle] = useState(getModalStyle);
  const classes = useStyles();

  useEffect(() => {
    let style = {...modalStyle};
    style.width = width;
    setModalStyle(style)
  }, [width])

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

ModalComponentRateHistory.propTypes = {
  children: node.isRequired,
  open: bool,
  onClose: func
};

ModalComponentRateHistory.defaultProps = {
  open: false,
  onClose: () => {}
};

export default ModalComponentRateHistory;
