/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import remove from 'lodash/remove';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { makeStyles } from '@mui/styles';
import api from 'utils/api';
import MainCard from 'ui-component/cards/MainCard';
import InputFieldCopy from 'views/InputField/InputFieldCopy';
import { Button, FormLabel, InputAdornment } from '@mui/material';
import IPAddressInput from 'views/IPAddressInput/IPAddressInput';
import InputField from 'views/InputField/InputField';
import { FormattedNumberInputNew } from 'views/InputField/InputFieldNumber';
import ButtonGroup, { CancelButton, SubmitButton } from 'views/Button/Button';
import useRouter from 'utils/hooks/useRouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

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
    marginBottom: '15px',
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
  btn_whitelist: {
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      minWidth: '50px !important',
    }
  }
}));

const Endpoint_Settings = ({ dataResponse, setValueTab }) => {
  const router = useRouter();
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    clearErrors,
  } = useForm();

  const [data, setData] = useState({});
  const [whitelistIP, setWhitelistIP] = useState([['', '', '', '']]);
  const [apiWLIP, setAPIWLIP] = useState([['', '', '', '']]);
  // const [errorWhiteIP, setErrorWhiteIP] = useState('');
  // const [errorApiWLIP, setErrorApiWLIP] = useState('');

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    let dataWhitelist_ips = get(dataResponse, 'whitelist_ips', ['...']);
    let dataWhitelist_apis = get(dataResponse, 'api_whitelist_ip', ['...']);

    if (dataWhitelist_ips < 20) {

      dataWhitelist_ips.push('...');
  
      if (!dataWhitelist_ips.length) {
        dataWhitelist_ips = ['...'];
      }
    }

    if (dataWhitelist_apis < 20) {

      dataWhitelist_apis.push('...');
  
      if (!dataWhitelist_apis.length) {
        dataWhitelist_apis = ['...'];
      }
    }
    const formatWhitelistIP = dataWhitelist_ips.map((ip) => ip.split('.'));
    const formatApiWLIP = dataWhitelist_apis.map((ip) => ip.split('.'));

    setAPIWLIP(formatApiWLIP?.length > 0 ? formatApiWLIP : apiWLIP);
    setData(dataResponse);
    setWhitelistIP(formatWhitelistIP?.length > 0 ? formatWhitelistIP : whitelistIP);
  }, [dataResponse]);

  useEffect(() => {
    if (data) {
        setValue('secret_key', data?.secret_key);
        setValue('api_key', data?.api_key);
        setValue('api_endpoint', data?.api_endpoint);
        setValue('manual_retry_refund_after_hours', data?.manual_retry_refund_after_hours);
        setValue('player_inactivity_logout_after_mins', data?.player_inactivity_logout_after_mins);
    }
  }, [data, setValue]);

  useEffect(() => {
    clearErrors('whitelist_ips');
  }, [whitelistIP]);

  useEffect(() => {
    clearErrors('api_whitelist_ip');
  }, [apiWLIP]);

  const onSubmit = async (data) => {

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
      ...data,
      api_whitelist_ip: formatWLIPEndpoint,
      whitelist_ips: formatWLIPs,
    };
    delete form.secret_key;
    delete form.api_key;

    try {
      let response = await api.post(`/api/global/brand_detail/${router.query?.id}/update`, form);
      if (get(response, 'success', false)) {
        toast.success('Update Brand Setting Success');
      } else {
        if (response?.err === 'err:no_permission') {
          toast.warn(t('no_permission'));
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
      console.log('e', e);
    }
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
    navigate('/global/group_brand');
  }

  return (
    <MainCard>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formStyle}>
        <InputField
          readOnly
          namefileld="secret_key"
          control={control}
          id="secret_key"
          errors={errors?.secret_key}
          type="text"
          label="Secret Key"
          endText="Copy"
          endAdornment={
            <InputAdornment position="end">
                  <FontAwesomeIcon 
                    icon={faCopy} 
                    size={'2x'} 
                    color={'#1cb13c'} 
                    title={'Copy'} 
                    onClick={() => {navigator.clipboard.writeText(data?.secret_key)}}
                    style={{cursor: 'pointer'}}
                  />
            </InputAdornment>
          }
        />
        <InputField
          readOnly
          namefileld="api_key"
          control={control}
          id="api_key"
          errors={errors?.api_key}
          type="text"
          label="API Key"
          endText="Copy"
          endAdornment={
            <InputAdornment position="end">
                  <FontAwesomeIcon 
                    icon={faCopy} 
                    size={'2x'} 
                    color={'#1cb13c'} 
                    title={'Copy'} 
                    onClick={() => {navigator.clipboard.writeText(data?.api_key)}}
                    style={{cursor: 'pointer'}}
                  />
            </InputAdornment>
          }
        />
        <FormLabel sx={{mb: '10px'}}>Whitelist IP Address for API <span style={{color: 'red'}}>*</span></FormLabel>

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
        <FormattedNumberInputNew
          required
          label="Player Inactivity Logout Time"
          control={control}
          namefileld="player_inactivity_logout_after_mins"
          errors={errors?.player_inactivity_logout_after_mins}
          id="player_inactivity_logout_after_mins"
          minLength={15}
          defaultValue={60}
          InputProps={{
            endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
          }}
        />
        <FormattedNumberInputNew
          required
          label="Manual retry/refund after"
          control={control}
          namefileld="manual_retry_refund_after_hours"
          errors={errors?.manual_retry_refund_after_hours}
          id="manual_retry_refund_after_hours"
          minLength={3}
          defaultValue={24}
          InputProps={{
            endAdornment: <InputAdornment position="end">Hours</InputAdornment>,
          }}
        />
        <FormLabel>{t('Whitelist IP Address for BO')}</FormLabel>
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
          <CancelButton onAction={() => onCancel()} text='Cancel'/>
        </ButtonGroup>
      </form>
    </MainCard>
  );
};

export default Endpoint_Settings;
