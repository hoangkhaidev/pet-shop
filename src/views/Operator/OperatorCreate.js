/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable object-shorthand */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import { useState, useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';
import remove from 'lodash/remove';
import AddIcon from '@mui/icons-material/Add';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import RemoveIcon from '@mui/icons-material/Remove';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import NoPermissionPage from '../NoPermissionPage/NoPermissionPage';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import useFetchData from 'utils/hooks/useFetchData';
import { cloneDeep } from 'lodash';
import api from 'utils/api';
import MainCard from 'ui-component/cards/MainCard';
import InputField from 'views/InputField/InputField';
import { Box, Button, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, FormLabel, InputAdornment, Typography } from '@mui/material';
import FormattedNumberInput from 'views/InputField/InputFieldNumber';
import IPAddressInput from 'views/IPAddressInput/IPAddressInput';
import ButtonGroup, { CancelButton, SubmitButton } from 'views/Button/Button';

const useStyles = makeStyles((theme) => ({
  rootChip: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: `${theme.spacing(0.5)} !important`,
    },
  },
  operatorAdminLabel: {
    marginTop: '16px !important',
    fontWeight: '600 !important',
  },
  whitelistIPLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formStyle: {
    width: '60%',
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    }
  },
  checkHelperText: {
    color: 'red !important',
    fontSize: '12px !important',
    marginLeft: '15px',
    paddingTop: '5px !important'
  },
}));

const OperatorCreate = () => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
    register,
  } = useForm();
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionOperator = {};
  permission_groups.map((item) => {
    if (item.name === 'Operator') {
      arrPermissionOperator = item.permissions;
    }
    return item.name === 'Operator'
  });

  const [financeEmail, setFinanceEmail] = useState([]);
  const [whitelistIP, setWhitelistIP] = useState([['', '', '', '']]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiWLIP, setAPIWLIP] = useState([['', '', '', '']]);
  const [productData, setProductData] = useState([]);
  
  const [isHasAccessPermission, setIsHasPermission] = useState(true);

  const [checkboxListCheck, setCheckboxListCheck] = useState(productData.map((item) => false ));
  const { t } = useTranslation();
  const navigate = useNavigate();

  const finance_email = watch('finance_email');

  useFieldArray({
    control,
    name: "commission",
  });

  const { dataResponse: dataProduct } = useFetchData('/api/product');

  useEffect(() => {
    const data = cloneDeep(dataProduct);
    let mapData = [];
    data?.forEach((data) => {
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

  const onSubmit = async (data) => {
    let dataFinanceEmail = [];
      
    if (finance_email) {
      dataFinanceEmail = [...financeEmail, finance_email.trim()];
    } else {
      dataFinanceEmail = financeEmail;
    }

    const product_form = data.commission.filter((item) => item.checked === true );
    const product_commission = product_form.map((item) => {
      return {
        product_id: Number(item.product_id),
        commission: String(item.value)
      };
    });

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

    setIsLoading(true);
    
    const form = {
      ...data,
      support_email: data.support_email ? data.support_email.trim() : '' ,
      api_whitelist_ip: formatWLIPEndpoint,
      whitelist_ips: formatWLIPs,
      product_ids: [data.product_ids],
      finance_email: dataFinanceEmail,
      product_commission: product_commission,
    };
    delete form.commission;
    delete form.product_ids;

    try {
      let response = await api.post('/api/operators/create', form);
      if (get(response, 'success', false)) {
        toast.success('Create Operator Success', {
          onClose: navigate('/operator/list'),
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
        if (response?.err === 'err:suspended_account') {
          toast.warn(t('suspended_account'));
        }
        if (response?.err === "err:no_permission") {
          toast.warn(t('no_permission'));
          setIsHasPermission(false);
        }
      }
    } catch (e) {
      console.log('e', e);
    }
    setIsLoading(false);
  };

  const addingFinanceEmail = () => {
    if (finance_email) {
      const arrCloneFinanceEmail = financeEmail.slice();
      setFinanceEmail([...arrCloneFinanceEmail, finance_email]);
      setValue('finance_email', '');
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
    navigate('/operator/list');
  }

  if (!isHasAccessPermission) {
    return <NoPermissionPage />;
  }

  if (!arrPermissionOperator[0].full) {
    if (arrPermissionOperator[0].view || arrPermissionOperator[0].edit || arrPermissionOperator[0].none) {
      return <Navigate to="/404" />;
    }
  }

  return (
    <MainCard title="Create Operator">
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formStyle}>
        <InputField
          autoFocus
          required
          namefileld="name"
          control={control}
          id="name"
          errors={errors?.name}
          type="text"
          label="Name"
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
          namefileld="finance_email"
          control={control}
          id="finance_email"
          errors={errors?.finance_emails}
          type="text"
          label="Finance Email"
          callbackInputProps={addingFinanceEmail}
          isHasInputProps
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
                      className={checkboxListCheck[index] ? classes.w40 : ''}
                      key={item.id}
                      style={{padding: '30px', marginRight: 0}}
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
                      className={clsx(classes.w60, checkboxListCheck[index] ? classes.checkShow : classes.checkHidden)} 
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
                          InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                          }}
                          pattern={/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/}
                          inputProps={{
                            maxLength: 3,
                          }}
                          helperText={t('h_commission')}
                          required
                        />
                      : ''}
                    </FormGroup>
                  </div>
                )
              })}
            </Box>
        </FormControl>
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
          variant="h3"
          component="h3"
          gutterBottom
        >
          {t('Operator Admin Account')}
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
          <CancelButton onAction={() => onCancel()} text='Cancel'/>
        </ButtonGroup>
      </form>
      {isLoading && <Loading />}
    </MainCard>
  );
};

export default OperatorCreate;