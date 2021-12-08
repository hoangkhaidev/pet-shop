/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import remove from 'lodash/remove';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import ButtonGroup, {
  SubmitButton,
  ResetButton,
} from 'src/components/shared/Button/Button';
import InputField from 'src/components/shared/InputField/InputField';
import TitlePage from 'src/components/shared/TitlePage/TitlePage';
import useFetchData from 'src/utils/hooks/useFetchData';
import useRouter from 'src/utils/hooks/useRouter';
import { useEffect, useState } from 'react';
import get from 'lodash/get';
import FormLabel from '@material-ui/core/FormLabel';
import api from 'src/utils/api';
import Loading from '../shared/Loading/Loading';
import NoPermissionPage from '../NoPermissionPage/NoPermissionPage';
import { useTranslation } from 'react-i18next';
// import cloneDeep from 'lodash.clonedeep';

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
    width: '50%',
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

  const [errorFinanceEmail, setErrorFinanceEmail] = useState('');

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
    setErrorFinanceEmail('');
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
      delete form.finance_email;
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
            if (response?.data['finance_emails'] === 'err:invalid_email') {
              setErrorFinanceEmail(t('invalid_email'));
            } else if (response?.data['finance_emails'] === 'err:duplicate_finance_emails') {
              setErrorFinanceEmail(t('duplicate_finance_emails')); 
            } else {
              setError(field, {
                  type: 'validate',
                  message: response?.data[field],
              });
            }
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
    <ContentCardPage>
      <TitlePage title="Edit Profile" />
      <span style={{ marginBottom: '2rem', display: 'flex', fontWeight: '600' }}>
          {data?.username} (Joined {data?.created_at})
      </span>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formStyle}>
        <InputField
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
                callbackInputProps={addingFinanceEmail}
                isHasInputProps
                />
                <div className={classes.rootChip} style={{ paddingBottom: '15px' }}>
                {financeEmail?.map((email, index) => (
                    <Chip
                    className={classes.financeEmailItem}
                    key={index}
                    label={email}
                    onDelete={() => onRemoveFinanceEmail(email)}
                    />
                ))}
                </div>
                <FormLabel style={{marginTop: '-15px'}} component="legend" className={classes.checkHelperText}>{errorFinanceEmail}</FormLabel>
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
          <ResetButton text="Cancel" onAction={onCancel} />
        </ButtonGroup>
      </form>
      {isLoading && <Loading />}
    </ContentCardPage>
  );
};

export default Profile;
