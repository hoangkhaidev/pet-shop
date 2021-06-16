import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import api from 'src/utils/api';  
import DeleteIcon from '@material-ui/icons/Delete';

import TooltipIcon from "src/components/shared/TooltipIcon/TooltipIcon";
import ModalComponent from "src/components/shared/ModalComponent/ModalComponent";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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

const DeleteItem = ({title, linkApi}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const deleteSubAccount = async (linkApi, title) => {
    try {
      let data = await api.post(linkApi);
      if(!data?.success) {
        toast.warn(`${title} not Success`)
      } else {
        toast.success(`${title} Success`, {
            onClose: setTimeout(() => {
                window.location.reload()
            }, 1000),   
        });
      }
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <div>
      <TooltipIcon
        IconComponent={<DeleteIcon />}
        title={title}
        color="secondary"
        onClick={onOpenModal}
      />
      <ModalComponent
        open={open}
        onClose={onClose}
      >
        <div>
          <TitlePage title={title} />
            <div className={classes.title__text}>{`Do you want ${title}?`}</div>
            <div className={classes.title__groupButton}>
                <Button variant="contained" color="primary" onClick={() => deleteSubAccount(linkApi, title)}>
                    Submit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => onClose()}>
                    Cancel
                </Button>
            </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default DeleteItem;
