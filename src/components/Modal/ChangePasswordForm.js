import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import EditIcon from '@material-ui/icons/Edit';
import get from 'lodash/get';
import { toast } from "react-toastify";
import api from 'src/utils/api';  

import InputField from "src/components/shared/InputField/InputField";
import TooltipIcon from "src/components/shared/TooltipIcon/TooltipIcon";
import ModalComponent from "src/components/shared/ModalComponent/ModalComponent";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import { SubmitButton } from "src/components/shared/Button/Button";

const ChangePasswordForm = ({linkApi}) => {
  const [open, setOpen] = useState(false);
  const { handleSubmit, formState: { errors }, control, setError } = useForm();

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    const form = {
      password: data.password,
      password_confirmation: data.confirm_password,
    };
    
    try {
      const response = await api.post(linkApi, form);
      console.log(response)
      
      if (get(response, 'success', false)) {
        toast.success("Update Password Success", {
          onClose: onClose()
        });
      } else {
        if (response?.err === 'err:form_validation_failed') {
          for (const field in response?.data) {
            console.log('field', field);
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
      <TooltipIcon
        title="Change password"
        arialLabel="change-password"
        IconComponent={<EditIcon />}
        onClick={onOpenModal}
      />
      <ModalComponent
        open={open}
        onClose={onClose}
      >
        <div>
          <TitlePage title="Change Password" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              required
              nameField="password"
              control={control}
              id="password"
              errors={errors?.password}
              type="password"
              label="Password"
            />
            <InputField
              required
              nameField="confirm_password"
              control={control}
              id="confirm_password"
              errors={errors?.confirm_password}
              type="password"
              label="Confirm Password"
            />  
            <SubmitButton />
          </form>
        </div>
      </ModalComponent>
    </div>
  );
};

export default ChangePasswordForm;
