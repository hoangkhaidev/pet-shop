/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-return-assign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import remove from 'lodash/remove';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { makeStyles } from '@mui/styles';
import useFetchData from 'utils/hooks/useFetchData';
import { cloneDeep } from 'lodash';
import api from 'utils/api';
import NoPermissionPage from 'views/NoPermissionPage/NoPermissionPage';
import MainCard from 'ui-component/cards/MainCard';
import InputField from 'views/InputField/InputField';
import { Button, FormLabel } from '@mui/material';
import ButtonGroup, { CancelButton, SubmitButton } from 'views/Button/Button';
import Loading from 'views/Loading/Loading';
import SelectField from 'views/InputField/SelectField';
import SelectFieldMultiple from 'views/InputField/SelectFieldMutiple';
import IPAddressInput from 'views/IPAddressInput/IPAddressInput';

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
      width: '100%'
    }
  },
}));

const SubAccountCreate = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [whitelistIP, setWhitelistIP] = useState([['', '', '', '']]);
  const [roleData, setRoleData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);

  const [brandMultiple, setBrandMultiple] = useState([]);
  const [errorBrandMul, setErrorBrandMul] = useState('');

  const [isHasAccessPermission, setIsHasPermission] = useState(true);
  const roleUser = useSelector((state) => state.roleUser);
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionSubAccount = {};
  permission_groups.map((item) => {
    if (item.name === 'Sub Account') {
      arrPermissionSubAccount = item.permissions;
    }
    return item.name === 'Sub Account'
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm();
  const navigate = useNavigate();

  const { dataResponse: dataRole, isLoading, isHasPermission } = useFetchData('/api/role');

  useEffect(() => {
    setValue('brand', roleUser?.username);
  }, [roleUser, setValue]);

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

  const onDataBrand = async () => {
    const response = await api.post('/api/brand/public_list', null);
    if (get(response, "success", false)) {
      setBrandsData(response?.data);
    } else {
      console.log("response", response);
    }
  };

  const onSubmit = async (dataForm) => {
    const formatWLIPs = whitelistIP.map((item) => {
      item = item.join('.');
      if (item === '...') return null;
      return item;
    }).filter((item) => item);
   
    const form = {
      username: dataForm.username,
      brand_ids: brandMultiple,
      display_name: dataForm.name ? dataForm.name : '',
      password: dataForm.password,
      password_confirmation: dataForm.password_confirmation,
      role_id: dataForm.role,
      whitelist_ips: formatWLIPs,
    };
    
    try {
      const response = await api.post('/api/subs/create', form);
      if (get(response, 'success', false)) {
        toast.success('Create SubAccount Success', {
          onClose: navigate('/sub/list'),
        });
      } else {
        if (response.err === "err:no_permission") {
          setIsHasPermission(false);
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

  useEffect(() => {
    document.title = 'Create Sub Account';
  }, []);

  useEffect(() => {
    clearErrors('whitelist_ips');
  }, [whitelistIP]);

  const onChangeWhitelistIp = (e, index, rowIndex) => {
    console.log(index, rowIndex);
    const { formattedValue } = e;
    const cloneArr = cloneDeep(whitelistIP);
    cloneArr[rowIndex][index] = formattedValue;
    setWhitelistIP(cloneArr);
  };

  const onAddingWLIPAddress = () => {
    const cloneArr = cloneDeep(whitelistIP);
    const newArray = [...cloneArr, ['', '', '', '']];
    if (newArray.length <= 20 ) setWhitelistIP(newArray);
  };

  const onRemoveWLIPAddress = (rowIndex) => {
    const cloneArr = cloneDeep(whitelistIP);
    remove(cloneArr, (item, index) => rowIndex === index);
    setWhitelistIP(cloneArr);
  };

  if (!isHasAccessPermission) {
    return <NoPermissionPage />;
  }
  
  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  if (!arrPermissionSubAccount[0].full) {
    if (arrPermissionSubAccount[0].view || arrPermissionSubAccount[0].edit || arrPermissionSubAccount[0].none) {
      return <Navigate to="/404" />;
    }
  }

  return (
    <MainCard title="Create Sub Account">
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formStyle}>
        {!(roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub' || roleUser.account_type === 'brand') && (
          <SelectFieldMultiple 
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
            namefileld="brand"
            control={control}
            id="brand"
            errors={errors?.brand}
            type="text"
            label="Current Brand"
            defaultValue={roleUser.username}
          />
        )}
        <InputField
          required
          namefileld="username"
          control={control}
          id="username"
          errors={errors?.username}
          type="text"
          label="Username"
          pattern={/^[a-z0-9_]{3,15}$/}
          onChange={e => e.target.value = e.target.value.trim()}
          helperText={t('h_username')}
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
        <SelectField
          id="role"
          fullWidth={false}
          label="Role "
          namefileld="role"
          control={control}
          errors={errors?.role}
          required
          options={roleData}
          defaultValue=""
        />
        <FormLabel>{t('Whitelist IP Address')}</FormLabel>
        {whitelistIP.map((item, index) => (
          <div className={classes.whitelistIPLine} key={index}>
            <IPAddressInput
              key={index}
              apiWLIP={item}
              onChange={onChangeWhitelistIp}
              rowIndex={index}
            />
            {
              whitelistIP.length === 20 ? (
                <Button
                  color="error"
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
                    color="error"
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
          {/* <ResetButton text="Cancel" onAction={onCancel} /> */}
          <CancelButton onAction={onCancel} text='Cancel'/>
        </ButtonGroup>
      </form>
      {isLoading && <Loading />}
    </MainCard>
  );
};

export default SubAccountCreate;
