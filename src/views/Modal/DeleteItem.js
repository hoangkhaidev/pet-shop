/* eslint-disable no-unneeded-ternary */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import api from "utils/api";
import DeleteIcon from '@mui/icons-material/Delete';
import ModalComponent from "views/ModalComponent/ModalComponent";
import TitlePage from "views/TitlePage/TitlePage";
import { Button } from "@mui/material";
import TooltipIcon from "views/TooltipIcon/TooltipIcon";

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
  const { t } = useTranslation();

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
        if (data?.err === 'err:role_in_use') {
          toast.warn(<div>{mess}<br /> <div style={{fontSize: '14px'}}>Role in use</div></div>, { position: toast.POSITION.UPPER_RIGHT });
        } else if (data?.err === 'err:suspended_account') {
          toast.warn(t('suspended_account'));
        } else if (data?.err === 'err:no_permission') {
          toast.warn(t('no_permission'));
        } else {
          toast.warn(`Failed to Delete`);
        }
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
    <div style={{ marginRight: 0, marginLeft: 0 }}>
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
          <TitlePage title={title} />
            <div className={classes.title__text}>{`Are you sure you want to delete this ${types ? types : ''} : ${username}?`}</div>
            <div className={classes.title__groupButton} style={{ justifyContent: 'flex-end' }}>
                <Button style={{ marginRight: '10px' }} variant="contained" color="primary" onClick={() => deleteSubAccount(linkApi, title)}>
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

export default DeleteItem;
