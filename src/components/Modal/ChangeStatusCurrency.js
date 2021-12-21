/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from "react";
import get from 'lodash/get';
import { toast } from "react-toastify";
import api from 'src/utils/api'; 
import ModalComponent from "src/components/shared/ModalComponent/ModalComponent";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import { Button, makeStyles } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import StatusBadge from "../shared/StatusBadge/StatusBadge";
import { useTranslation } from "react-i18next";

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

const ChangeStatusCurrency = ({ types, currentStatus, current_code, newlabel, setRefreshData = () => {} }) => {
  const classes = useStyles();
  const [label, setLabel] = useState(newlabel);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setLabel(newlabel);
  }, [newlabel]);

  const onOpenModal = useCallback(() => {
    if (types !== 'statusView') setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const onChangeStatus = async (current_code, label, currentStatus) => {
    onClose();
    let statusNew = '';
    if (label === 'active') statusNew = 'activate';
    if (label === 'inactive') statusNew = 'inactivate';
    
    try {
      const response = await api.post(`/api/currency/${current_code}/${statusNew}`, null);
      
      if (get(response, 'success', false)) {
        setLabel(() => currentStatus);
        setRefreshData(() => Math.random());
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

  let labelShow = '';
  if (label === 'active') labelShow = 'Active';
  if (label === 'inactive') labelShow = 'Inactive';

  return (
    <div style={{ marginRight: '0px' }}>
      { types === 'statusView' ? <StatusBadge label={labelShow} /> : '' }

      {
        types !== 'statusView' && (
          label === 'inactive' ?
            <FontAwesomeIcon 
              icon={faBan} 
              size={'2x'} 
              color={'red'} 
              title={'Inactivate'} 
              onClick={(onOpenModal)} 
              style={types !== 'statusView' ? {cursor: 'pointer'} : ''}
            />
          : label === 'active' ?
            <FontAwesomeIcon 
              icon={faCheckCircle} 
              size={'2x'} 
              color={'#82c91e'} 
              title={'Activate'} 
              onClick={(onOpenModal)} 
              style={types !== 'statusView' ? {cursor: 'pointer'} : ''}
            />
          : ''
        )
      }
      <ModalComponent
        open={open}
        onClose={onClose}
      >
        <div>
          <TitlePage title="Confirmation" />
            <div className={classes.title__text}>{`Are you sure you want to change status this: ${current_code} ?`}</div>
            <div className={classes.title__groupButton} style={{ justifyContent: 'flex-end' }}>
                <Button 
                  style={{ marginRight: '0px' }} 
                  variant="contained" 
                  color="primary" 
                  onClick={() => onChangeStatus(current_code, label, currentStatus)}
                >
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
