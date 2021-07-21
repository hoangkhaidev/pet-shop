/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-lonely-if */
/* eslint-disable react/jsx-no-duplicate-props */
import { useState, useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import Chip from '@material-ui/core/Chip';
import remove from 'lodash/remove';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import FormLabel from '@material-ui/core/FormLabel';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import InputField from 'src/components/shared/InputField/InputField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import ButtonGroup, {
  SubmitButton,
  ResetButton,
} from 'src/components/shared/Button/Button';
import TitlePage from 'src/components/shared/TitlePage/TitlePage';
// import { FormattedNumberInputComission } from 'src/components/shared/InputField/InputFieldNumber';
import IPAddressInput from 'src/components/shared/IPAddressInput/IPAddressInput';
import Loading from 'src/components/shared/Loading/Loading';
import api from 'src/utils/api';
import useFetchData from 'src/utils/hooks/useFetchData';
import FormattedNumberInput from '../shared/InputField/InputFieldNumber';
import clsx from 'clsx';

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
    width: '50%',
  },
  checkHelperText: {
    color: 'red !important',
    fontSize: '12px !important',
    marginLeft: '15px',
  }
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
    register,
    reset, 
  } = useForm();

  const [financeEmail, setFinanceEmail] = useState([]);
  const [whitelistIP, setWhitelistIP] = useState([['', '', '', '']]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiWLIP, setAPIWLIP] = useState(['', '', '', '']);
  const [productData, setProductData] = useState([]);
  const [checkboxListCheck, setCheckboxListCheck] = useState(productData.map((item) => false ));
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [checkProduct, setCheckProduct] = useState(false);

  const finance_email = watch('finance_email');
  // const commission = watch('commission');

  useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "commission", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const { dataResponse: dataProduct } = useFetchData('/api/product');

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
    setProductData([...mapData]);
  }, [dataProduct]);

  const onSubmit = async (data) => {
    if (checkboxListCheck.findIndex((item) => item === true) !== -1) {
      const product_form = data.commission.filter((item) => item.checked === true );
      const product_commission = product_form.map((item) => {
        return {
          product_id: Number(item.product_id),
          commission: String(item.value)
        };
      });
      const formatWLIPEndpoint = apiWLIP.join('.');
      // const formatWLIPs = whitelistIP.map((item) => {
      //   const joinStr = item.join('.');
      //   return joinStr;
      // });
      const formatWLIPs = whitelistIP.map((item) => {
        let check = false;
        item.map((item1) => {
          if (item1 === '') check = true;
          return item1;
        })
        if (check === true) item = null;
        else item = item.join('.');
        return item;
      }).filter((item) => item)

      setIsLoading(true);
      const form = {
        ...data,
        api_whitelist_ip: formatWLIPEndpoint,
        whitelist_ips: formatWLIPs,
        product_ids: [data.product_ids],
        finance_email: financeEmail,
        product_commission: product_commission,
      };
      delete form.commission;
      delete form.product_ids;
      console.log(form);

      try {
        const response = await api.post('/api/operators/create', form);
        // console.log(response);
        if (get(response, 'success', false)) {
          toast.success('Update operator Success', {
            onClose: navigate('operator/list'),
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
    }
  };

  // useEffect(() => {
  //   console.log(checkboxListCheck)
  // }, [checkboxListCheck]);

  // useEffect(() => {
  //   if (commission > 100) {
  //     setValue('commission', 100);
  //   }
  // }, [commission, setValue]);

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

  const onChangeAPIEndpointIP = (e, index) => {
    const { formattedValue } = e;
    const cloneArr = apiWLIP.slice();
    cloneArr[index] = formattedValue;
    setAPIWLIP(cloneArr);
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


  const onReset = () => {
    setWhitelistIP([['', '', '', '']]);
    setAPIWLIP(['', '', '', '']);
    setFinanceEmail([]);
    setCheckboxListCheck([]);
    reset({
        name: '',
        support_email: '',
        commission: [],
        api_endpoint: '',
        username: '',
        password: '',
        password_confirmation: '',
    });
  }

  return (
    <ContentCardPage>
      <TitlePage title="Create Operator" />
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
          helperText="Length 3 - 15 chars, allow letter (lowercase), digit and underscore(_)"
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
        {/* <FormattedNumberInputComission
          namefileld="commission"
          label="Comission"
          id="commission"
          control={control}
          allowLeadingZeros
          allowNegative={false}
          decimalScale={0}
          errors={errors.commission}
          required
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          pattern={/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/}
          inputProps={{
            maxLength: 3,
          }}
          helperText="From 0% to 100%"
        />

        <SelectField
          namefileld="product_ids"
          id="product_ids"
          label="Product"
          fullWidth={false}
          control={control}
          errors={errors?.product}
          options={productData}
          defaultValue=""
        /> */}

        <FormLabel component="legend">Product<span style={{color: 'red'}}>*</span></FormLabel>
        <FormControl className={classes.w100}>
          { (checkboxListCheck.findIndex((item) => item === true) === -1) &&
            checkProduct &&
            <FormLabel component="legend" className={classes.checkHelperText}>Product cannot be empty.</FormLabel>
          }
            {productData.map((item, index) => {
              return (
                <div key={item.id} style={{display: 'flex', width: '100%'}}>
                  <FormControlLabel
                    className={checkboxListCheck[index] ? classes.w40 : ''}
                    key={item.id}
                    style={{padding: '30px'}}
                    label={item?.label}
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
                        InputProps={{
                          endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        pattern={/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/}
                        inputProps={{
                          maxLength: 3,
                        }}
                        helperText="From 0% to 100%"
                        required
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
        <FormLabel>Whitelist IP Address for API</FormLabel>
        <IPAddressInput 
          requiredCheck={true} 
          apiWLIP={apiWLIP} 
          onChange={onChangeAPIEndpointIP} 
        />
        <Typography
          className={classes.operatorAdminLabel}
          variant="h6"
          component="h6"
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
          <div className={classes.whitelistIPLine} key={index}>
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
          <SubmitButton onClick={() => setCheckProduct(true)}/>
          <ResetButton onAction={() => onReset()} />
        </ButtonGroup>
      </form>
      {isLoading && <Loading />}
    </ContentCardPage>
  );
};

export default OperatorCreate;
