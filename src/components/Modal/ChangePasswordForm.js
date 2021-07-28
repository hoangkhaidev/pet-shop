import { useState, useCallback } from 'react';
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
import Button from '@material-ui/core/Button';

const ChangePasswordForm = ({ linkApi, username }) => {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm();

  // useEffect(() => {
    // setValue('username', username);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
            // console.log('field', field);
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
            {/* <InputField
              namefileld="username"
              control={control}
              id="username"
              errors={errors?.username}
              type="text"
              label="Username"
              disabled
            /> */}
            <div style={{color: '#747f93', fontSize: '18px', paddingTop: '10px'}}>
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
              helperText="From 6 characters and at least 1 uppercase, 1 lowercase letter and 1 digit."
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
              <Button style={{marginLeft: '10px'}} variant="contained" color="secondary" onClick={() => onClose()}>
                  Cancel
              </Button>
            </div>
          </form>
        </div>
      </ModalComponent>
    </div>
  );
};

export default ChangePasswordForm;
