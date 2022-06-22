/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable object-shorthand */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import remove from 'lodash/remove';
import get from 'lodash/get';
import map from 'lodash/map';
import cloneDeep from 'lodash/cloneDeep';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
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
import IPAddressInput from 'views/IPAddressInput/IPAddressInput';
import ButtonGroup, { CancelButton, SubmitButton } from 'views/Button/Button';
import Loading from 'views/Loading/Loading';
import ProductCommission from 'views/InputField/ProductCommission';
import { Box, Button, Chip, FormControl, Typography } from '@mui/material';
import { FormLabel } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: "25ch"
  },
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
  w40: {
    width: '40%'
  },
  w60: {
    width: '60%'
  },
  w100: {
    width: '100%'
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
  },
  formStyle: {
    width: '60%',
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    }
  },
  
}));

let schema = {};

const BrandEdit = () => {
  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const roleUser = useSelector((state) => state.roleUser);
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionBrand = {};
  permission_groups.map((item) => {
    if (item.name === 'Brand') {
      arrPermissionBrand = item.permissions[0];
    }
    return item.name === 'Brand'
  });
  
  const { dataResponse, isLoading, isHasPermission } = useFetchData(
    `/api/brand/${router.query?.id}`,
    null
  );
  const { dataResponse: dataProduct } = useFetchData('/api/product');

  const [apiWLIP, setApiWLIP] = useState([['', '', '', '']]);
  const [data, setData] = useState([]);
  const [financeEmail, setFinanceEmail] = useState([]);
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
    clearErrors
  } = useForm();

  const finance_emails = watch('finance_emails', '');

  useEffect(() => {
    let dataWhitelist_ips = get(dataResponse, 'whitelist_ips', ['...']);
    if (dataResponse?.whitelist_ips?.length > 20) {
      dataWhitelist_ips.push('...');
      if (!dataWhitelist_ips.length) {
        dataWhitelist_ips = ['...'];
      }
    }
    let dataWhitelist_apis = get(dataResponse, 'api_whitelist_ip', ['...']);
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
    setFinanceEmail(get(dataResponse, 'finance_emails', []));
    setWhitelistIP(formatWhitelistIP?.length > 0 ? formatWhitelistIP : whitelistIP);
  }, [dataResponse]);

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
  }, [productCommission]);

  useEffect(() => {
    document.title = 'Edit Brand';
    return () => {
      document.title = '';
    }
  }, [router]);

  useEffect(() => {
    dispatch(setPageName("brand_edit"));
    return () => {
      dispatch(clearPage());
    }
  }, []);

  useEffect(() => {
    if (data) {
      setValue('operator', data?.operator_name);
      setValue('name', data?.brand_name);
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

  const onSubmit = async (dataForm) => {
    if (productCommission.isValid === true) {

      let dataFinanceEmail = [];
      
      if (finance_emails) {
        dataFinanceEmail = [...financeEmail, finance_emails];
      } else {
        dataFinanceEmail = financeEmail;
      }

      const product_form = cloneDeep(productCommission.values).filter((item) => item.checked === true );
      const product_commission = cloneDeep(product_form).map((item) => {
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
        display_name: dataForm.name,
        api_whitelist_ip: formatWLIPEndpoint,
        password: dataForm.password ? dataForm.password : '',
        password_confirmation: dataForm.password_confirmation ? dataForm.password_confirmation : '',
        whitelist_ips: formatWLIPs,
        finance_emails: dataFinanceEmail,
        operator_id: 0,
        product_commission: product_commission,
      };

      delete form.commission;
      delete form.operator;
      delete form.name;
      delete form.username;

      try {
        let response = await api.post(`/api/brand/${router.query?.id}/update`, form);
        if (get(response, 'success', false)) {
          toast.success("Update Brand Success", {
            onClose: navigate("/brand/list")
          });
        } else {
          if (response?.err === "err:no_permission") {
            setIsHasPermission(false);
          }
          if (response?.err === 'err:brand_not_found') {
            toast.warn(t('brand_not_found'));
          }
          if (response?.err === 'err:account_not_found') {
            toast.warn(t('brand_not_found'));
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
        console.log("e", e);
      }
    } else {
      let obj = {};
      productCommission.values.map((item) => {
        if (item.checked) {
          obj = {
            ...obj,
            [`commission-${item.product_id}`]:true,
          }
        }
        return item;
      })
      
      setProductCommission((productCommission) => ({
        ...productCommission,
        values: cloneDeep(productCommission.values),
        touched: {
          ...obj
        }
      }));
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
    setFinanceEmail(cloneArr)
  };

  const onChangeWhitelistIp = (e, index, rowIndex) => {
    const { formattedValue } = e;
    const cloneArr = whitelistIP.slice();
    cloneArr[rowIndex][index] = formattedValue;
    setWhitelistIP(cloneArr)
  };

  const onAddingWLIPAddress = () => {
    const cloneArr = whitelistIP.slice();
    const newArray = [...cloneArr, ['', '', '', '']];
    if (newArray.length <= 20 ){
      setWhitelistIP(newArray)
    }
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
    navigate('/brand/list');
  }

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

  const hasError = (field) => productCommission.touched[field] && productCommission.errors[field] ? true : false;
  
  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  if (!isHasAccessPermission) {
    return <NoPermissionPage />;
  }

  if (roleUser.account_type === 'brand') {
    return <Navigate to="/404" />;
  }

  if (!arrPermissionBrand?.full) {
    if (arrPermissionBrand?.view || arrPermissionBrand?.create || arrPermissionBrand.none) {
      return <Navigate to="/404" />;
    }
  }

  return (
    <MainCard title="Edit Brand">
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formStyle} >
        <InputField
          readOnly
          namefileld="operator"
          control={control}
          id="operator"
          errors={errors?.operator}
          type="text"
          label="Operator "
          defaultValue={dataResponse.operator_name}
        />
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
          type="text"
          label="Finance Email"
          errors={errors?.finance_emails}
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
        {(roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub') && (
          <>
            <FormLabel sx={{paddingTop: '10px'}} component="legend">Product <span style={{color: 'red'}}>*</span></FormLabel>
            <FormControl sx={{width: '100%'}}>
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
                sx={{
                  display: 'flex',
                  width: '100%',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                {productCommission.values?.map((item, index) => {
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
          variant="h6"
          component="h6"
          gutterBottom
          style={{paddingTop: '10px'}}
        >
          {t('Brand Admin Account')}
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
          helperText={t('h_username')}
        />
        <InputField
          namefileld="password"
          control={control}
          id="password"
          errors={errors?.password}
          type="password"
          label="Password"
          helperText={t('h_password')}
        />
        <InputField
          namefileld="password_confirmation"
          control={control}
          id="password_confirmation"
          errors={errors?.password_confirmation}
          type="password"
          label="Confirm Password"
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
          <SubmitButton />
          <CancelButton onAction={() => onCancel()} text={'Cancel'}/>
        </ButtonGroup>
      </form>
      {isLoading && <Loading />}
    </MainCard>
  );
};

export default BrandEdit;
