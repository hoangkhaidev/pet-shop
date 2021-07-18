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
  ResetButton,
} from 'src/components/shared/Button/Button';
import Loading from 'src/components/shared/Loading/Loading';
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
  }
  
}));

const BrandCreate = () => {
  const { dataResponse } = useFetchData('/api/operators');
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
    reset
  } = useForm();

  const finance_email = watch('finance_email');
  const commission = watch('commission');

  useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "commission", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const [financeEmail, setFinanceEmail] = useState([]);
  const [apiWLIP, setAPIWLIP] = useState(['', '', '', '']);
  const [whitelistIP, setWhitelistIP] = useState([['', '', '', '']]);
  const [operatorData, setOperatorData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [checkboxListCheck, setCheckboxListCheck] = useState(productData.map((item) => false ));

  useEffect(() => {
    if (dataProduct.length <= 0) return;
    let mapdata = [];
    dataProduct.forEach((data) => {
      let optionData = {
        id: data.id,
        value: data.id,
        label: data.name,
      };
      mapdata.push(optionData);
    });
    setProductData([...mapdata]);
  }, [dataProduct]);

  useEffect(() => {
    const data = dataResponse?.list;
    if (!data) return;
    let mapdata = [];
    data.forEach((data) => {
      let optionData = {
        id: data.operator_id,
        value: data.operator_id,
        label: data.username,
      };
      mapdata.push(optionData);
    });
    setOperatorData([...mapdata]);
  }, [dataResponse]);

  useEffect(() => {
    if (commission > 100) {
      setValue('commission', 100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commission, setValue]);

  useEffect(() => {
    console.log(operatorData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operatorData]);

  const onRemoveFinanceEmail = (email) => {
    const cloneArr = financeEmail.slice();
    remove(cloneArr, (item) => item === email);
    setFinanceEmail(cloneArr);
  };

  const onChangeAPIEndpointIP = (e, index) => {
    const { formattedValue } = e;
    const cloneArr = apiWLIP.slice();
    cloneArr[index] = formattedValue;
    setAPIWLIP(cloneArr);
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
      setValue('finance_email', '');
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
    console.log(dataForm);
    const product_form = dataForm.commission.filter((item) => item.checked === true );
    const product_commission = product_form.map((item) => {
      let arr = {
        product_id: Number(item.product_id),
        commission: String(item.value)
      }
      return arr;
    });
    const formatWLIPEndpoint = apiWLIP.join('.');
    const formatWLIPs = whitelistIP.map((item) => {
      const joinStr = item.join('.');
      return joinStr;
    });
    setIsLoading(true);
    delete dataForm.commission;
    const form = {
      ...dataForm,
      api_whitelist_ip: formatWLIPEndpoint,
      whitelist_ips: formatWLIPs,
      finance_emails: financeEmail,
      product_commission: product_commission,
    };
    console.log(form);
    try {
      const response = await api.post('/api/brand/create', form);
      if (get(response, 'success', false)) {
        toast.success('Update brand Success', {
          onClose: navigate('brand/list'),
        });
      } else {
        if (response?.err === 'err:form_validation_failed') {
          for (const field in response?.data) {
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
    setIsLoading(false);
  };

  const onReset = () => {
    setWhitelistIP([['', '', '', '']]);
    setAPIWLIP(['', '', '', '']);
    setFinanceEmail([]);
    setCheckboxListCheck([]);
    reset({
        name: '',
        support_email: '',
        api_endpoint: '',
        username: '',
        password: '',
        password_confirmation: '',
        commission: []
    });
  }

  return (
    <ContentCardPage>
      <TitlePage title="Create Brand" />
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formStyle}>
        <SelectField
          namefileld="operator_id"
          id="operator"
          label="Operator"
          required
          fullWidth={false}
          control={control}
          errors={errors?.operator}
          options={operatorData}
          defaultValue=""
          helperText="Operator is required"
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
          pattern={/^[a-z0-9_]{3,15}$/}
          helperText="length 3 - 15 chars, allow letter (lowercase), digit and underscore(_)"
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
          errors={errors?.finance_email}
          type="text"
          label="Finance Email"
          callbackInputProps={addingFinanceEmail}
          isHasInputProps
        />
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
        
        <FormLabel component="legend">Product</FormLabel>
        <FormControl className={classes.w100}>
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
                          inputRef={register}
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
                        inputProps={{
                          maxLength: 3,
                        }}
                        helperText="From 0% to 100%"
                        // register={register}
                        {...register(`commission.${index}.value`)}
                      />
                    : ''}
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
        <FormLabel>{t('Whitelist IP Address for API')}</FormLabel>
        <IPAddressInput apiWLIP={apiWLIP} onChange={onChangeAPIEndpointIP} />
        <Typography
          className={classes.operatorAdminLabel}
          variant="h6"
          component="h6"
          gutterBottom
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
          helperText="Length 3 - 15 chars, allow letter (lowercase), digit and underscore(_)"
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
          helperText="From 6 characters and at least 1 uppercase, 1 lowercase letter and 1 number"
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
          helperText="From 6 characters and at least 1 uppercase, 1 lowercase letter and 1 number"
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
        <ButtonGroup>
          <SubmitButton />
          <ResetButton onAction={() => onReset()} />
        </ButtonGroup>
      </form>
      {isLoading && <Loading />}
    </ContentCardPage>
  );
};

export default BrandCreate;
