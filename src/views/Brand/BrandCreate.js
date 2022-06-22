/* eslint-disable import/no-duplicates */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-no-duplicate-props */
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import remove from 'lodash/remove';
import RemoveIcon from '@mui/icons-material/Remove';
import clsx from 'clsx';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NoPermissionPage from '../NoPermissionPage/NoPermissionPage';
import { makeStyles } from '@mui/styles';
import useFetchData from 'utils/hooks/useFetchData';
import { cloneDeep } from 'lodash';
import api from 'utils/api';
import MainCard from 'ui-component/cards/MainCard';
import SelectField from 'views/InputField/SelectField';
import InputField from 'views/InputField/InputField';
import { Button, Chip, FormControlLabel, FormGroup, FormLabel, IconButton, InputAdornment, Typography } from '@mui/material';
import { FormControl } from '@mui/material';
import { Checkbox } from '@mui/material';
import FormattedNumberInput from 'views/InputField/InputFieldNumber';
import IPAddressInput from 'views/IPAddressInput/IPAddressInput';
import AddIcon from '@mui/icons-material/Add';
import ButtonGroup, { CancelButton, SubmitButton } from 'views/Button/Button';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  rootChip: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: `${theme.spacing(0.5)} !important`,
    },
  },
  formStyle: {
    width: '60%',
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    },
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
  w100: {
    width: '100%',
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
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionBrand = {};
  permission_groups.map((item) => {
    if (item.name === 'Brand') {
      arrPermissionBrand = item.permissions;
    }
    return item.name === 'Brand'
  });

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
    clearErrors
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
    clearErrors('whitelist_ips');
  }, [whitelistIP]);

  useEffect(() => {
    clearErrors('api_whitelist_ip');
  }, [apiWLIP]);

  useEffect(() => {
    clearErrors('finance_emails');
  }, [financeEmail]);
  
  useEffect(() => {
    clearErrors('product_commission');
  }, [checkboxListCheck]);

  useEffect(() => {
    const data = cloneDeep(operatorData);
    let mapData = [];
    data?.forEach((data) => {
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

    const formatWLIPEndpoint = cloneDeep(apiWLIP).map((item) => {
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

  const onChangeAPIEndpointIP = (e, index, rowIndex) => {
    const { formattedValue } = e;
    const cloneArr = cloneDeep(apiWLIP);
    cloneArr[rowIndex][index] = formattedValue;
    setAPIWLIP(cloneArr);
  };

  const onAddingWLIPAPI = () => {
    const cloneArr = cloneDeep(apiWLIP);
    const newArray = [...cloneArr, ['', '', '', '']];
    if (newArray.length <= 20 ) setAPIWLIP(newArray);
  };

  const onRemoveWLIPAPI = (rowIndex) => {
    const cloneArr = cloneDeep(apiWLIP);
    cloneArr.splice(rowIndex, 1);
    setAPIWLIP(cloneArr);
  };

  const onCancel = () => {
    navigate('/brand/list');
  }
  
  if (!isHasAccessPermission) {
    return <NoPermissionPage />;
  }

  if (!arrPermissionBrand[0].full) {
    if (arrPermissionBrand[0].view || arrPermissionBrand[0].edit || arrPermissionBrand[0].none) {
      return <Navigate to="/404" />;
    }
  }

  return (
    <MainCard title="Create Brand" sx={{marginTop: '15px'}}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formStyle}>
        
        {(roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub') && (
          <SelectField
            namefileld="operator_id"
            id="operator_id"
            label="Operator "
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
            label="Operator "
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
          endAdornment={
            <InputAdornment position="start">
              <IconButton aria-label="Finance Email" onClick={addingFinanceEmail}>
                <AddIcon />
              </IconButton>
            </InputAdornment>
          }
        />
        <div className={classes.rootChip} >
          {financeEmail.map((email, index) => (
            <Chip
              className={classes.financeEmailItem}
              key={index}
              label={email}
              onDelete={() => onRemoveFinanceEmail(email)}
            />
          ))}
        </div>
        {(roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub') && (
          <>
            <FormLabel style={{paddingTop: '10px'}} component="legend">Product <span style={{color: 'red'}}>*</span></FormLabel>
            <FormControl style={{width: '100%'}}>
              {
                errors?.product_commission && (
                  <FormLabel 
                    component="legend" 
                    className={classes.checkHelperText} 
                  >
                    {t(errors?.product_commission?.message)}
                  </FormLabel>
                )
              }
                <Box 
                  style={{
                    display: 'flex',
                    width: '100%',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  }}
                >
                  {productData.map((item, index) => {
                    return (
                      <div 
                        key={item.id} 
                        style={{
                          display: 'flex', 
                          width: '50%', 
                          alignItems: 'center',
                        }}
                      >
                        <FormControlLabel
                          key={item.id}
                          style={{    
                            paddingRight: '5px',
                            paddingLeft: '30px',
                            paddingTop: '30px',
                            paddingBottom: '30px',
                          }}
                          label={item?.label}
                          control={
                            <Controller
                                name={`commission.${index}.checked`}
                                control={control}
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
                          className={clsx(classes.w100, checkboxListCheck[index] ? classes.checkShow : classes.checkHidden)} 
                          key={index}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              background: '#ffffff',
                            },
                            input: {
                              background: '#ffffff',
                            },
                          }}
                        >
                          {checkboxListCheck[index] ?
                            <FormattedNumberInput
                              namefileld={`commission.${index}.value`}
                              label="Commission "
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
                            />
                          : ''}
                        </FormGroup>
                      </div>
                    )
                  })}
                </Box>
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
        <FormLabel>Whitelist IP Address for API <span style={{color: 'red'}}>*</span></FormLabel>
        {apiWLIP?.map((item, index) => (
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
                  color="error"
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
                    color="error"
                    variant="contained"
                    onClick={() => onRemoveWLIPAPI(index)}
                  >
                    <RemoveIcon />
                  </Button>
                )
            }
          </div>
        ))}
        {
          errors?.api_whitelist_ip && (
            <FormLabel 
              component="legend" 
              className={classes.checkHelperText} 
            >
              {t(errors?.api_whitelist_ip?.message)}
            </FormLabel>
          )
        }
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
          <CancelButton onAction={() => onCancel()} text='Cancel'/>
        </ButtonGroup>
      </form>
    </MainCard>
  );
};

export default BrandCreate;
