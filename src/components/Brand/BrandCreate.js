/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-no-duplicate-props */
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import remove from 'lodash/remove';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import useFetchData from 'src/utils/hooks/useFetchData';
import ButtonGroup, {
  SubmitButton,
} from 'src/components/shared/Button/Button';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import InputField from 'src/components/shared/InputField/InputField';
import TitlePage from 'src/components/shared/TitlePage/TitlePage';
import IPAddressInput from 'src/components/shared/IPAddressInput/IPAddressInput';
import FormattedNumberInput from 'src/components/shared/InputField/InputFieldNumber';
import SelectField from 'src/components/shared/InputField/SelectField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import clsx from 'clsx';
import get from 'lodash/get';
import api from 'src/utils/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import cloneDeep from 'lodash.clonedeep';
import { useSelector } from 'react-redux';
import NoPermissionPage from '../NoPermissionPage/NoPermissionPage';

const useStyles = makeStyles((theme) => ({
  rootChip: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: `${theme.spacing(0.5)} !important`,
    },
  },
  formStyle: {
    width: '50%',
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    }
  },
  whitelistIPLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  w40: {
    width: '40%'
  },
  w60: {
    width: '60%'
  },
  checkHidden: {
    display: 'none !important',
    transition: '0.3s all',
    transform: 'translate3d(-2000px, 0px, 0px)',
  },
  checkShow: {
    display: 'block !important',
    transform: 'translate3d(0px, 0px, 0px) !important',
  },
  checkHelperText: {
    color: 'red !important',
    fontSize: '12px !important',
    marginLeft: '15px',
    paddingTop: '5px !important'
  }
  
}));

const BrandCreate = () => {
  const roleUser = useSelector((state) => state.roleUser);
  const { dataResponse: dataProduct } = useFetchData('/api/product');

  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    register,
    setError,
  } = useForm();

  const finance_email = watch('finance_emails');

  useFieldArray({
    control, 
    name: "commission",
  });

  const [financeEmail, setFinanceEmail] = useState([]);
  const [apiWLIP, setAPIWLIP] = useState([['', '', '', '']]);
  const [whitelistIP, setWhitelistIP] = useState([['', '', '', '']]);
  const [operatorData, setOperatorData] = useState([]);
  const [operatorDatas, setOperatorDatas] = useState([]);
  const [productData, setProductData] = useState([]);

  const [errorWhiteIP, setErrorWhiteIP] = useState('');
  const [errorApiWLIP, setErrorApiWLIP] = useState('');
  const [errorFinanceEmail, setErrorFinanceEmail] = useState('');
  const [errorProductCommission, setErrorProductCommission] = useState('');
  const [isHasAccessPermission, setIsHasPermission] = useState(true);

  const [checkboxListCheck, setCheckboxListCheck] = useState(productData.map((item) => false ));

  useEffect(() => {
    if (roleUser.account_type !== 'operator' && roleUser.account_type !== 'operatorsub') {
      onDataBrand();
    }
  }, [roleUser]);

  useEffect(() => {
    let mapData = [];
    let newProducts = cloneDeep(dataProduct);
    (newProducts || []).forEach((data) => {
      let optionData = {
        id: data.id,
        value: data.id,
        label: data.name,
      };
      mapData.push(optionData);
    });
    setProductData([...mapData]);
  }, [dataProduct]);

  useEffect(() => {
    setErrorWhiteIP('');
  }, [whitelistIP]);

  useEffect(() => {
    setErrorApiWLIP('');
  }, [apiWLIP]);

  useEffect(() => {
    setErrorFinanceEmail('');
  }, [financeEmail]);
  
  useEffect(() => {
    setErrorProductCommission('');
  }, [checkboxListCheck]);

  useEffect(() => {
    const data = cloneDeep(operatorData);
    if (!data) return;
    let mapData = [];
    data.forEach((data) => {
      let optionData = {
        id: data.operator_id,
        value: data.operator_id,
        label: data.username,
      };
      mapData.push(optionData);
    });
    setOperatorDatas([...mapData]);
  }, [operatorData]);

  const onDataBrand = async () => {
    const response = await api.post('/api/operators/public_list', null);
    if (get(response, "success", false)) {
      setOperatorData(response?.data);
    } else {
      console.log("response", response);
    }
  };

  const onRemoveFinanceEmail = (email) => {
    const cloneArr = financeEmail.slice();
    remove(cloneArr, (item) => item === email);
    setFinanceEmail(cloneArr);
  };

  // const onChangeAPIEndpointIP = (e, index) => {
  //   const { formattedValue } = e;
  //   const cloneArr = apiWLIP.slice();
  //   cloneArr[index] = formattedValue;
  //   setAPIWLIP(cloneArr);
  // };

  const onChangeWhitelistIp = (e, index, rowIndex) => {
    const { formattedValue } = e;
    const cloneArr = whitelistIP.slice();
    cloneArr[rowIndex][index] = formattedValue;
    setWhitelistIP(cloneArr);
  };

  const addingFinanceEmail = () => {
    if (finance_email) {
      const arrCloneFinanceEmail = financeEmail.slice();
      setFinanceEmail([...arrCloneFinanceEmail, finance_email]);
      setValue('finance_emails', '');
    }
  };

  const onAddingWLIPAddress = () => {
    const cloneArr = whitelistIP.slice();
    const newArray = [...cloneArr, ['', '', '', '']];
    setWhitelistIP(newArray);
  };

  const onRemoveWLIPAddress = (rowIndex) => {
    const cloneArr = whitelistIP.slice();
    remove(cloneArr, (item, index) => rowIndex === index);
    setWhitelistIP(cloneArr);
  };

  const onSubmit = async (dataForm) => {
      let dataFinanceEmail = [];
        
      if (finance_email) {
        dataFinanceEmail = [...financeEmail, finance_email];
      } else {
        dataFinanceEmail = financeEmail;
      }

      const product_form = dataForm.commission.filter((item) => item.checked === true );
      const product_commission = product_form.map((item) => {
        let arr = {
          product_id: Number(item.product_id),
          commission: String(item.value)
        }
        return arr;
      });
      // const formatWLIPEndpoint = apiWLIP.join('.');
      const formatWLIPEndpoint = apiWLIP.map((item) => {
        item = item.join('.');
        if (item === '...') return null;
        return item;
      }).filter((item) => item);

      const formatWLIPs = whitelistIP.map((item) => {
        item = item.join('.');
        if (item === '...') return null;
        return item;
      }).filter((item) => item);

      delete dataForm.commission;
      const form = {
        ...dataForm,
        api_whitelist_ip: formatWLIPEndpoint,
        whitelist_ips: formatWLIPs,
        finance_emails: dataFinanceEmail,
        product_commission: product_commission,
      };

      try {
        const response = await api.post('/api/brand/create', form);
        if (get(response, 'success', false)) {
          toast.success('Create brand Success', {
            onClose: navigate('brand/list'),
          });
        } else {
          if (response?.err === "err:no_permission") {
            setIsHasPermission(false);
            toast.warn(t('no_permission'));
          }
          if (response?.err === 'err:suspended_account') {
            toast.warn(t('suspended_account'));
          }
          if (response?.err === 'err:form_validation_failed') {
            for (const field in response?.data) {
              if (response?.data['product_commission'] === 'err:invalid_product') {
                setErrorProductCommission(t('invalid_product'));
              }
              if (response?.data['finance_emails'] === 'err:invalid_email') {
                setErrorFinanceEmail(t('invalid_email'));
              }
              if (response?.data['finance_emails'] === 'err:duplicate_finance_emails') {
                setErrorFinanceEmail(t('duplicate_finance_emails')); 
              }
              if (response?.data['api_whitelist_ip'] === 'err:invalid_ip_address') {
                setErrorApiWLIP(t('invalid_ip_address'));
              }
              if (response?.data['api_whitelist_ip'] === 'err:duplicate_ip_address') {
                setErrorApiWLIP(t('duplicate_ip_address'));
              }
              if (response?.data['whitelist_ips'] === 'err:invalid_ip_address') {
                setErrorWhiteIP(t('invalid_ip_address'));
              }
              if (response?.data['whitelist_ips'] === 'err:duplicate_ip_address') {
                setErrorWhiteIP(t('duplicate_ip_address'));
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

  //api whitelist
  const onChangeAPIEndpointIP = (e, index, rowIndex) => {
    const { formattedValue } = e;
    const cloneArr = apiWLIP.slice();
    cloneArr[rowIndex][index] = formattedValue;
    setAPIWLIP(cloneArr);
  };

  const onAddingWLIPAPI = () => {
    const cloneArr = apiWLIP.slice();
    const newArray = [...cloneArr, ['', '', '', '']];
    if (newArray.length <= 20 ) setAPIWLIP(newArray);
  };

  const onRemoveWLIPAPI = (rowIndex) => {
    const cloneArr = apiWLIP.slice();
    remove(cloneArr, (item, index) => rowIndex === index);
    setAPIWLIP(cloneArr);
  };

  const onCancel = () => {
    navigate('/brand/list');
  }
  
  if (!isHasAccessPermission) {
    return <NoPermissionPage />;
  }

  return (
    <ContentCardPage>
      <TitlePage title="Create Brand" />
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formStyle}>
        
        {(roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub') && (
          <SelectField
            namefileld="operator_id"
            id="operator_id"
            label="Operator"
            required
            fullWidth={false}
            control={control}
            errors={errors?.operator_id}
            options={operatorDatas}
            defaultValue=""
          />
        )}
        {(roleUser.account_type === 'operatorsub' && roleUser.account_type === 'operator') && (
          <InputField
            readOnly
            namefileld="operator_id"
            control={control}
            id="operator_id"
            errors={errors?.operator_id}
            type="text"
            label="Operator"
            defaultValue={roleUser.username}
          />
        )}
        <InputField
          autoFocus
          required
          namefileld="name"
          control={control}
          id="name"
          errors={errors?.name}
          type="text"
          label="Name"
          inputProps={{
            maxLength: 100,
          }}
          pattern={/^[a-z0-9_]{3,15}$/}
          helperText={t('h_name')}
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
        <FormLabel style={{marginTop: '-15px'}} component="legend" className={classes.checkHelperText}>{errorFinanceEmail}</FormLabel>
        <div className={classes.rootChip}>
          {financeEmail.map((email) => (
            <Chip
              className={classes.financeEmailItem}
              key={email}
              label={email}
              onDelete={() => onRemoveFinanceEmail(email)}
            />
          ))}
        </div>
        {(roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub') && (
          <>
            <FormLabel style={{paddingTop: '10px'}} component="legend">Product<span style={{color: 'red'}}>*</span></FormLabel>
            <FormControl className={classes.w100}>
              <FormLabel component="legend" className={classes.checkHelperText}>{errorProductCommission}</FormLabel>
                {productData.map((item, index) => {
                  return (
                    <div key={item.id} style={{display: 'flex', width: '100%'}}>
                      <FormControlLabel
                        className={checkboxListCheck[index] ? classes.w40 : ''}
                        key={item.id}
                        style={{padding: '30px'}}
                        label={item?.label}
                        // name={`commission.${index}.checked`}
                        // value={item?.id}
                        control={
                          <Controller
                              name={`commission.${index}.checked`}
                              control={control}
                              // inputRef={register}
                              render={(props) => {
                                return (
                                  <Checkbox
                                    checked={props.field.value === true}
                                    value={item?.id}
                                    onChange={(e) => {
                                        props.field.onChange(e.target.checked);
                                        let ticked = [...checkboxListCheck];
                                        ticked[index] = e.target.checked;
                                        setCheckboxListCheck(ticked);
                                      }
                                    }
                                  />
                                )
                              }}
                            />
                          }                  
                      />
                      <input 
                        type="hidden"
                        defaultValue={item.id}
                        {...register(`commission.${index}.product_id`)} 
                      />
                      <FormGroup 
                        className={clsx(classes.w60, checkboxListCheck[index] ? classes.checkShow : classes.checkHidden)} 
                        key={index}
                      >
                        {checkboxListCheck[index] ?
                          <FormattedNumberInput
                            namefileld={`commission.${index}.value`}
                            label="Commission"
                            id={`commission_${item.id}`}
                            control={control}
                            allowLeadingZeros
                            allowNegative={false}
                            decimalScale={0}
                            errors={get(errors, `commission[${index}].value`)}
                            required
                            InputProps={{
                              endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                            pattern={/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/}
                            helperText={t('h_commission')}
                            // register={register}
                            // {...register(`commission.${index}.value`)}
                          />
                        : ''}
                      </FormGroup>
                    </div>
                  )
                })}
            </FormControl>
          </>
        )}


        <InputField
          required
          namefileld="api_endpoint"
          control={control}
          id="api_endpoint"
          errors={errors?.api_endpoint}
          type="text"
          label="API Endpoint"
          pattern={/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/}
          helperText={t('h_api_endpoint')}
        />
        {/* <FormLabel>{t('Whitelist IP Address for API')}</FormLabel> */}
        <FormLabel>Whitelist IP Address for API<span style={{color: 'red'}}>*</span></FormLabel>
        {apiWLIP.map((item, index) => (
          <div className={classes.whitelistIPLine} key={index}>
            <IPAddressInput
              key={index}
              apiWLIP={item}
              onChange={onChangeAPIEndpointIP}
              rowIndex={index}
            />
            {
              apiWLIP.length === 20 ? (
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => onRemoveWLIPAPI(index)}
                >
                  <RemoveIcon />
                </Button>
              ) : 
                apiWLIP.length - 1 === index ? (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={onAddingWLIPAPI}
                  >
                    <AddIcon />
                  </Button>
                ) : (
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => onRemoveWLIPAPI(index)}
                  >
                    <RemoveIcon />
                  </Button>
                )
            }
          </div>
        ))}
        {/* <IPAddressInput apiWLIP={apiWLIP} onChange={onChangeAPIEndpointIP} /> */}
        <FormLabel component="legend" className={classes.checkHelperText}>{errorApiWLIP}</FormLabel>
        <Typography
          className={classes.operatorAdminLabel}
          variant="h6"
          component="h6"
          gutterBottom
          style={{paddingTop: '10px'}}
        >
          {t('Brand Admin Account')}
        </Typography>
        <InputField
          required
          namefileld="username"
          control={control}
          id="username"
          errors={errors?.username}
          type="text"
          label="Username"
          pattern={/^[a-z0-9_]{3,15}$/}
          helperText={t('h_username')}
          onChange={e => e.target.value = e.target.value.trim()}
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
        <FormLabel>{t('Whitelist IP Address for BO')}</FormLabel>
        {whitelistIP.map((item, index) => (
          <div key={index} className={classes.whitelistIPLine}>
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
        >
          {errorWhiteIP}
        </FormLabel>
        <ButtonGroup>
          <SubmitButton />
          <Button
            startIcon={<ClearAllIcon fontSize="small" />}
            variant="contained"
            type="button"
            color="secondary"
            onClick={() => onCancel()}
            sx={{
              ml: 1
            }}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </ContentCardPage>
  );
};

export default BrandCreate;
