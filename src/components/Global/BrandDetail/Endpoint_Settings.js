/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import remove from 'lodash/remove';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import FormLabel from '@material-ui/core/FormLabel';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import InputField from 'src/components/shared/InputField/InputField';
import ButtonGroup, {
  SubmitButton,
} from 'src/components/shared/Button/Button';
import IPAddressInput from 'src/components/shared/IPAddressInput/IPAddressInput';
import api from 'src/utils/api';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import InputFieldCopy from 'src/components/shared/InputField/InputFieldCopy';
import useRouter from 'src/utils/hooks/useRouter';
import { FormattedNumberInputNew } from 'src/components/shared/InputField/InputFieldNumber';
import { InputAdornment } from '@material-ui/core';

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
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    }
  },
  checkHelperText: {
    color: 'red !important',
    fontSize: '12px !important',
    marginLeft: '15px',
    paddingTop: '5px !important'
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
  } = useForm();

  const [data, setData] = useState({});
  const [whitelistIP, setWhitelistIP] = useState([['', '', '', '']]);
  const [apiWLIP, setAPIWLIP] = useState(['', '', '', '']);
  const [errorWhiteIP, setErrorWhiteIP] = useState('');
  const [errorApiWLIP, setErrorApiWLIP] = useState('');

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    let dataWhitelist_ips = get(dataResponse, 'whitelist_ips', ['...']);
    dataWhitelist_ips.push('...');

    if (!dataWhitelist_ips.length) {
      dataWhitelist_ips = ['...'];
    }
    const formatWhitelistIP = dataWhitelist_ips.map((ip) => ip.split('.'));
    const formatApiWLIP = dataResponse?.api_whitelist_ip?.split('.');

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
    setErrorWhiteIP('');
  }, [whitelistIP]);

  useEffect(() => {
    setErrorApiWLIP('');
  }, [apiWLIP]);

  const onSubmit = async (data) => {
    const formatWLIPEndpoint = apiWLIP.join('.');

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
        toast.success('Update Brand Setting Success', {
          onClose: navigate('/global/group_brand'),
        });
      } else {
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
            if (response?.data['api_whitelist_ip'] === 'err:invalid_ip_address') {
              setErrorApiWLIP(t('invalid_ip_address'));
            } else if (response?.data['whitelist_ips'] === 'err:invalid_ip_address') {
              setErrorWhiteIP(t('invalid_ip_address'));
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
      console.log('e', e);
    }
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

  const onCancel = () => {
    navigate('/global/group_brand');
  }

  // if (!isHasPermission) {
  //   return <NoPermissionPage />;
  // }

  return (
    <ContentCardPage>

      <form onSubmit={handleSubmit(onSubmit)} className={classes.formStyle}>
        
        <InputFieldCopy
          readOnly
          namefileld="secret_key"
          control={control}
          id="secret_key"
          errors={errors?.secret_key}
          type="text"
          label="Secret Key"
          endText="Copy"
          onClick={() => {navigator.clipboard.writeText(data?.secret_key)}}
        />
        <InputFieldCopy
          readOnly
          namefileld="api_key"
          control={control}
          id="api_key"
          errors={errors?.api_key}
          type="text"
          label="API Key"
          endText="Copy"
          onClick={() => {navigator.clipboard.writeText(data?.api_key)}}
        />
        <FormLabel>Whitelist IP Address for API<span style={{color: 'red'}}>*</span></FormLabel>
        <IPAddressInput 
          apiWLIP={apiWLIP} 
          onChange={onChangeAPIEndpointIP} 
        />
        <FormLabel component="legend" className={classes.checkHelperText}>{errorApiWLIP}</FormLabel>
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
        <FormLabel 
          component="legend" 
          className={classes.checkHelperText} 
          style={{paddingTop: '5px'}}
        >{errorWhiteIP}</FormLabel>
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
    </ContentCardPage>
  );
};

export default Endpoint_Settings;
