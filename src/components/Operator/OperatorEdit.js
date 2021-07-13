/* eslint-disable react/jsx-no-duplicate-props */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import remove from 'lodash/remove';
import get from 'lodash/get';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { toast } from 'react-toastify';

import NoPermissionPage from 'src/components/NoPermissionPage/NoPermissionPage';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import { FormattedNumberInputComission } from 'src/components/shared/InputField/InputFieldNumber';
import InputField from 'src/components/shared/InputField/InputField';
import Loading from 'src/components/shared/Loading/Loading';
import IPAddressInput from 'src/components/shared/IPAddressInput/IPAddressInput';
import TitlePage from 'src/components/shared/TitlePage/TitlePage';

import ButtonGroup, {
  SubmitButton,
  ResetButton,
} from 'src/components/shared/Button/Button';
import useFetchData from 'src/utils/hooks/useFetchData';
import useRouter from 'src/utils/hooks/useRouter';

import api from 'src/utils/api';
import SelectField from '../shared/InputField/SelectField';

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
}));

const OperatorEdit = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [whitelistIP, setWhitelistIP] = useState([['', '', '', '']]);
  const [apiWLIP, setAPIWLIP] = useState(['', '', '', '']);
  const [financeEmail, setFinanceEmail] = useState([]);
  const [productData, setProductData] = useState([]);
  const [data, setData] = useState(null);
  const router = useRouter();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
    reset
  } = useForm();

  const { dataResponse, isLoading, isHasPermission } = useFetchData(
    `/api/operators/${router.query?.id}`,
    null
  );

  useEffect(() => {
    setData(dataResponse);
    const formatWhitelistIP = dataResponse?.whitelist_ips?.map((ip) =>
      ip.split('.')
    );
    const formatApiWLIP = dataResponse?.api_white_list_ip?.split('.');
    setFinanceEmail(get(dataResponse, 'finance_emails', []));
    if (formatWhitelistIP?.length && formatWhitelistIP?.length !== 0) {
      setWhitelistIP(formatWhitelistIP);
    };
    setAPIWLIP(formatApiWLIP);
  }, [dataResponse]);

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

  const finance_email = watch('finance_email', '');
  const commission = watch('commission', '');

  const onSubmit = async (dataForm) => {
    console.log(dataForm);
    const formatWLIPEndpoint = apiWLIP.join('.');
    const formatWLIPs = whitelistIP.map((item) => {
      const joinStr = item.join('.');
      return joinStr;
    });
    const form = {
      ...dataForm,
      commission: String(data.commission),
      accountId: data.accountId,
      api_whitelist_ip: formatWLIPEndpoint,
      whitelist_ips: formatWLIPs,
      finance_email: financeEmail,
      account_type: 'operator',
    };
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

  useEffect(() => {
    if (commission > 100) {
      setValue('commission', 100);
    }
  }, [commission, setValue]);

  useEffect(() => {
    if (data) {
      setValue('name', data?.operator_name);
      setValue('support_email', data?.support_email);
      setValue('username', data?.username);
      setValue('api_endpoint', data?.api_endpoint);
      setValue('commission', data?.commission);
    }
  }, [data, setValue]);

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

  const onChangeAPIEndpointIP = (e, index) => {
    const { formattedValue } = e;
    const cloneArr = apiWLIP.slice();
    cloneArr[index] = formattedValue;
    setAPIWLIP(cloneArr);
  };

  const onRemoveWLIPAddress = (rowIndex) => {
    const cloneArr = whitelistIP.slice();
    remove(cloneArr, (item, index) => rowIndex === index);
    setWhitelistIP(cloneArr);
  };

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  const onReset = () => {
    setWhitelistIP([['', '', '', '']]);
    setAPIWLIP(['', '', '', '']);
    setFinanceEmail([]);
    reset({
        name: '',
        support_email: '',
        commission: 0,
        product_ids: [],
        api_endpoint: '',
        username: '',
        password: '',
        password_confirmation: '',
    });
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
        <FormattedNumberInputComission
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
        />

        { productData?.length && <SelectField
          namefileld="product_ids"
          id="product_ids"
          label="Product"
          fullWidth={false}
          control={control}
          errors={errors?.product}
          options={productData}
          defaultValue={productData?.[0]?.value}
        />}

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
          readOnly
          namefileld="username"
          control={control}
          id="username"
          errors={errors?.username}
          type="text"
          label="Username"
          pattern={/^[a-z0-9_]{3,15}$/}
          helperText="Length from 3 to 15 chars, allow letter, digit and underscore(_)"
        />
        {/* <InputField
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
          namefileld="password_confirmation"
          control={control}
          id="password_confirmation"
          errors={errors?.password_confirmation}
          type="password"
          label="Confirm Password"
          pattern={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/}
          helperText="From 6 characters and at least 1 uppercase, 1 lowercase letter and 1 number"
        /> */}
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
        <ButtonGroup>
          <SubmitButton />
          <ResetButton onAction={() => onReset()}/>
        </ButtonGroup>
      </form>
      {isLoading && <Loading />}
    </ContentCardPage>
  );
};

export default OperatorEdit;
