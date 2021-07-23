/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-duplicate-props */
import { useState, useEffect, useMemo } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import remove from 'lodash/remove';
import get from 'lodash/get';
import map from 'lodash/map';
import cloneDeep from 'lodash/cloneDeep';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import FormattedNumberInput from 'src/components/shared/InputField/InputFieldNumber';
// import FormControl from "@material-ui/core/FormControl";
import InputField from 'src/components/shared/InputField/InputField';
import Loading from 'src/components/shared/Loading/Loading';
import IPAddressInput from 'src/components/shared/IPAddressInput/IPAddressInput';
import TitlePage from 'src/components/shared/TitlePage/TitlePage';
import NoPermissionPage from 'src/components/NoPermissionPage/NoPermissionPage';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import clsx from 'clsx';
import ButtonGroup, {
  SubmitButton,
  ResetButton,
} from 'src/components/shared/Button/Button';
import useFetchData from 'src/utils/hooks/useFetchData';
import useRouter from 'src/utils/hooks/useRouter';
import api from 'src/utils/api';
import { toast } from 'react-toastify';
import isEmpty from 'lodash/isEmpty';
import { useNavigate } from 'react-router-dom';
import ClearAllIcon from '@material-ui/icons/ClearAll';

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

const BrandEdit = () => {
  const router = useRouter();
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const { dataResponse, isLoading, isHasPermission } = useFetchData(
    `/api/brand/${router.query?.id}`,
    null
  );
  const { dataResponse: dataProduct } = useFetchData('/api/product');

  const [apiWLIP, setApiWLIP] = useState(['', '', '', '']);
  const [data, setData] = useState([]);
  const [financeEmail, setFinanceEmail] = useState([]);
  const [productData, setProductData] = useState([]);
  const [whitelistIP, setWhitelistIP] = useState([['', '', '', '']]);

  const [errorWhiteIP, setErrorWhiteIP] = useState('');
  const [errorApiWLIP, setErrorApiWLIP] = useState('');
  const [errorFinanceEmail, setErrorFinanceEmail] = useState('');
  const [errorProductCommission, setErrorProductCommission] = useState('');

  const [checkboxListCheck, setCheckboxListCheck] = useState(productData.map((item) => false ));

  const product_commission = useMemo(() => data?.product_commission, [data]);
  const product_commission_new = useMemo(() => map(product_commission, (item) => {
    return {
      product_id: String(item.product_id),
      value: Number(item.commission),
      checked: true
    }
  }), [product_commission]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    register,
    setError,
  } = useForm({
    defaultValues: {commission : product_commission_new}
  });

  useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "commission", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const finance_emails = watch('finance_emails', '');

  useEffect(() => {
    if (dataProduct.length <= 0) return;
    
    let mapData = [];
    dataProduct.forEach((data) => {
      let optionData = {
        id: data.id,
        value: data.id,
        label: data.name,
      };
      mapData.push(optionData);
    });

    setProductData(mapData);
  }, [dataProduct]);

  useEffect(() => {
    const formatWhitelistIP = dataResponse?.whitelist_ips?.map((ip) => ip.split('.'));
    const formatApiWLIP = dataResponse?.api_whitelist_ip?.split('.');

    setApiWLIP(formatApiWLIP?.length > 0 ? formatApiWLIP : apiWLIP);
    setData(dataResponse);
    setFinanceEmail(get(dataResponse, 'finance_emails', []));
    setWhitelistIP(formatWhitelistIP?.length > 0 ? formatWhitelistIP : whitelistIP);

  }, [dataResponse]);

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
    if (data) {
        setValue('commission', product_commission_new);
      
        setValue('operator', data?.operator_name);
        setValue('name', data?.name);
        setValue('support_email', data?.support_email);
        setValue('username', data?.username);
        setValue('api_endpoint', data?.api_endpoint);
        setValue('password', data?.password);
        setValue('password_confirmation', data?.password_confirmation);
    }
  }, [data, setValue]);

  const onSubmit = async (dataForm) => {
    const defaultPro = cloneDeep(data.product_commission);
    // const commissionValue = getValues(`commission.0.value`);
    const product_form = dataForm.commission.filter((item) => item.checked === true );

    const product_commission = product_form.map((item) => {
      if (item.value) {
        return {
          product_id: Number(item.product_id),
          commission: String(item.value)
        };
      } else {
        let index = defaultPro.findIndex((test) => String(test.product_id) === String(item.product_id));
        return {
          product_id: Number(item.product_id),
          commission: String(defaultPro[index].commission)
        };
      }
    }); 

    const formatWLIPEndpoint = apiWLIP.join('.');

    const formatWLIPs = whitelistIP.map((item) => {
      item = item.join('.');
      if (item === '...') return null;
      return item;
    }).filter((item) => item);
    
    const form = {
      ...dataForm,
      display_name: dataForm.name,
      api_whitelist_ip: formatWLIPEndpoint,
      whitelist_ips: formatWLIPs,
      finance_emails: financeEmail,
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
        if (response?.err === 'err:form_validation_failed') {
          for (const field in response?.data) {
            if (response?.data['product_commission'] === 'err:invalid_product') {
              setErrorProductCommission('Invalid product');
            } else if (response?.data['finance_emails'] === 'err:invalid_email') {
              setErrorFinanceEmail('Invalid email');
            } else if (response?.data['api_whitelist_ip'] === 'err:invalid_ip_address') {
              setErrorApiWLIP('Invalid IP address');
            } else if (response?.data['whitelist_ips'] === 'err:invalid_ip_address') {
              setErrorWhiteIP('Invalid IP address');
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
      console.log("e", e);
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

  const onChangeAPIEndpointIP = (e, index) => {
    const { formattedValue } = e;
    const cloneArr = apiWLIP.slice();
    cloneArr[index] = formattedValue;
    setApiWLIP(cloneArr);
  };

  const onRemoveWLIPAddress = (rowIndex) => {
    const cloneArr = whitelistIP.slice();
    remove(cloneArr, (item, index) => rowIndex === index);
    setWhitelistIP(cloneArr);
  };

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  const onCancel = () => {
    navigate('/brand/list');
  }
  
  return (
    <ContentCardPage>
      <TitlePage title="Edit Brand" />
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '50%' }}>
        <InputField
          readOnly
          namefileld="operator"
          control={control}
          id="operator"
          errors={errors?.operator}
          type="text"
          label="Operator"
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
          helperText="Length from 3 to 15 chars, allow letter, digit and underscore(_)"
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
        <FormLabel style={{paddingTop: '10px'}} component="legend">Product<span style={{color: 'red'}}>*</span></FormLabel>
        <FormControl className={classes.w100}>
          <FormLabel component="legend" className={classes.checkHelperText}>{errorProductCommission}</FormLabel>
          {productData.map((item, index) => {
            const checked = watch(`commission.${index}.checked`) ? true : false;
            const commissionValue = watch(`commission.${index}.value`);
            return (
              <div key={item.id} style={{display: 'flex', width: '100%', alignItems: 'center'}}>
                <FormControlLabel
                  className={checked ? classes.w40 : ''}
                  style={{padding: '30px'}}
                  label={item?.label}
                  name={`commission.${index}.checked`}
                  value={item?.id}
                  control={
                    <Controller
                      name={`commission.${index}.checked`}
                      control={control}
                      // inputRef={register}
                      defaultValue={checked}
                      render={(props) => {
                        return (
                          <Checkbox
                            checked={props.field.value}
                            value={item.id}
                            onChange={(e) => {
                              props.field.onChange(e.target.checked);
                              let ticked = [...checkboxListCheck];
                              ticked[index] = e.target.checked;
                              setCheckboxListCheck(ticked);
                            }}
                          />
                        )
                      }}
                    />
                  }                  
                />
                <input 
                  type="hidden"
                  value={item.id}
                  {...register(`commission.${index}.product_id`)} 
                />
                <FormGroup 
                  className={clsx(classes.w60, checked === true ? classes.checkShow : classes.checkHidden)} 
                  key={item.id}
                >
                  {checked && 
                    <FormattedNumberInput
                      key={item.id}
                      namefileld={`commission.${index}.value`}
                      label="Commission"
                      id={`commission.${index}.value`}
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
                      defaultValue={commissionValue}
                      helperText="From 0% to 100%"
                      // {...register(`commission.${index}.value`)} 
                    />
                  }
                </FormGroup>
              </div>
            )
          })}
        </FormControl>

        <InputField
          required
          namefileld="api_endpoint"
          control={control}
          id="api_endpoint"
          errors={errors?.api_endpoint}
          type="text"
          label="API Endpoint"
        />
        {/* <FormLabel>Whitelist IP Address for API</FormLabel> */}
        <FormLabel>Whitelist IP Address for API<span style={{color: 'red'}}>*</span></FormLabel>
        <IPAddressInput apiWLIP={apiWLIP} onChange={onChangeAPIEndpointIP} />
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
          readOnly
          namefileld="username"
          control={control}
          id="username"
          errors={errors?.username}
          type="text"
          label="Username"
          helperText="Length from 3 to 15 chars, allow letter, digit and underscore(_)"
        />
        <InputField
          namefileld="password"
          control={control}
          id="password"
          errors={errors?.password}
          type="password"
          label="Password"
          required
          helperText="From 6 characters and at least 1 uppercase, 1 lowercase letter and 1 number"
        />
        <InputField
          namefileld="password_confirmation"
          control={control}
          id="password_confirmation"
          errors={errors?.password_confirmation}
          type="password"
          label="Confirm Password"
          required
          helperText="From 6 characters and at least 1 uppercase, 1 lowercase letter and 1 number"
        />
        <FormLabel>Whitelist IP Address for BO</FormLabel>
        {(whitelistIP || []).map((item, index) => (
          <div className={classes.whitelistIPLine} key={index}>
            <IPAddressInput
              apiWLIP={item}
              onChange={onChangeWhitelistIp}
              rowIndex={index}
            />
            {whitelistIP.length - 1 === index ? (
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
            )}
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
      {isLoading && <Loading />}
    </ContentCardPage>
  );
};

export default BrandEdit;
