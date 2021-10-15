import { Button, makeStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import api from 'src/utils/api';
import ModalComponent from '../shared/ModalComponent/ModalComponent';
import TitlePage from '../shared/TitlePage/TitlePage';

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

const ChangeStatusGamesConfig = ({status, game_code, brand_id, brand_name, game_name}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(status);
  const [valCheck, setValCheck] = useState(null);

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    onOpenModal();
    setValCheck(event.target.checked)
  };

  const onChangeStatus = async () => {
    setChecked(valCheck);
    onClose();
    let dataForm = {
      brand_id: brand_id,
      game_code: game_code
    }
    if (valCheck === true) {
      try {
        let data = await api.post(`/api/game_config/brand_game/enable`, dataForm);
        if(!data?.success) {
          if (data?.err === 'err:no_permission') {
            toast.warn("No Permission", {
              onClose: onClose()
            });
          } else if (data?.err === 'err:suspended_account') {
            toast.warn('Cannot perform action, your account has been suspended, please contact your admin');
          } else {
            toast.warn(`Failed to Change`);
          }
        } else {
          toast.success(`Change Status Success`);
        }
      } catch(e) {
        console.log(e)
      }
    } else {
      try {
        let data = await api.post(`/api/game_config/brand_game/disable`, dataForm);
        if(!data?.success) {
          toast.warn(`Failed to Change`);
        } else {
          toast.success(`Change Status Success`);
        }
      } catch(e) {
        console.log(e)
      }
    }
  }

  return (
    <div>
      <ModalComponent
        open={open}
        onClose={onClose}
      >
        <div>
          <TitlePage title="Confirmation" />
            <div className={classes.title__text}>{`Are you sure you want to change this: ${game_name} ?`}</div>
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
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        style ={{
          color: "#1cb13c",
        }}
      />
    </div>
  );
}
export default ChangeStatusGamesConfig;