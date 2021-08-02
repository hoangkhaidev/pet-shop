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
// import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
// import TableComponent from "src/components/shared/TableComponent/TableComponent";
// import useRouter from "src/utils/hooks/useRouter";
import { Button } from "@material-ui/core";
import TableComponentStatus from "../shared/TableComponent/TableComponentStatus";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSign } from '@fortawesome/free-solid-svg-icons'

const ChangeStatus = ({ STATUS, newlabel, linkApi, username, statuses, types, setRefreshData = () => {} }) => {
  
  const [label, setLabel] = useState(newlabel);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const { handleSubmit, formState: { errors }, control, setError, setValue } = useForm();
  // const router = useRouter();

  // const [objFilter, setObjFilter] = useState({
  //   page: 1,
  //   page_size: 30,
  //   ...router.query
  // });

  useEffect(() => {
    setLabel(newlabel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newlabel])


  // useEffect(() => {
  //   setValue("username", username);
  //   setValue("current_status", newlabel);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  useEffect(() => {
    setData(statuses)
  }, [statuses])

  const onOpenModal = useCallback(() => {
    // setOpen(true);
    if (types !== 'viewStatus') setOpen(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // console.log(row);
        const newlabel = row?.status ;
        return (
          <ChangeStatus
            types='viewStatus'
            newlabel={newlabel}
            linkApi={`/api/subs/${row.id}/update_status`}
            STATUS={STATUS}
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
    console.log(data);
    // console.log(linkApi);
    const form = {
      action: data.status,
      reason: data.reason,
    };

    try {
      const response = await api.post(linkApi, form);

      // console.log(response);
      
      if (get(response, 'success', false)) {
        setLabel(data.status);
        setValue("reason", "");
        toast.success("Update Status Success", {
          onClose: onClose()
        });
        // window.location.reload();
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
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  useEffect(() => {
    setRefreshData(label);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label])

  let labelShow = '';
  if (label === 'active') labelShow = 'Activate';
  if (label === 'suspended') labelShow = 'Suspend';
  if (label === 'inactive') labelShow = 'Inactivate';
  if (label === 'unsuspended') labelShow = 'Unsuspend';
  if (label === 'locked') labelShow = 'Lock';
  if (label === 'unlocked') labelShow = 'Unlock';

  return (
    <div style={{ marginRight: '25px' }}>
      {types === 'viewStatus' ? <StatusBadge label={labelShow} /> : ''}
  
      {types !== 'viewStatus' ? 
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
            {/* <InputField
              namefileld="username"
              control={control}
              id="username"
              errors={errors?.username}
              type="text"
              label="Username"
              disabled
            />  
            <InputField
              namefileld="current_status"
              control={control}
              id="current_status"
              errors={errors?.current_status}
              type="text"
              label="Current Status"
              disabled
            />   */}
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
          {/* <ContentCardPage> */}
            <TitlePage title="Status History" />
            {/* <TableComponent
              data={data}
              columns={columns}
              pagination={{
                total_size: fakeData.length,
                page: +objFilter.page,
                page_size: +objFilter.page_size
              }}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            /> */}
            <TableComponentStatus 
              data={data}
              columns={columns}
            />
          {/* </ContentCardPage> */}
        </div>
      </ModalComponent>
    </div>
  );
};

export default ChangeStatus;
