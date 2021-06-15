import { useState, useCallback } from "react";
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

const ChangeStatus = ({newlabel, linkApi, STATUS}) => {
  const [label, setLabel] = useState(newlabel);
  const [open, setOpen] = useState(false);
  const { handleSubmit, formState: { errors }, control, setError, setValue } = useForm();

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

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
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  return (
    <div>
      <StatusBadge label={label} onClick={(onOpenModal)}/>
      <ModalComponent
        open={open}
        onClose={onClose}
      >
        <div>
          <TitlePage title="Change Status" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <SelectField
              nameField="status"
              control={control}
              errors={errors?.status}
              options={
                STATUS
              }
              defaultValue="active"
            />
            <InputField
              required
              nameField="reason"
              control={control}
              id="reason"
              errors={errors?.reason}
              type="text"
              label="reason"
              multiline
              rows={4}
            />  
            <SubmitButton />
          </form>
        </div>
      </ModalComponent>
    </div>
  );
};

export default ChangeStatus;
