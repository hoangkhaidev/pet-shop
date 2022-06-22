/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import remove from 'lodash/remove';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import get from 'lodash/get';
import Loading from '../Loading/Loading';
import NoPermissionPage from '../NoPermissionPage/NoPermissionPage';
import { useTranslation } from 'react-i18next';
import InputField from 'views/InputField/InputField';
import { makeStyles } from '@mui/styles';
import { Chip, IconButton, InputAdornment } from '@mui/material';
import api from 'utils/api';
import useFetchData from 'utils/hooks/useFetchData';
import useRouter from 'utils/hooks/useRouter';
import MainCard from 'ui-component/cards/MainCard';
import AddIcon from '@mui/icons-material/Add';
import ButtonGroup, { CancelButton, SubmitButton } from 'views/Button/Button';

const useStyles = makeStyles(() => ({
  whitelistIPLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkHelperText: {
    color: 'red !important',
    fontSize: '12px !important',
    marginLeft: '15px',
    marginTop: '5px',
  },
  formStyle: {
    width: '60%',
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    }
  },
}));

const Profile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    watch,
  } = useForm();

  const navigate = useNavigate();
  const router = useRouter();
  const classes = useStyles();
  const roleUser = useSelector((state) => state.roleUser);
  const { t } = useTranslation();

  const { dataResponse, isLoading, isHasPermission  } = useFetchData(`/api/profile`);
  const [data, setData] = useState({});
  const [financeEmail, setFinanceEmail] = useState([]);

  const finance_emails = watch('finance_emails', '');

  useEffect(() => {
    setValue('role_name', get(dataResponse, 'role_name', ''));
    setValue('username', get(dataResponse, 'username', ''));
    setValue('name', get(dataResponse, 'display_name', ''));
    setValue('support_email', get(dataResponse, 'support_email', ''));
  }, [dataResponse, setValue]);

  useEffect(() => {
    setData(dataResponse);
    setFinanceEmail(get(dataResponse, 'finance_emails', []));
  }, [dataResponse]);

  useEffect(() => {
    clearErrors('finance_emails');
  }, [financeEmail]);

  const onSubmit = async (dataForm) => {
    let dataFinanceEmail = [];
      
    if (finance_emails) {
      dataFinanceEmail = [...financeEmail, finance_emails];
    } else {
      dataFinanceEmail = financeEmail;
    }

    const form = {
      display_name: dataForm.name ? dataForm.name : '',
      support_email: dataForm.support_email ? dataForm.support_email : '',
      finance_emails: dataFinanceEmail,
      current_password: dataForm.current_password ? dataForm.current_password : '',
      password: dataForm.password ? dataForm.password : '',
      password_confirmation: dataForm.password_confirmation ? dataForm.password_confirmation : '',
    };

    if (form?.display_name === 'admin') {
      delete form.finance_emails;
      delete form.support_email;
      delete form.display_name;
    }

    if (roleUser.account_type === 'adminsub' || roleUser.account_type === 'brandsub' || roleUser.account_type === 'operatorsub') {
      delete form.finance_emails;
      delete form.support_email;
    }
    

    try {
      let response = await api.post(
        `/api/profile/update`,
        form
      );
      if (get(response, 'success', false)) {
        toast.success('Update Profile Success', {
          onClose: navigate('/'),
        });
      } else {
        if (response?.err === 'err:suspended_account') {
          toast.warn(t('suspended_account'));
        }
        if (response?.err === 'err:form_validation_failed') {
          for (const field in response?.data) {
              setError(field, {
                  type: 'validate',
                  message: t(response?.data[field]),
              });
          }
        }
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  const addingFinanceEmail = () => {
    if (finance_emails) {
      const arrCloneFinanceEmail = financeEmail.slice();
      setFinanceEmail([...arrCloneFinanceEmail, finance_emails])
      setValue('finance_emails', '');
    }
  };

  const onRemoveFinanceEmail = (email) => {
    const cloneArr = financeEmail.slice();
    remove(cloneArr, (item) => item === email);
    setFinanceEmail(cloneArr);
  };

  const onCancel = () => {
    navigate('/');
  };
 
  if (!isHasPermission) {
    return <NoPermissionPage />;
  }
  
  return (
    <MainCard title="Edit Profile">
      <span style={{ marginBottom: '2rem', display: 'flex', fontWeight: '600' }}>
          {data?.username} (Joined {data?.created_at})
      </span>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formStyle}>
        <InputField
          autoFocus
          namefileld="username"
          control={control}
          id="username"
          errors={errors?.username}
          type="text"
          label="Username"
          disabled
        />
        {
          (roleUser.account_type === 'adminsub' || roleUser.account_type === 'brandsub' || roleUser.account_type === 'operatorsub') && (
            <>
              <InputField
                namefileld="role_name"
                control={control}
                id="role_name"
                errors={errors?.role_name}
                type="text"
                label="Role"
                disabled
              />
              <InputField
                  namefileld="name"
                  control={control}
                  id="name"
                  errors={errors?.name}
                  type="text"
                  label="Name"
                  maxLength={100}
                  helperText={t('h_name_length')}
              />
            </>
          )
        } 
        {
          (roleUser.account_type === 'operator' || roleUser.account_type === 'brand') && (
            <>
              <InputField
                namefileld="support_email"
                autoFocus
                control={control}
                id="support_email"
                errors={errors?.support_email}
                type="text"
                label="Support Email"
              />
              <InputField
                namefileld="finance_emails"
                control={control}
                id="finance_emails"
                errors={errors?.finance_emails}
                type="text"
                label="Finance Email"
                endAdornment={
                  <InputAdornment position="start">
                    <IconButton aria-label="Finance Email" onClick={addingFinanceEmail}>
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
              <div className={classes.rootChip}>
                {financeEmail?.map((email, index) => (
                    <Chip
                      className={classes.financeEmailItem}
                      sx={{
                        marginRight: '10px',
                        marginBottom: '10px',
                      }}
                      key={index}
                      label={email}
                      onDelete={() => onRemoveFinanceEmail(email)}
                    />
                ))}
              </div>
            </>
          )
        } 
        <InputField
          namefileld="current_password"
          control={control}
          id="current_password"
          errors={errors?.current_password}
          type="Password"
          label="Current Password"
          pattern={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/}
          helperText={t('h_password')}
        />
        <InputField
          namefileld="password"
          control={control}
          id="password"
          errors={errors?.password}
          type="password"
          label="New Password"
          pattern={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/}
          helperText={t('h_password')}
        />
        <InputField
          namefileld="password_confirmation"
          control={control}
          id="password_confirmation"
          errors={errors?.password_confirmation}
          type="password"
          label="Confirm Password"
          pattern={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/}
          helperText={t('h_password')}
        />
        <ButtonGroup>
          <SubmitButton />
          <CancelButton onAction={onCancel} text='Cancel'/>
        </ButtonGroup>
      </form>
      {isLoading && <Loading />}
    </MainCard>
  );
};

export default Profile;
