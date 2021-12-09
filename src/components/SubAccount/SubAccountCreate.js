import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import remove from 'lodash/remove';
import get from 'lodash/get';
import useFetchData from 'src/utils/hooks/useFetchData';
import { toast } from 'react-toastify';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import InputField from 'src/components/shared/InputField/InputField';
import SelectField from 'src/components/shared/InputField/SelectField';
import ButtonGroup, {
  SubmitButton,
  ResetButton,
} from 'src/components/shared/Button/Button';
import IPAddressInput from 'src/components/shared/IPAddressInput/IPAddressInput';
import TitlePage from 'src/components/shared/TitlePage/TitlePage';
import api from 'src/utils/api';
import cloneDeep from 'lodash.clonedeep';
import NoPermissionPage from '../NoPermissionPage/NoPermissionPage';
import SelectFieldMutiple from '../shared/InputField/SelectFieldMutiple';
import Loading from '../shared/Loading/Loading';

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

const SubAccountCreate = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [whitelistIP, setWhitelistIP] = useState([['', '', '', '']]);
  const [roleData, setRoleData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);

  const [brandMultiple, setBrandMultiple] = useState([]);
  const [errorBrandMul, setErrorBrandMul] = useState('');

  const [checkWhiteIP, setCheckWhiteIP] = useState('');
  const [isHasAccessPermission, setIsHasPermission] = useState(true);
  const roleUser = useSelector((state) => state.roleUser);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
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

  useEffect(() => {
    console.log(brandData);

  }, [brandData])

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
            if (response?.data[field] === 'err:invalid_ip_address') {
              setCheckWhiteIP(t('invalid_ip_address'));
            }
            if (response?.data[field] === 'err:invalid_brand_ids') {
              setErrorBrandMul(t('invalid_brand_ids'));
            }
            if (response?.data[field] === 'err:duplicate_ip_address') {
              setCheckWhiteIP(t('duplicate_ip_address'));
            }
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

  const onCancel = () => {
    navigate('/sub/list');
  };

  useEffect(() => {
    setCheckWhiteIP('');
  }, [whitelistIP]);

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

  if (!isHasAccessPermission) {
    return <NoPermissionPage />;
  }
  
  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <ContentCardPage>
      <TitlePage title="Create Sub Account" />
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formStyle}>
        {!(roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub' || roleUser.account_type === 'brand') && (
          <SelectFieldMutiple 
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
          label="Role"
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
        <FormLabel 
          component="legend" 
          className={classes.checkHelperText} 
          style={{paddingTop: '5px'}}
        >{checkWhiteIP}</FormLabel>
        <ButtonGroup>
          <SubmitButton />
          <ResetButton text="Cancel" onAction={onCancel} />
        </ButtonGroup>
      </form>
      {isLoading && <Loading />}
    </ContentCardPage>
  );
};

export default SubAccountCreate;
