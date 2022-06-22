/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import api from 'utils/api';
import TooltipIcon from 'views/TooltipIcon/TooltipIcon';
import ModalComponent from 'views/ModalComponent/ModalComponent';
import TitlePage from 'views/TitlePage/TitlePage';
import InputField from 'views/InputField/InputField';
import { CancelButton, SubmitButton } from 'views/Button/Button';
import ChangePassword from 'icons/ChangePassword';

const ChangePasswordForm = ({ linkApi, username }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
    reset,
  } = useForm();

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
    
  };

  const onSubmit = async (data) => {
    const form = {
      password: data.password,
      password_confirmation: data.password_confirmation,
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
            setError(field, {
              type: 'validate',
              message: t(response?.data[field]),
            });
          }
        }
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

  useEffect(() => {
    reset({
      password_confirmation: "",
      password: "",
    });
  }, [open]);

  return (
    <div style={{ margin: 0 }}>
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
            <div style={{color: '#747f93', fontSize: '16px', paddingTop: '10px'}}>
              Username:<b> {username}</b>
            </div>
            <InputField
              required
              namefileld="password"
              control={control}
              id="password"
              errors={errors?.password}
              type="password"
              label="Password"
              pattern={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/}
              helperText={t('h_password')}
            />
            <InputField
              required
              namefileld="password_confirmation"
              control={control}
              id="password_confirmation"
              errors={errors?.password_confirmation}
              type="password"
              label="Confirm Password"
              pattern={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/}
            />
            <div style={{textAlign: 'right'}}>
              <SubmitButton />
              <CancelButton onAction={() => onClose()} text='Cancel'/>
            </div>
          </form>
        </div>
      </ModalComponent>
    </div>
  );
};

export default ChangePasswordForm;
