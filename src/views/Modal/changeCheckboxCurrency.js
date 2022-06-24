/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable no-else-return */
/* eslint-disable no-lonely-if */
/* eslint-disable spaced-comment */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { Button, Checkbox } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { get } from 'lodash';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from 'utils/api';
import ModalComponent from 'views/ModalComponent/ModalComponent';
import TitlePage from 'views/TitlePage/TitlePage';

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

const ChangeCheckboxCurrency = ({status, newlabel, current_code, currentStatus}) => {
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
  permission_groups?.map((item) => {
    if (item.name === 'Configuration') {
      item.permissions.map((itemGame) => {
        if (itemGame.name === 'Games') {
          arrPermissionGames = itemGame;
        }
        return itemGame.name
      });
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

  const onChangeStatus = async (current_code, status, currentStatus) => {
    onClose();
    let statusNew = '';
    if (status) {
        statusNew = 'inactivate';
    } else {
        statusNew = 'activate';
    };

    console.log(current_code, statusNew);
    
    try {
      const response = await api.post(`/api/currency/${current_code}/${statusNew}`, null);
      
      if (get(response, 'success', false)) {
        setChecked(!checked);
        toast.success("Update Status Success", {
          onClose: onClose()
        });
      } else {
        if (response?.err === 'err:no_permission') {
          toast.warn(t('no_permission'), {
            onClose: onClose()
          });
        }
        if (response?.err === 'err:suspended_account') {
          toast.warn(t('suspended_account'));
        }
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  return (
    <div>
      <ModalComponent
        open={open}
        onClose={onClose}
      >
        <div>
          <TitlePage title="Confirmation" />
            <div className={classes.title__text}>{`Are you sure you want to change status this: ${current_code} ?`}</div>
            <div className={classes.title__groupButton} style={{ justifyContent: 'flex-end' }}>
                <Button 
                  style={{ marginRight: '10px' }} 
                  variant="contained" 
                  color="primary" 
                  onClick={() => onChangeStatus(current_code, status, currentStatus)}
                >
                    OK
                </Button>
                <Button variant="contained" color="error" onClick={() => onClose()}>
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
export default ChangeCheckboxCurrency;