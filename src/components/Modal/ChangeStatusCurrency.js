import { useState, useCallback, useEffect } from "react";
import get from 'lodash/get';
import { toast } from "react-toastify";
import api from 'src/utils/api'; 
import StatusBadge from "src/components/shared/StatusBadge/StatusBadge";
import ModalComponent from "src/components/shared/ModalComponent/ModalComponent";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import { Button, makeStyles } from "@material-ui/core";

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

const ChangeStatusCurrency = ({ currentStatus, types, current_code, newlabel, setRefreshData = () => {} }) => {
  const classes = useStyles();
  const [label, setLabel] = useState(newlabel);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLabel(newlabel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newlabel])


  const onOpenModal = useCallback(() => {
    if (types !== 'statusView') setOpen(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const onChangeStatus = async () => {
    onClose();
    let statusNew = '';
    if (newlabel === 'active') statusNew = 'activate';
    if (newlabel === 'inactive') statusNew = 'inactivate';
    try {
      const response = await api.post(`/api/currency/${current_code}/${statusNew}`, null);
      
      if (get(response, 'success', false)) {
        setLabel(currentStatus);
        toast.success("Update Status Success", {
          onClose: onClose()
        });
        // window.location.reload();
      } else {
        if (response?.err === 'err:no_permission') {
          toast.warn("No Permission", {
            onClose: onClose()
          });
        }
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  useEffect(() => {
    setRefreshData(label);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label]);

  let labelShow = '';
  if (label === 'active') labelShow = 'Activate';
  if (label === 'inactive') labelShow = 'Inactivate';

  return (
    <div style={{ marginRight: '25px' }}>
      <StatusBadge label={labelShow} onClick={onOpenModal} />
      <ModalComponent
        open={open}
        onClose={onClose}
      >
        <div>
          <TitlePage title="Confirmation" />
            <div className={classes.title__text}>{`Are you sure you want to change status this: ${current_code} ?`}</div>
            <div className={classes.title__groupButton} style={{ justifyContent: 'flex-end' }}>
                <Button style={{ marginRight: '10px' }} variant="contained" color="primary" onClick={() => onChangeStatus()}>
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

export default ChangeStatusCurrency;
