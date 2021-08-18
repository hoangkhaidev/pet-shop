/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import remove from 'lodash/remove';
import IPAddressInput from 'src/components/shared/IPAddressInput/IPAddressInput';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import ButtonGroup, {
  SubmitButton,
  ResetButton,
} from 'src/components/shared/Button/Button';
import InputField from 'src/components/shared/InputField/InputField';
import SelectField from 'src/components/shared/InputField/SelectField';
import TitlePage from 'src/components/shared/TitlePage/TitlePage';

import useFetchData from 'src/utils/hooks/useFetchData';
import useRouter from 'src/utils/hooks/useRouter';
import { useEffect, useState } from 'react';
import get from 'lodash/get';

import FormLabel from '@material-ui/core/FormLabel';

import api from 'src/utils/api';
import Loading from '../shared/Loading/Loading';
import NoPermissionPage from '../NoPermissionPage/NoPermissionPage';
import cloneDeep from 'lodash.clonedeep';

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
  }
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

  const { dataResponse, isLoading, isHasPermission  } = useFetchData(`/api/profile`);
  const [data, setData] = useState({});
  const [financeEmail, setFinanceEmail] = useState([]);

  const [errorFinanceEmail, setErrorFinanceEmail] = useState('');

  const finance_emails = watch('finance_emails', '');
  // const { dataResponse: dataBrand } = useFetchData('/api/brand/public_list');

  useEffect(() => {
    console.log(data)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    setValue('username', get(dataResponse, 'username', ''));
    setValue('name', get(dataResponse, 'display_name', ''));
    setValue('support_email', get(dataResponse, 'support_email', ''));
  }, [dataResponse, setValue]);

  useEffect(() => {
    setData(dataResponse);
    setFinanceEmail(get(dataResponse, 'finance_emails', []));
  }, [dataResponse]);

  const onSubmit = async (dataForm) => {
    // const formatWLIPs = whitelistIP.map((item) => {
    //   let check = false;
    //   item.map((item1) => {
    //     if (item1 === '') check = true;
    //     return item1;
    //   })
    //   if (check === true) item = null;
    //   else item = item.join('.');
    //   return item;
    // }).filter((item) => item)

    const form = {
      display_name: dataForm.name,
      support_email: dataForm.support_email,
      finance_email: financeEmail,
      password: dataForm.password ? dataForm.password : '',
      password_confirmation: dataForm.password_confirmation ? dataForm.password_confirmation : '',
    };
    // console.log(form)
    try {
      let response = await api.post(
        `/api/subs/${router.query?.id}/update`,
        form
      );
      if (get(response, 'success', false)) {
        toast.success('Update subs Success', {
          onClose: navigate('/sub/list'),
        });
      } else {
        if (response?.err === 'err:suspended_account') {
          toast.warn('Cannot perform action, your account has been suspended, please contact your upline');
        }
        if (response?.err === 'err:form_validation_failed') {
          for (const field in response?.data) {
            if (response?.data['finance_emails'] === 'err:invalid_email') {
                setErrorFinanceEmail('Invalid email');
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
    navigate('/sub/list');
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
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '50%' }}>
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
          namefileld="name"
          control={control}
          id="name"
          errors={errors?.name}
          type="text"
          label="Name"
          maxLength={100}
          helperText="Max length 100 chars"
        />
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
        <div className={classes.rootChip}>
          {financeEmail?.map((email) => (
            <Chip
              className={classes.financeEmailItem}
              key={email}
              label={email}
              onDelete={() => onRemoveFinanceEmail(email)}
            />
          ))}
        </div>
        <FormLabel style={{marginTop: '-15px'}} component="legend" className={classes.checkHelperText}>{errorFinanceEmail}</FormLabel>
        <InputField
          namefileld="password"
          control={control}
          id="password"
          errors={errors?.password}
          type="password"
          label="Password"
          pattern={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/}
          helperText="From 6 characters and least 1 uppercase, 1 lowercase letter and 1 number"
        />
        <InputField
          namefileld="password_confirmation"
          control={control}
          id="password_confirmation"
          errors={errors?.password_confirmation}
          type="password"
          label="Confirm Password"
          pattern={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/}
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
