/* eslint-disable import/no-duplicates */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import CurrencyComfirm from './CurrencyComfirm';
import { validate } from 'validate.js';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import useRouter from 'utils/hooks/useRouter';
import useFetchData from 'utils/hooks/useFetchData';
import api from 'utils/api';
import { cloneDeep } from 'lodash';
import { Button, Checkbox, FormLabel, InputLabel, Select } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import TitlePage from 'views/TitlePage/TitlePage';
import { FormControl } from '@mui/material';
import AdjustIcon from '@mui/icons-material/Adjust';

const schema = {
  copy_brand_id: {
    presence: { allowEmpty: false, message: 'is required' },
  },
}

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
  checkHelperText: {
    color: 'red !important',
    paddingTop: '5px !important',
    fontStyle: 'italic',
  },
  checkTitleText: {
    paddingTop: '5px !important',
  },
  selectField: {
    margin: '16px 0',
  },
  formControl: {
    width: '100%',
    paddingBottom: '20px !important',
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    }
  },
  labelStyle: {
    color: 'red',
  },
  checkHelperError: {
    color: 'red !important',
    fontSize: '12px !important',
    marginLeft: '15px',
    paddingTop: '5px !important'
  },
  titlePad: {
    paddingLeft: '2rem', 
    paddingTop: '10px',
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      paddingLeft: '0',
    }
  },
  titleChild: {
    paddingLeft: '6rem',
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      paddingLeft: '1rem !important',
    }
  },
  w500: {
    width: '500px',
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    }
  }
}));

const GameParamCloning = ({ setValue }) => {
  const router = useRouter();
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { dataResponse: dataBrand } = useFetchData(`/api/brand/public_list`, null);
  const [dataBrands, setDataBrands] = useState([]);

  const initFormState = {
    isValid: false,
    values: {
      overwrite: false,
      include_all_currencies: false,
      copy_brand_id: '',
      current_brand_id: Number(router.query.id),
    },
    errors: {},
    touched: {}
  };

  const [formState, setFormState] = useState(initFormState);
  
  const handleChangeOverwrite = (event) => {
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
      }
    });
  }

  const handleChangeInclude_all_currencies = (event) => {
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
      }
    });
  }

  const handleChangeBrand = (event) => {
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    });
  }

  const onSubmit = async (currency_codes) => {
    
    if (formState.isValid === true) {
      const form = {
        ...formState.values,
        copy_brand_id: Number(formState.values.copy_brand_id),
        currency_codes: currency_codes ? [currency_codes] : [],
      };
      try {
        let response = await api.post('/api/global/brand_detail/clone', form);
        if (get(response, 'success', false)) {
          toast.success('Game Param Cloning Success', {
            onClose: navigate('/global/group_brand?'),
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
        }
      } catch (e) {
        console.log('e', e);
      }
    } else{
      setFormState({
        ...formState,
        touched: {
          ...formState.touched,
          copy_brand_id: true
        }
      });
    }
  };

  useEffect(() => {
    let mapData = [];
    let dataBrandList = cloneDeep(dataBrand);
    dataBrandList.forEach((data) => {
      let optionData = {
        id: data.brand_id,
        value: data.brand_id,
        label: data.username,
      };
      mapData.push(optionData);
    });
    setDataBrands([...mapData]);
  }, [dataBrand]);

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const hasError = (field) => formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <MainCard>
      <form className={classes.formStyle}>
        <FormLabel component="legend" className={classes.checkHelperText}>
          Please be careful changing these settings
        </FormLabel>
        <FormLabel component="legend" className={classes.checkTitleText}>
          Use this to make a copy from another Brand. The current brand will be able to modify the copied params.
        </FormLabel>
        <div className={classes.titlePad}>
          <TitlePage title="Warning" />
          <div className={classes.titleChild} style={{ paddingLeft: '6rem' }}>
            <div>
              <Checkbox
                type="checkbox"
                color="primary"
                name="overwrite"
                checked={formState?.values?.overwrite}
                onChange={handleChangeOverwrite}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              <span className={classes.checkboxStyle}>Overwrite / Merge</span>
            </div>
            <div>
              <Checkbox
                type="checkbox"
                color="primary"
                name="include_all_currencies"
                checked={formState?.values?.include_all_currencies}
                onChange={handleChangeInclude_all_currencies}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              <span className={classes.checkboxStyle}>Include all currencies</span>
            </div>
          </div>
          <TitlePage title="Copy from this brand" />
          <div className={classes.w500} >
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Brand
                <span className={classes.labelStyle}>*</span>
              </InputLabel>
              <Select
                native
                value={formState?.values?.copy_brand_id}
                onChange={handleChangeBrand}
                label="Brand"
                name="copy_brand_id"
                sx={{
                  background: '#ffffff',
                  '& .MuiNativeSelect-select': {
                    background: '#ffffff',
                  }
                }}
                error={hasError('copy_brand_id')}
              >
                <option aria-label="None" value="" />
                {dataBrands?.map((item) => (
                  <option key={item.id} value={item.value}>{item.label}</option>
                ))}
              </Select>
              <FormLabel component="legend" className={classes.checkHelperError}>
                { hasError('copy_brand_id') ? formState.errors.copy_brand_id[0] : null }
              </FormLabel>
            </FormControl>
          </div>
          { formState.isValid && formState?.values?.include_all_currencies === false ?
            <CurrencyComfirm 
              onSubmit={onSubmit} 
              include_all_currencies={formState?.values?.include_all_currencies} 
            />
          : <Button 
              variant="contained" 
              color="primary" 
              onClick={() => onSubmit()}
              startIcon={<AdjustIcon fontSize="small" />}
            >
              Copy
            </Button>
          }
        </div>
      </form>
    </MainCard>
  );
};

export default GameParamCloning;
