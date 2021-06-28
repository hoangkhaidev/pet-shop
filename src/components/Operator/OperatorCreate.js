/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-lonely-if */
/* eslint-disable react/jsx-no-duplicate-props */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
import SelectField from 'src/components/shared/InputField/SelectField';
import MultilpleSelectField from 'src/components/shared/InputField/MultipleSelectField';
import ButtonGroup, {
  SubmitButton,
  ResetButton,
} from 'src/components/shared/Button/Button';
import TitlePage from 'src/components/shared/TitlePage/TitlePage';
import { FormattedNumberInputComission } from 'src/components/shared/InputField/InputFieldNumber';
import IPAddressInput from 'src/components/shared/IPAddressInput/IPAddressInput';
import Loading from 'src/components/shared/Loading/Loading';
import api from 'src/utils/api';
import useFetchData from 'src/utils/hooks/useFetchData';

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
  } = useForm();
  const [financeEmail, setFinanceEmail] = useState([]);
  const [whitelistIP, setWhitelistIP] = useState([['', '', '', '']]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiWLIP, setAPIWLIP] = useState(['', '', '', '']);
  const [productData, setProductData] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const finance_email = watch('finance_email');
  const commission = watch('commission');

  const { dataResponse: dataProduct } = useFetchData('/api/product');

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

  const onSubmit = async (data) => {
    const formatWLIPEndpoint = apiWLIP.join('.');
    const formatWLIPs = whitelistIP.map((item) => {
      const joinStr = item.join('.');
      return joinStr;
    });
    setIsLoading(true);
    const form = {
      ...data,
      commission: String(data.commission),
      api_whitelist_ip: formatWLIPEndpoint,
      whitelist_ips: formatWLIPs,
      finance_email: financeEmail,
      account_type: 'operator',
    };
    try {
      const response = await api.post('/api/operators/create', form);
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
  };

  useEffect(() => {
    if (commission > 100) {
      setValue('commission', 100);
    }
  }, [commission, setValue]);

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
    setWhitelistIP(newArray);
  };

  const onRemoveWLIPAddress = (rowIndex) => {
    const cloneArr = whitelistIP.slice();
    remove(cloneArr, (item, index) => rowIndex === index);
    setWhitelistIP(cloneArr);
  };

  return (
    <ContentCardPage>
      <TitlePage title="Create Operator" />
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formStyle}>
        <InputField
          autoFocus
          required
          nameField="name"
          control={control}
          id="name"
          errors={errors?.name}
          type="text"
          label="Name"
          inputProps={{
            maxLength: 100,
          }}
          helperText="Length 4 - 15 chars, allow letter, digit and underscore()"
        />
        <InputField
          nameField="support_email"
          control={control}
          id="support_email"
          errors={errors?.support_email}
          type="text"
          label="Support Email"
        />
        <InputField
          nameField="finance_email"
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
        <FormattedNumberInputComission
          nameField="commission"
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
          inputProps={{
            maxLength: 3,
          }}
          helperText="From 0% to 100%"
        />
        <SelectField
          nameField="product"
          id="product"
          label="Product"
          fullWidth={false}
          control={control}
          errors={errors?.product}
          options={productData}
          defaultValue=""
        />

        <InputField
          required
          nameField="api_endpoint"
          control={control}
          id="api_endpoint"
          errors={errors?.api_endpoint}
          type="text"
          label="API Endpoint"
        />
        <FormLabel>Whitelist IP Address for API</FormLabel>
        <IPAddressInput apiWLIP={apiWLIP} onChange={onChangeAPIEndpointIP} />
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
          nameField="username"
          control={control}
          id="username"
          errors={errors?.username}
          type="text"
          label="Username"
          helperText="Length from 3 to 15 chars, allow letter, digit and underscore(_)"
        />
        <InputField
          required
          nameField="password"
          control={control}
          id="password"
          errors={errors?.password}
          type="password"
          label="Password"
          helperText="From 6 characters and at least 1 uppercase, 1 lowercase letter and 1 number"
        />
        <InputField
          required
          nameField="password_confirmation"
          control={control}
          id="password_confirmation"
          errors={errors?.password_confirmation}
          type="password"
          label="Confirm Password"
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
          <SubmitButton />
          <ResetButton />
        </ButtonGroup>
      </form>
      {isLoading && <Loading />}
    </ContentCardPage>
  );
};

export default OperatorCreate;
