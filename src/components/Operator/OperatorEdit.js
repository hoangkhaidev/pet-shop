/* eslint-disable react/jsx-no-duplicate-props */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
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
import { toast } from "react-toastify";

import NoPermissionPage from "src/components/NoPermissionPage/NoPermissionPage";
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import FormattedNumberInput from 'src/components/shared/InputField/InputFieldNumber';
import InputField from 'src/components/shared/InputField/InputField';
import Loading from 'src/components/shared/Loading/Loading';
import IPAddressInput from 'src/components/shared/IPAddressInput/IPAddressInput';
import TitlePage from "src/components/shared/TitlePage/TitlePage";

import ButtonGroup, {
  SubmitButton,
  ResetButton
} from 'src/components/shared/Button/Button';
import useFetchData from 'src/utils/hooks/useFetchData';
import useRouter from 'src/utils/hooks/useRouter';

import api from "src/utils/api";

const useStyles = makeStyles((theme) => ({
  rootChip: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: `${theme.spacing(0.5)} !important`
    }
  },
  operatorAdminLabel: {
    marginTop: '16px !important',
    fontWeight: '600 !important'
  },
  whitelistIPLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

const OperatorEdit = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [whitelistIP, setWhitelistIP] = useState([['', '', '', '']]);
  const [apiWLIP, setAPIWLIP] = useState(['', '', '', '']);
  const [financeEmail, setFinanceEmail] = useState([]);
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
  } = useForm();

  const { dataResponse, isLoading, isHasPermission } = useFetchData(
    `/api/operators/${router.query?.id}`,
    null
  );

  useEffect(() => {
    setData(dataResponse);
    const formatWhitelistIP = dataResponse?.whitelistIPs?.map((ip) => ip.split('.'));
    const formatApiWLIP = dataResponse?.apiWhiteListIP?.split('.');
    setFinanceEmail(get(dataResponse, 'financeEmails', []));
    setWhitelistIP(formatWhitelistIP);
    setAPIWLIP(formatApiWLIP);
  }, [dataResponse]);

  const finance_email = watch('finance_email', '');
  const commission = watch('commission', '');

  const onSubmit = async (dataForm) => {
    const formatWLIPEndpoint = apiWLIP.join('.');
    const formatWLIPs = whitelistIP.map((item) => {
      const joinStr = item.join('.');
      return joinStr;
    });

    const form = {
      ...dataForm,
      accountId: data.accountId,
      api_whitelist_ip: formatWLIPEndpoint,
      whitelist_ips: formatWLIPs,
      finance_email: financeEmail,
      account_type: 'operator'
    };
    console.log("form", form);
    try {
      let response = await api.post(`/api/operators/${router.query?.id}/update`, form);

      if (get(response, 'data.success', false)) {
        toast.success("Update operator Success", {
          onClose: navigate("/operator/list")
        });
      } else {
        if (response?.err === 'err:form_validation_failed') {
          for (const field in response?.data) {
            console.log('field', field);
            setError(field, {
              type: 'validate',
              message: response?.data[field]
            });
          }
        }
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  useEffect(() => {
    if (commission > 100) {
      setValue('commission', 100);
    }
  }, [commission, setValue]);

  useEffect(() => {
    if (data) {
      setValue("name", data?.username);
      setValue("support_email", data?.supportEmail);
      setValue("username", data?.username);
      setValue("api_endpoint", data?.apiEndpoint);
      setValue("commission", data?.commission);
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
    setWhitelistIP(newArray);
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

  return (
    <ContentCardPage>
      <TitlePage title="Edit Operator" />
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '50%' }}>
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
            maxLength: 100
          }}
        />
        <InputField
          required
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
        <FormattedNumberInput
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
            endAdornment: <InputAdornment position="end">%</InputAdornment>
          }}
          inputProps={{
            maxLength: 3
          }}
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
          readOnly
          nameField="username"
          control={control}
          id="username"
          errors={errors?.username}
          type="text"
          label="Username"
        />
        <InputField
          nameField="password"
          control={control}
          id="password"
          errors={errors?.password}
          type="password"
          label="Password"
          helperText="From 6 characters and at least 1 uppercase, 1 lowercase letter and 1 number"
        />
        <InputField
          nameField="password_confirmation"
          control={control}
          id="password_confirmation"
          errors={errors?.password_confirmation}
          type="password"
          label="Confirm Password"
          helperText="From 6 characters and at least 1 uppercase, 1 lowercase letter and 1 number"
        />
        {(whitelistIP || []).map((item, index) => (
          <div
            className={classes.whitelistIPLine}
            key={index}
          >
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
          <ResetButton />
        </ButtonGroup>
      </form>
      {isLoading && <Loading />}
    </ContentCardPage>
  );
};

export default OperatorEdit;
