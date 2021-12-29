/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import remove from 'lodash/remove';
import IPAddressInput from 'src/components/shared/IPAddressInput/IPAddressInput';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
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
import SelectFieldMutiple from '../shared/InputField/SelectFieldMutiple';
import { useTranslation } from 'react-i18next';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { clearPage, setPageName } from 'src/features/parentParam/parentParam';

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
      width: '100%'
    }
  },
}));

const SubAccountEdit = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm();

  const navigate = useNavigate();
  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();
  const roleUser = useSelector((state) => state.roleUser);
  const { t } = useTranslation();
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionSubAccount = {};
  permission_groups.map((item) => {
    if (item.name === 'Sub Account') {
      arrPermissionSubAccount = item.permissions;
    }
    return item.name === 'Sub Account'
  });

  const { dataResponse, isLoading, isHasPermission  } = useFetchData(`/api/subs/${router.query?.id}`);
  const { dataResponse: dataRole } = useFetchData('/api/role');
  const [roleData, setRoleData] = useState([]);
  const [data, setData] = useState(null);
  const [whitelistIP, setWhitelistIP] = useState([['', '', '', '']]);
  const [brandData, setBrandData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);

  const [brandMultiple, setBrandMultiple] = useState([]);
  const [errorBrandMul, setErrorBrandMul] = useState('');

  useEffect(() => {
    let mapData = [];
    let newBrand = cloneDeep(brandsData);
    newBrand?.forEach((data) => {
      let optionData = {
        id: data.brand_id,
        value: data.brand_id,
        label: data.username,
      };
      mapData.push(optionData);
    });
    setBrandData([...mapData]);
  }, [brandsData, setBrandData]);

  useEffect(() => {
    if (roleUser.account_type !== 'brand') {
      onDataBrand();
    }
  }, [roleUser]);

  useEffect(() => {
    document.title = 'Edit Sub Account';
    return () => {
      document.title = '';
    }
  }, [router]);

  useEffect(() => {
    dispatch(setPageName("sub_edit"));
    return () => {
      dispatch(clearPage());
    }
  }, []);

  const onDataBrand = async () => {
    const response = await api.post('/api/brand/public_list', null);
    if (get(response, "success", false)) {
      setBrandsData(response?.data);
    } else {
      console.log("response", response?.errors);
    }
  };

  useEffect(() => {
    setValue('brand', get(dataResponse, 'brand_ids', ''));
    setValue('brand_names', get(dataResponse, 'brand_names', ''));
    setValue('username', get(dataResponse, 'username', ''));
    setValue('name', get(dataResponse, 'name', ''));
    setValue('role', get(dataResponse, 'role_id', ''));
    setData(dataResponse);

    let data = get(dataResponse, 'whitelist_ips', ['...']);
    if (data.length < 20) {
      data.push('...');
      if (!data.length) {
        data = ['...'];
      }
    }
    const formatWhitelistIP = data.map((ip) => ip.split('.'));
    
    setWhitelistIP(formatWhitelistIP);
    setBrandMultiple(get(dataResponse, 'brand_ids', ''))
  }, [dataResponse, setValue]);

  useEffect(() => {
    let dataRoleClone = cloneDeep(dataRole);
    let mapData = [];
    dataRoleClone?.forEach((data) => {
      let optionData = {
        id: data.id,
        value: data.id,
        label: data.role_name,
      };
      mapData.push(optionData);
    });
    setRoleData([...mapData]);
  }, [dataRole, setRoleData]);

  useEffect(() => {
    clearErrors('whitelist_ips');
  }, [whitelistIP]);

  const onSubmit = async (dataForm) => {
    const formatWLIPs = whitelistIP.map((item) => {
      item = item.join('.');
      if (item === '...') return null;
      return item;
    }).filter((item) => item);

    const form = {
      brand_ids: brandMultiple,
      display_name: dataForm.name,
      password: dataForm.password ? dataForm.password : '',
      password_confirmation: dataForm.password_confirmation ? dataForm.password_confirmation : '',
      role_id: dataForm.role,
      whitelist_ips: formatWLIPs,
    };

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
        if (response.err === "err:no_permission") {
          toast.warn(t('no_permission'));
        }
        if (response?.err === 'err:suspended_account') {
          toast.warn(t('suspended_account'));
        }
        if (response?.err === 'err:form_validation_failed') {
          for (const field in response?.data) {
            if (response?.data[field] === 'err:invalid_brand_ids') {
              setErrorBrandMul(t('invalid_brand_ids'));
            } 
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

  const onCancel = () => {
    navigate('/sub/list');
  };

  const onChangeWhitelistIp = (e, index, rowIndex) => {
    const { formattedValue } = e;
    const cloneArr = whitelistIP.slice();
    cloneArr[rowIndex][index] = formattedValue;
    setWhitelistIP(cloneArr);
  };

  const onAddingWLIPAddress = () => {
    const cloneArr = whitelistIP.slice();
    const newArray = [...cloneArr, ['', '', '', '']];
    if (newArray.length <= 20 ) setWhitelistIP(newArray);
  };

  const onRemoveWLIPAddress = (rowIndex) => {
    const cloneArr = whitelistIP.slice();
    remove(cloneArr, (item, index) => rowIndex === index);
    setWhitelistIP(cloneArr);
  };

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  if (!arrPermissionSubAccount[0].full) {
    if (arrPermissionSubAccount[0].view || arrPermissionSubAccount[0].create || arrPermissionSubAccount[0].none) {
      return <Navigate to="/404" />;
    }
  }

  return (
    <ContentCardPage>
      <TitlePage title="Edit Sub Account" />
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formStyle}>
        {!(roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub' || roleUser.account_type === 'brand') && (
          <SelectFieldMutiple 
            selectDisabled= {roleUser.account_type === 'brand' ? true : false}
            options={brandData} 
            label={'Brand'}
            required 
            id={'brand_id'}
            setBrandMultiple={setBrandMultiple}
            brandMultiple={brandMultiple}
            errorBrandMul={errorBrandMul}
          />
        )}
        {(roleUser.account_type === 'brand') && (
          <InputField
            readOnly
            namefileld="brand_names"
            control={control}
            id="brand_names"
            errors={errors?.brand_names}
            type="text"
            label="Current Brand"
            defaultValue={roleUser.username}
          />
        )}
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
          helperText={t('h_name_length')}
        />
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
        <SelectField
          label="Role"
          namefileld="role"
          id="role"
          control={control}
          errors={errors?.role}
          options={roleData}
          required
          defaultValue=""
        />
        <FormLabel>Whitelist IP Address</FormLabel>
        {(whitelistIP || []).map((item, index) => (
          <div className={classes.whitelistIPLine} key={index}>
            <IPAddressInput
              apiWLIP={item}
              onChange={onChangeWhitelistIp}
              rowIndex={index}
            />
            {
              whitelistIP.length === 20 ? (
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => onRemoveWLIPAddress(index)}
                >
                  <RemoveIcon />
                </Button>
              ) : 
                whitelistIP.length - 1 === index ? (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={onAddingWLIPAddress}
                  >
                    <AddIcon />
                  </Button>
                ) : (
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => onRemoveWLIPAddress(index)}
                  >
                    <RemoveIcon />
                  </Button>
                )
            }
          </div>
        ))}
        {
          errors?.whitelist_ips && (
            <FormLabel 
              component="legend" 
              className={classes.checkHelperText} 
              style={{paddingTop: '5px'}}
            >
              {
                t(errors?.whitelist_ips?.message)
              }
            </FormLabel>
          )
        }
        <ButtonGroup>
          <SubmitButton />
          <ResetButton text="Cancel" onAction={onCancel} />
        </ButtonGroup>
      </form>
      {isLoading && <Loading />}
    </ContentCardPage>
  );
};

export default SubAccountEdit;
