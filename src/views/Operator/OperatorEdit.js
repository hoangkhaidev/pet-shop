/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable object-shorthand */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';
import remove from 'lodash/remove';
import get from 'lodash/get';
import AddIcon from '@mui/icons-material/Add';
// import ClearAllIcon from '@mui/icons-material/ClearAll';
import RemoveIcon from '@mui/icons-material/Remove';
import { toast } from 'react-toastify';
import cloneDeep from 'lodash/cloneDeep';
import { validate } from 'validate.js';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import useRouter from 'utils/hooks/useRouter';
import useFetchData from 'utils/hooks/useFetchData';
import { clearPage, setPageName } from 'features/parentParam/parentParam';
import api from 'utils/api';
import NoPermissionPage from 'views/NoPermissionPage/NoPermissionPage';
import MainCard from 'ui-component/cards/MainCard';
import InputField from 'views/InputField/InputField';
import { Box, Button, Chip, FormControl, FormLabel, Typography } from '@mui/material';
import ProductCommission from 'views/InputField/ProductCommission';
import IPAddressInput from 'views/IPAddressInput/IPAddressInput';
import ButtonGroup, { CancelButton, SubmitButton } from 'views/Button/Button';
import Loading from 'views/Loading/Loading';

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
  checkHidden: {
    display: 'none !important',
    transition: '0.3s all',
    transform: 'translate3d(-2000px, 0px, 0px)',
  },
  checkShow: {
    display: 'block !important',
    transform: 'translate3d(0px, 0px, 0px) !important',
  },
  w40: {
    width: '40%'
  },
  w60: {
    width: '60%'
  },
  checkHelperText: {
    color: 'red !important',
    fontSize: '12px !important',
    marginLeft: '15px',
    paddingTop: '5px !important'
  },
  checkboxStyle: {
    padding: '2rem 4rem',
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      padding: '2rem 4rem',
    }
  },
  formStyle: {
    width: '60%',
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    }
  },
}));

let schema = {};

const OperatorEdit = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const router = useRouter();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const parentParam = useSelector((state) => state.parentParam.parentParam);
  ///handle permission
  const roleUser = useSelector((state) => state.roleUser);
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionOperator = {};
  permission_groups.map((item) => {
    if (item.name === 'Operator') {
      arrPermissionOperator = item.permissions[0];
    }
    return item.name === 'Operator'
  });

  const { dataResponse, isLoading, isHasPermission } = useFetchData(
    `/api/operators/${router.query?.id}`,
    null
  );

  const { dataResponse: dataProduct } = useFetchData('/api/product');

  const [apiWLIP, setApiWLIP] = useState([['', '', '', '']]);
  const [data, setData] = useState([]);
  const [financeEmails, setFinanceEmails] = useState([]);
  const [whitelistIP, setWhitelistIP] = useState([['', '', '', '']]);
  const [isHasAccessPermission, setIsHasPermission] = useState(true);

  const initFormState = {
    isValid: false,
    values: [],
    errors: {},
    touched: {}
  };

  const [productCommission, setProductCommission] = useState(initFormState);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm();

  const finance_emails = watch('finance_emails', '');

  useEffect(() => {
    clearErrors('whitelist_ips');
  }, [whitelistIP]);

  useEffect(() => {
    clearErrors('api_whitelist_ip');
  }, [apiWLIP]);

  useEffect(() => {
    clearErrors('finance_emails');
  }, [financeEmails]);
  
  useEffect(() => {
    clearErrors('product_commission');
  }, [productCommission]);

  useEffect(() => {
    let dataWhitelist_ips = get(dataResponse, 'whitelist_ips', ['...']);
    if (dataResponse?.whitelist_ips?.length > 20) {
      dataWhitelist_ips.push('...');
      if (!dataWhitelist_ips.length) {
        dataWhitelist_ips = ['...'];
      }
    }
    let dataWhitelist_apis = get(dataResponse, 'api_white_list_ip', ['...']);
    if (dataResponse?.api_white_list_ip?.length > 20) {
        dataWhitelist_apis.push('...');
        if (!dataWhitelist_apis.length) {
          dataWhitelist_apis = ['...'];
        }
    }
    
    const formatWhitelistIP = dataWhitelist_ips.map((ip) => ip.split('.'));
    const formatApiWLIP = dataWhitelist_apis.map((ip) => ip.split('.'));
 
    setApiWLIP(formatApiWLIP?.length > 0 ? formatApiWLIP : apiWLIP);
    setData(dataResponse);
    setFinanceEmails(get(dataResponse, 'finance_emails', []));
    setWhitelistIP(formatWhitelistIP?.length > 0 ? formatWhitelistIP : whitelistIP);
  }, [dataResponse]);

  useEffect(() => {
    if (data) {
      setValue('name', data?.operator_name);
      setValue('support_email', data?.support_email);
      setValue('username', data?.username);
      setValue('api_endpoint', data?.api_endpoint);
      setValue('password', data?.password);
      setValue('password_confirmation', data?.password_confirmation);
    }
  }, [data, setValue]);

  useEffect(() => {
    let dataProCon = [];
    dataProduct.map((item) => {
      let index = (dataResponse?.product_commission || []).findIndex((itemEdit) => {
        return itemEdit.product_id === item.id;
      });
      if (index !== -1) {
        dataProCon.push({
          label: item.name,
          product_id: dataResponse?.product_commission[index].product_id,
          commission: dataResponse?.product_commission[index].commission,
          checked: true,
        });
      } else {
        dataProCon.push({
          label: item.name,
          product_id: item.id,
          commission: "",
          checked: false,
        });
      }
      return item;
    });
    setProductCommission((productCommission) => ({
      ...productCommission,
      values: dataProCon,
      touched: {
        ...productCommission.touched,
      }
    }));
  }, [dataResponse, dataProduct]);

  useEffect(() => {
    let validateValues = {};
    schema = {};
    cloneDeep(productCommission.values).map((item) => {
      if (item.checked) {
        schema = {
          ...schema,
          [`commission-${item.product_id}`]: {
            presence: { allowEmpty: false, message: 'is required' },
          },
        };
        validateValues = {
          ...validateValues,
          [`commission-${item.product_id}`]: item.commission
        };
      }
      return item;
    })

    const errors = validate(validateValues, schema);

    setProductCommission((productCommission) => ({
      ...productCommission,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [productCommission.values]);

  useEffect(() => {
    document.title = 'Edit Operator';
    return () => {
      document.title = '';
    }
  }, [router]);

  useEffect(() => {
    dispatch(setPageName("operator_edit"));
    return () => {
      dispatch(clearPage());
    }
  }, []);

  const onSubmit = async (dataForm) => {
    if (productCommission.isValid === true) {
      let dataFinanceEmail = [];
      
      if (finance_emails) {
        dataFinanceEmail = [...financeEmails, finance_emails];
      } else {
        dataFinanceEmail = financeEmails;
      }

      const product_form = cloneDeep(productCommission.values).filter((item) => item.checked === true );
      const product_commission = product_form.map((item) => {
        delete item.label;
        delete item.checked;
        return item;
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

      const form = {
        ...dataForm,
        api_whitelist_ip: formatWLIPEndpoint,
        password: dataForm.password ? dataForm.password : '',
        password_confirmation: dataForm.password_confirmation ? dataForm.password_confirmation : '',
        whitelist_ips: formatWLIPs,
        finance_email: dataFinanceEmail,
        product_commission: product_commission,
      };
      delete form.commission;
      delete form.username;

      try {
        let response = await api.post(
          `/api/operators/${router.query?.id}/update`,
          form
        );
        if (get(response, 'success', false)) {
          toast.success('Update operator Success', {
            onClose: navigate('/operator/list'),
          });
        } else {
          if (response?.err === 'err:suspended_account') {
            toast.warn(t('suspended_account'));
          }
          if (response?.err === 'err:operator_not_found') {
            toast.warn(t('operator_not_found'));
          }
          if (response?.err === "err:no_permission") {
            toast.warn(t('no_permission'));
            setIsHasPermission(false);
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
    } else {
      let abc = {};
      productCommission.values.map((item) => {
        if (item.checked) {
          abc = {
            ...abc,
            [`commission-${item.product_id}`]:true,
          }
        }
        return item;
      })
      
      setProductCommission((productCommission) => ({
        ...productCommission,
        values: cloneDeep(productCommission.values),
        touched: {
          ...abc
        }
      }));
    }
  };

  const addingFinanceEmail = () => {
    if (finance_emails) {
      const arrCloneFinanceEmail = financeEmails.slice();
      setFinanceEmails([...arrCloneFinanceEmail, finance_emails]);
      setValue('finance_emails', '');
    }
  };

  const onRemoveFinanceEmail = (email) => {
    const cloneArr = financeEmails.slice();
    remove(cloneArr, (item) => item === email);
    setFinanceEmails(cloneArr);
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
    if (newArray.length <= 20 ){
      setWhitelistIP(newArray);
    }
  };

  const onRemoveWLIPAddress = (rowIndex) => {
    const cloneArr = whitelistIP.slice();
    remove(cloneArr, (item, index) => rowIndex === index);
    setWhitelistIP(cloneArr);
  };

  //api whitelist
  const onChangeAPIEndpointIP = (e, index, rowIndex) => {
    const { formattedValue } = e;
    const cloneArr = apiWLIP.slice();
    cloneArr[rowIndex][index] = formattedValue;
    setApiWLIP(cloneArr);
  };

  const onAddingWLIPAPI = () => {
    const cloneArr = apiWLIP.slice();
    const newArray = [...cloneArr, ['', '', '', '']];
    if (newArray.length <= 20 ) setApiWLIP(newArray);
  };

  const onRemoveWLIPAPI = (rowIndex) => {
    const cloneArr = apiWLIP.slice();
    remove(cloneArr, (item, index) => rowIndex === index);
    setApiWLIP(cloneArr);
  };

  const onCancel = () => {
    navigate(parentParam);
  }

  const hasError = (field) => productCommission.touched[field] && productCommission.errors[field] ? true : false;

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  if (!isHasAccessPermission) {
    return <NoPermissionPage />;
  }

  if (roleUser.account_type === 'operator') {
    return <Navigate to="/404" />;
  }

  if (roleUser.account_type === 'brand') {
    return <NoPermissionPage />;
  }

  if (!arrPermissionOperator?.full) {
    if (arrPermissionOperator?.view || arrPermissionOperator?.create || arrPermissionOperator?.none) {
      return <Navigate to="/404" />;
    }
  }

  return (
    <MainCard title="Edit Operator">
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formStyle} >
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
          namefileld="finance_emails"
          control={control}
          id="finance_emails"
          errors={errors?.finance_emails}
          type="text"
          label="Finance Email"
          callbackInputProps={addingFinanceEmail}
          isHasInputProps
        />
        <div className={classes.rootChip} >
          {financeEmails.map((email, index) => (
            <Chip
              className={classes.financeEmailItem}
              key={index}
              label={email}
              onDelete={() => onRemoveFinanceEmail(email)}
            />
          ))}
        </div>
        <FormControl style={{width: '100%'}}>
        <FormLabel style={{paddingTop: '10px'}} component="legend">Product <span style={{color: 'red'}}>*</span></FormLabel>
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
            {(productCommission?.values || []).map((item, index) => {
              return (
                <ProductCommission 
                  nameCon={`commission-${item.product_id}`}
                  key={index} 
                  item={item} 
                  required
                  hasError={hasError}
                  productCommission={productCommission} 
                  setProductCommission={setProductCommission} 
                />
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
        {(apiWLIP || []).map((item, index) => (
          <div className={classes.whitelistIPLine} key={index}>
            <IPAddressInput
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
          readOnly
          namefileld="username"
          id="username"
          control={control}
          errors={errors?.username}
          type="text"
          label="Username"
          pattern={/^[a-z0-9_]{3,15}$/}
          helperText={t('h_username')}
        />
        <InputField
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
          namefileld="password_confirmation"
          control={control}
          id="password_confirmation"
          errors={errors?.password_confirmation}
          type="password"
          label="Confirm Password"
          pattern={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/}
        />
        <FormLabel>Whitelist IP Address for BO</FormLabel>
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
          <SubmitButton text="Submit" />
          <CancelButton onAction={() => onCancel()} text='Cancel'/>
        </ButtonGroup>
      </form>
      {isLoading && <Loading />}
    </MainCard>
  );
};

export default OperatorEdit;