import { Button, makeStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
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

const ChangeStatusGamesConfig = ({status, game_code, brand_id, brand_name, game_name, game_id}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(status);
  const [valCheck, setValCheck] = useState(null);
  const { t } = useTranslation();

  const roleUser = useSelector((state) => state.roleUser);

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionGames = {};
  permission_groups.map((item) => {
    if (item.name === 'Configuration') {
      arrPermissionGames = item.permissions[0];
    }
    return item.name === 'Configuration'
  });

  const handleChange = (event) => {
    if (arrPermissionGames?.full) {
        onOpenModal();
        setValCheck(event.target.checked)
    } else {
      if (arrPermissionGames?.view || arrPermissionGames?.create) {
        return;
      } else {
        onOpenModal();
        setValCheck(event.target.checked)
      }
    }
    
  };

  const onChangeStatus = async () => {

    if (roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub') {
      setChecked(valCheck);
      onClose();
      if (valCheck === true) {
        try {
          let data = await api.post(`/api/game_config/admin_game/${game_id}/enable`, null);
          if(!data?.success) {
            if (data?.err === 'err:no_permission') {
              toast.warn(t('no_permission'), {
                onClose: onClose()
              });
            } else if (data?.err === 'err:suspended_account') {
              toast.warn(t('suspended_account'));
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
          let data = await api.post(`/api/game_config/admin_game/${game_id}/disable`, null);
          if(!data?.success) {
            if (data?.err === 'err:no_permission') {
              toast.warn(t('no_permission'), {
                onClose: onClose()
              });
            } else if (data?.err === 'err:suspended_account') {
              toast.warn(t('suspended_account'));
            } else {
              toast.warn(`Failed to Change`);
            }
          } else {
            toast.success(`Change Status Success`);
          }
        } catch(e) {
          console.log(e)
        }
      }
    } else {
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
              toast.warn(t('no_permission'), {
                onClose: onClose()
              });
            } else if (data?.err === 'err:suspended_account') {
              toast.warn(t('suspended_account'));
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
            if (data?.err === 'err:no_permission') {
              toast.warn(t('no_permission'), {
                onClose: onClose()
              });
            } else if (data?.err === 'err:suspended_account') {
              toast.warn(t('suspended_account'));
            } else {
              toast.warn(`Failed to Change`);
            }
          } else {
            toast.success(`Change Status Success`);
          }
        } catch(e) {
          console.log(e)
        }
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
            {
              roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub' ? 
                checked ? (<div className={classes.title__text}>{`Are you sure you want to inactivate this game: ${game_name} ?`}</div>) 
                  : (<div className={classes.title__text}>{`Are you sure you want to activate this game: ${game_name} ?`}</div>) 
                    : checked ? (<div className={classes.title__text}>{`Are you sure you want to disable this game: ${game_name} ?`}</div>) 
                      : (<div className={classes.title__text}>{`Are you sure you want to enable this game: ${game_name} ?`}</div>)
            }
            
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