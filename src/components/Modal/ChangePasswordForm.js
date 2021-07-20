import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import api from 'src/utils/api';
import ChangePassword from 'src/icons/ChangePassword';

import InputField from 'src/components/shared/InputField/InputField';
import TooltipIcon from 'src/components/shared/TooltipIcon/TooltipIcon';
import ModalComponent from 'src/components/shared/ModalComponent/ModalComponent';
import TitlePage from 'src/components/shared/TitlePage/TitlePage';
import { SubmitButton } from 'src/components/shared/Button/Button';

const ChangePasswordForm = ({ linkApi, username }) => {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
    setValue,
  } = useForm();

  useEffect(() => {
    setValue('username', username);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      if (get(response, 'success', false)) {
        toast.success('Update Password Success', {
          onClose: onClose(),
        });
      } else {
        if (response?.err === 'err:form_validation_failed') {
          for (const field in response?.data) {
            console.log('field', field);
            setError(field, {
              type: 'validate',
              message: response?.data[field],
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
        IconComponent={<ChangePassword />}
        onClick={onOpenModal}
      />
      <ModalComponent open={open} onClose={onClose}>
        <div>
          <TitlePage title="Change Password" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              namefileld="username"
              control={control}
              id="username"
              errors={errors?.username}
              type="text"
              label="Username"
              disabled
            />
            <InputField
              required
              namefileld="password"
              control={control}
              id="password"
              errors={errors?.password}
              type="password"
              label="Password"
              pattern={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/}
              helperText="from 6 characters and least 1 uppercase, 1 lowercase letter and 1 number"
            />
            <InputField
              required
              namefileld="confirm_password"
              control={control}
              id="confirm_password"
              errors={errors?.confirm_password}
              type="password"
              label="Confirm Password"
              pattern={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/}
              helperText="from 6 characters and least 1 uppercase, 1 lowercase letter and 1 number"
            />
            <SubmitButton />
          </form>
        </div>
      </ModalComponent>
    </div>
  );
};

export default ChangePasswordForm;
