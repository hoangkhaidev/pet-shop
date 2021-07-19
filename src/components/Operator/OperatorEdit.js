/* eslint-disable react/jsx-no-duplicate-props */
import { useState, useEffect, useMemo } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
// import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import remove from 'lodash/remove';
import get from 'lodash/get';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { toast } from 'react-toastify';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import clsx from 'clsx';

import NoPermissionPage from 'src/components/NoPermissionPage/NoPermissionPage';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
// import { FormattedNumberInputComission } from 'src/components/shared/InputField/InputFieldNumber';
import InputField from 'src/components/shared/InputField/InputField';
import Loading from 'src/components/shared/Loading/Loading';
import IPAddressInput from 'src/components/shared/IPAddressInput/IPAddressInput';
import TitlePage from 'src/components/shared/TitlePage/TitlePage';

import ButtonGroup, {
  SubmitButton,
  // ResetButton,
} from 'src/components/shared/Button/Button';
import useFetchData from 'src/utils/hooks/useFetchData';
import useRouter from 'src/utils/hooks/useRouter';

import api from 'src/utils/api';
// import SelectField from '../shared/InputField/SelectField';
import { Checkbox, FormControlLabel, InputAdornment } from '@material-ui/core';
import FormattedNumberInput from '../shared/InputField/InputFieldNumber';
import { cloneDeep, map } from 'lodash';
import ClearAllIcon from '@material-ui/icons/ClearAll';

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
}));

const OperatorEdit = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const router = useRouter();
  const navigate = useNavigate();

  const { dataResponse, isLoading, isHasPermission } = useFetchData(
    `/api/operators/${router.query?.id}`,
    null
  );

  const { dataResponse: dataProduct } = useFetchData('/api/product');

  const initFormState = {
    apiWLIP: ['', '', '', ''],
    data: [],
    financeEmails: [],
    productData: [],
    whitelistIP: [['', '', '', '']]
  }

  const [formState, setFormState] = useState(initFormState);

  const product_commission = useMemo(() => formState.data?.product_commission, [formState]);
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
    register,
    setError,
    // reset,
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
    const formatWhitelistIP = dataResponse?.whitelist_ips?.map((ip) => ip.split('.'));
    const formatApiWLIP = dataResponse?.api_whitelist_ip?.split('.');
    const newFormState = {
      ...formState,
      apiWLIP: formatApiWLIP,
      data: dataResponse,
      financeEmails: get(dataResponse, 'finance_emails', []),
      whitelistIP: formatWhitelistIP?.length > 0 ? formatWhitelistIP : formState.formatWhitelistIP,
    }
    setFormState(newFormState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataResponse]);
  
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
    const newFormState = {
      ...formState,
      productData: mapData
    };
    setFormState(newFormState);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataProduct]);

  useEffect(() => {
    if (formState.data) {
      setValue('commission', product_commission_new);

      setValue('name', formState.data?.operator_name);
      setValue('support_email', formState.data?.support_email);
      setValue('username', formState.data?.username);
      setValue('api_endpoint', formState.data?.api_endpoint);
      setValue('password', formState.data?.password);
      setValue('password_confirmation', formState.data?.password_confirmation);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState, setValue]);

  const onSubmit = async (dataForm) => {
    const defaultPro = cloneDeep(formState.data.product_commission);
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

    const formatWLIPEndpoint = formState.apiWLIP.join('.');
    const formatWLIPs = formState.whitelistIP.map((item) => {
      const joinStr = item.join('.');
      return joinStr;
    });
    const form = {
      ...dataForm,
      api_whitelist_ip: formatWLIPEndpoint,
      whitelist_ips: formatWLIPs,
      finance_emails: formState.financeEmails,
      password: formState.data?.password,
      password_confirmation: formState.data?.password_confirmation,
      product_commission: product_commission,
    };
    try {
      console.log(form);
      let response = await api.post(
        `/api/operators/${router.query?.id}/update`,
        form
      );
      if (get(response, 'success', false)) {
        toast.success('Update operator Success', {
          onClose: navigate('/operator/list'),
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
  };

  const addingFinanceEmail = () => {
    if (finance_emails) {
      const arrCloneFinanceEmail = formState.financeEmails.slice();
      setFormState({
        ...formState,
        financeEmails: [...arrCloneFinanceEmail, finance_emails]
      });
      setValue('finance_emails', '');
    }
  };

  const onRemoveFinanceEmail = (email) => {
    const cloneArr = formState.financeEmails.slice();
    remove(cloneArr, (item) => item === email);
    setFormState({
      ...formState,
      financeEmails: cloneArr
    });
  };

  const onChangeWhitelistIp = (e, index, rowIndex) => {
    const { formattedValue } = e;
    const cloneArr = formState.whitelistIP.slice();
    cloneArr[rowIndex][index] = formattedValue;
    setFormState({
      ...formState,
      whitelistIP: cloneArr
    });
  };

  const onAddingWLIPAddress = () => {
    const cloneArr = formState.whitelistIP.slice();
    const newArray = [...cloneArr, ['', '', '', '']];
    if (newArray.length <= 20 ){
      setFormState({
        ...formState,
        whitelistIP: newArray
      });
    }
  };

  const onChangeAPIEndpointIP = (e, index) => {
    const { formattedValue } = e;
    const cloneArr = formState.apiWLIP.slice();
    cloneArr[index] = formattedValue;
    setFormState({
      ...formState,
      apiWLIP: cloneArr
    });
  };

  const onRemoveWLIPAddress = (rowIndex) => {
    const cloneArr = formState.whitelistIP.slice();
    remove(cloneArr, (item, index) => rowIndex === index);
    setFormState({
      ...formState,
      whitelistIP: cloneArr
    });
  };

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  const onCancel = () => {
    navigate('/operator/list');
  }

  return (
    <ContentCardPage>
      <TitlePage title="Edit Operator" />
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '50%' }}>
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
          helperText="Length 3 - 15 chars, allow letter (lowercase), digit and underscore(_)"
        />
        <InputField
          required
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
        <div className={classes.rootChip}>
          {formState.financeEmails.map((email) => (
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
          errors={errors.commission}
          required
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          pattern={/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/}
          helperText="From 0% to 100%"
        /> */}

        {/* { productData?.length && <SelectField
          namefileld="product_ids"
          id="product_ids"
          label="Product"
          fullWidth={false}
          control={control}
          errors={errors?.product}
          options={productData}
          defaultValue={productData?.[0]?.value}
        />} */}

        <FormLabel component="legend">Product</FormLabel>
        <FormControl className={classes.w100}>
          {formState.productData.map((item, index) => {
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
                      inputRef={register}
                      defaultValue={checked}
                      render={(props) => {
                        return (
                          <Checkbox
                            checked={props.field.value}
                            value={item.id}
                            onChange={(e) => props.field.onChange(e.target.checked)}
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
                      required
                      defaultValue={commissionValue}
                      helperText="From 0% to 100%"
                      {...register(`commission.${index}.value`)} 
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
        <FormLabel>Whitelist IP Address for API</FormLabel>
        <IPAddressInput apiWLIP={formState.apiWLIP} onChange={onChangeAPIEndpointIP} />
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
          readOnly
          namefileld="username"
          id="username"
          control={control}
          errors={errors?.username}
          type="text"
          label="Username"
          pattern={/^[a-z0-9_]{3,15}$/}
          helperText="Length from 3 to 15 chars, allow letter, digit and underscore(_)"
        />
        <InputField
          namefileld="password"
          control={control}
          required
          id="password"
          errors={errors?.password}
          type="password"
          label="Password"
          pattern={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/}
          helperText="From 6 characters and at least 1 uppercase, 1 lowercase letter and 1 number"
        />
        <InputField
          namefileld="password_confirmation"
          control={control}
          required
          id="password_confirmation"
          errors={errors?.password_confirmation}
          type="password"
          label="Confirm Password"
          pattern={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/}
          helperText="From 6 characters and at least 1 uppercase, 1 lowercase letter and 1 number"
        />
        <FormLabel>Whitelist IP Address for BO</FormLabel>
        {(formState.whitelistIP || []).map((item, index) => (
          <div className={classes.whitelistIPLine} key={index}>
            <IPAddressInput
              apiWLIP={item}
              onChange={onChangeWhitelistIp}
              rowIndex={index}
            />
            {formState.whitelistIP.length - 1 === index ? (
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
          {/* <ResetButton onAction={() => onReset()}/> */}
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

export default OperatorEdit;
