import { useState, useCallback } from "react";
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

const DeleteItem = ({title, linkApi, types, username }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const deleteSubAccount = async (linkApi, title ) => {
    try {
      let data = await api.post(linkApi);
      if(!data?.success) {
        let mess = 'Failed to Delete';
        if (data?.err === 'err:suspended_account') {
          toast.warn('Cannot perform action, your account has been suspended, please contact your upline');
        }
        if (data?.err === 'err:no_permission') {
          toast.warn("No Permission");
        }
        if (data.err === 'err:role_in_use') toast.warn(<div>{mess}<br /> <div style={{fontSize: '14px'}}>Role in use</div></div>, { position: toast.POSITION.UPPER_RIGHT });
        else toast.warn(`Failed to Delete`);
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
        title="Delete"
        color="secondary"
        onClick={onOpenModal}
      />
      <ModalComponent
        open={open}
        onClose={onClose}
      >
        <div>
          <TitlePage title={title} />
            <div className={classes.title__text}>{`Are you sure you want to delete this ${types ? types : ''} : ${username}?`}</div>
            <div className={classes.title__groupButton} style={{ justifyContent: 'flex-end' }}>
                <Button style={{ marginRight: '10px' }} variant="contained" color="primary" onClick={() => deleteSubAccount(linkApi, title)}>
                    OK
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
