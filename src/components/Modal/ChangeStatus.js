/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import SelectField from "src/components/shared/InputField/SelectField";
import InputField from "src/components/shared/InputField/InputField";
import get from 'lodash/get';
import { toast } from "react-toastify";
import api from 'src/utils/api'; 
import StatusBadge from "src/components/shared/StatusBadge/StatusBadge";
import ModalComponent from "src/components/shared/ModalComponent/ModalComponent";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import { SubmitButton } from "src/components/shared/Button/Button";
import { Button } from "@material-ui/core";
import TableComponentStatus from "../shared/TableComponent/TableComponentStatus";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSign } from '@fortawesome/free-solid-svg-icons';

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

const ChangeStatus = ({ STATUS, labels, newlabel, row, linkApi, username, statuses, types, setRefreshData = () => {} }) => {
  const [statusLabels, setStatusLabels] = useState(labels);

  const [label, setLabel] = useState(newlabel);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const { handleSubmit, formState: { errors }, control, setError, setValue } = useForm();

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

  const onSubmit = async (data) => {
    const form = {
      action: data.status,
      reason: data.reason,
    };

    try {
      const response = await api.post(linkApi, form);
      
      if (get(response, 'success', false)) {
        setLabel(data.status);
        setValue("reason", "");
        setRefreshData(label);
        toast.success("Update Status Success", {
          onClose: onClose()
        });
      } else {
        if (response?.err === 'err:form_validation_failed') {
          for (const field in response?.data) {
            setError(field, {
              type: 'validate',
              message: response?.data[field]
            });
          }
        }
        if (response?.err === 'err:no_permission') {
          toast.warn("No Permission", {
            onClose: onClose()
          });
        }
        if (response?.err === 'err:suspended_account') {
          toast.warn('Cannot perform action, your account has been suspended, please contact your upline');
        }
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  let labelView = '';
  if (label === 'active') labelView = 'Active';
  if (label === 'suspended') labelView = 'Suspended';
  if (label === 'inactive') labelView = 'Inactive';
  if (label === 'unsuspended') labelView = 'Unsuspend';
  if (label === 'locked') labelView = 'Locked';
  if (label === 'unlocked') labelView = 'Unlock';

  return (
    <div style={{ marginRight: '25px' }}>
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
        width="800px"
      >
        <div>
          <TitlePage title="Change Status" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{color: '#747f93', fontSize: '18px', paddingTop: '10px'}}>
              Username:<b> {username}</b>
            </div>
            <div style={{color: '#747f93', fontSize: '18px'}}>
              Current Status:<b> {newlabel}</b>
            </div>
            <SelectField
              namefileld="status"
              id="status"
              control={control}
              errors={errors?.status}
              options={
                STATUS
              }
              required
              defaultValue=''
              label="New Status"
            />
            <InputField
              required
              namefileld="reason"
              control={control}
              id="reason"
              errors={errors?.reason}
              type="text"
              label="Reason"
              multiline
              rows={4}
            />  
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
