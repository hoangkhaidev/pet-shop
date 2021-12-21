/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useState, useCallback, useEffect } from "react";
// import SelectField from "src/components/shared/InputField/SelectField";
// import InputField from "src/components/shared/InputField/InputField";
import get from 'lodash/get';
import { toast } from "react-toastify";
import api from 'src/utils/api'; 
import StatusBadge from "src/components/shared/StatusBadge/StatusBadge";
import ModalComponent from "src/components/shared/ModalComponent/ModalComponent";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import { SubmitButton } from "src/components/shared/Button/Button";
import { Button, FormLabel } from "@material-ui/core";
import TableComponentStatus from "../shared/TableComponent/TableComponentStatus";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSign } from '@fortawesome/free-solid-svg-icons';
import SelectCustomer from "../shared/InputField/SelectCustomer";
import Textarea from "../shared/InputField/Textarea";
import { validate } from "validate.js";
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from "react-i18next";

const STATUS_ALL = [
  {
    id: 1,
    value: 'suspended',
    label: 'Suspended',
  },
  {
    id: 2,
    value: 'locked',
    label: 'Locked',
  },
  {
    id: 3,
    value: 'inactive',
    label: 'Inactive',
  },
  {
    id: 4,
    value: 'unsuspended',
    label: 'Unsuspend',
  },
  {
    id: 5,
    value: 'unlocked',
    label: 'Unlock',
  },
  {
    id: 3,
    value: 'active',
    label: 'Active',
  },
];

const schema = {
  status: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  reason: {
    presence: { allowEmpty: false, message: 'is required' },
  },
}

const useStyles = makeStyles((theme) => ({
  checkHelperText: {
    color: 'red !important',
    fontSize: '12px !important',
    marginLeft: '15px',
    marginTop: '-5px !important',
  },
  modalClass: {
    width: '800px',
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    }
  }
}));

const ChangeStatus = ({ STATUS, labels, newlabel, row, linkApi, username, statuses, types, setRefreshData = () => {} }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  
  const initFormState = {
    isValid: false,
    values: {
      status: '',
      reason: ''
    },
    errors: {},
    touched: {}
  };
  
  const [statusLabels, setStatusLabels] = useState(labels);

  const [formState, setFormState] = useState(initFormState);

  const [label, setLabel] = useState(newlabel);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLabel(newlabel);
  }, [newlabel]);

  useEffect(() => {
    setStatusLabels(labels);
  }, [labels]);

  useEffect(() => {
    setData(statuses)
  }, [statuses]);

  const onOpenModal = useCallback(() => {
    if (types !== 'viewStatus') setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      data_field: "at",
      column_name: "At",
      align: "left"
    },
    {
      data_field: "status",
      column_name: "Status",
      align: "left",
      formatter: (cell, row) => {
        const newlabel = row?.status;
        return (
          <ChangeStatus
            types='viewStatusList'
            newlabel={newlabel}
            linkApi={`/api/subs/${row.id}/update_status`}
            STATUS={STATUS_ALL}
            username={row.username}
            statuses={row.statuses}
          />
        );
      },
    },
    {
      data_field: "by_user",
      column_name: "By",
      align: "left",
    },
    {
      data_field: "reason",
      column_name: "Reason",
      align: "left",
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formState.isValid === true) {
      let form = {};
      if (formState?.values?.status === 'unlocked' || formState?.values?.status === 'unsuspended' || formState?.values?.status === 'active'){
        form = {
          action: formState?.values?.status,
          reason: '',
        };
      } else {
        form = {
          action: formState?.values?.status,
          reason: formState?.values?.reason,
        };
      }
      try {
        const response = await api.post(linkApi, form);
        
        if (get(response, 'success', false)) {
          setLabel(form.action);
          setRefreshData(label);
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
    } else {
      setFormState({
        ...formState,
        touched: {
          ...formState.touched,
          status: true,
          reason: true
        }
      });
    }
  };

  useEffect(() => {
    setFormState(initFormState);
  }, [open]);

  useEffect(() => {
    let errors = validate(formState.values, schema);
    if (formState?.values?.status === 'unlocked' || formState?.values?.status === 'unsuspended' || formState?.values?.status === 'active') {
      errors = null;
    }
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const hasError = (field) => formState.touched[field] && formState.errors[field] ? true : false;

  let labelView = '';
  if (label === 'active') labelView = 'Active';
  if (label === 'suspended') labelView = 'Suspended';
  if (label === 'inactive') labelView = 'Inactive';
  if (label === 'unsuspended') labelView = 'Unsuspend';
  if (label === 'locked') labelView = 'Locked';
  if (label === 'unlocked') labelView = 'Unlock';

  return (
    <div style={{ margin: '10px' }}>
      { statusLabels && (statusLabels.length > 0 ? statusLabels : ['active']).map((statusLabel, index) => {
        const labelShow = 
          statusLabel === 'suspended'
            ? 'Suspended'
            : statusLabel === 'inactive'
              ? 'Inactive'
              : statusLabel === 'unsuspended'
                ? 'Unsuspend'
                : statusLabel === 'locked'
                  ? 'Locked'
                  : statusLabel === 'Unlock'
                    ? 'Unlock'
                    : 'Active'
        if (types === 'viewStatus') return <StatusBadge key={index} label={labelShow} />
      })}

      { (types === 'viewStatusList') ? <StatusBadge label={labelView} /> : '' }

      {types === 'editStatus' ? 
        <FontAwesomeIcon 
          icon={faSign} 
          size={'2x'} 
          color={'#f9b115'} 
          title={'Change status'} 
          onClick={(onOpenModal)} 
          style={{cursor: 'pointer'}}
        /> : ''}
      <ModalComponent
        open={open}
        onClose={onClose}
        className={classes.modalClass}
      >
        <div>
          <TitlePage title="Change Status" />
          <form onSubmit={handleSubmit}>
            <div style={{color: '#747f93', fontSize: '18px', paddingTop: '10px'}}>
              Username:<b> {username}</b>
            </div>
            <div style={{color: '#747f93', fontSize: '18px'}}>
              Current Status:<b> {newlabel}</b>
            </div>
            {/* <SelectField
              namefileld="status"
              id="status"
              control={control}
              errors={errors?.status}
              options={
                STATUS
              }
              required
              setStatusSelect={setStatusSelect}
              defaultValue=''
              label="New Status"
            /> */}
            <SelectCustomer 
              options={STATUS} 
              setFormState={setFormState} 
              formState={formState}
              error={hasError('status')}
              name={'status'}
              required
              label={'Status'} 
              id={'status'}
            />
            <FormLabel component="legend" className={classes.checkHelperText}>
              { hasError('status') ? formState?.errors?.status[0] : null }
            </FormLabel> 
            { formState?.values?.status === 'locked' || formState?.values?.status === 'suspended' || formState?.values?.status === 'inactive' ? (
              <>
                <Textarea
                  label="Reason"
                  id="reason"
                  name={'reason'}
                  required
                  error={hasError('reason')}
                  setFormState={setFormState} 
                  formState={formState}
                /> 
                <FormLabel component="legend" className={classes.checkHelperText}>
                  { hasError('reason') ? formState?.errors?.reason[0] : null }
                </FormLabel> 
              </>
            ) : '' }
            <div style={{textAlign: 'right'}}>
              <SubmitButton />
              <Button style={{marginLeft: '10px'}} variant="contained" color="secondary" onClick={() => onClose()}>
                    Cancel
              </Button>
            </div>
          </form>
            <TitlePage title="Status History" />
            <TableComponentStatus 
              data={data}
              columns={columns}
            />
        </div>
      </ModalComponent>
    </div>
  );
};

export default ChangeStatus;
