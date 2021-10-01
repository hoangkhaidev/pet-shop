import { useEffect, useState } from 'react';
import AdjustIcon from '@material-ui/icons/Adjust';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import api from 'src/utils/api';
import ContentCardPage from 'src/components/ContentCardPage/ContentCardPage';
import TitlePage from 'src/components/shared/TitlePage/TitlePage';
import { Checkbox, FormControl, InputLabel, Select } from '@material-ui/core';
import useFetchData from 'src/utils/hooks/useFetchData';
import cloneDeep from 'lodash.clonedeep';
import useRouter from 'src/utils/hooks/useRouter';
import CurrencyComfirm from './CurrencyComfirm';
import { validate } from 'validate.js';
import { useNavigate } from 'react-router-dom';

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
  },
  labelStyle: {
    color: 'red',
  },
  checkHelperError: {
    color: 'red !important',
    fontSize: '12px !important',
    marginLeft: '15px',
    paddingTop: '5px !important'
  }
}));

const GameParamCloning = ({ setValue }) => {
  const router = useRouter();
  const classes = useStyles();
  const navigate = useNavigate();

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
            toast.warn('Brand not found');
          }
          if (response?.err === 'err:account_not_found') {
            toast.warn('Brand not found');
          }
          if (response?.err === 'err:suspended_account') {
            toast.warn('Cannot perform action, your account has been suspended, please contact your upline');
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
    <ContentCardPage>
      <form className={classes.formStyle}>
        <FormLabel component="legend" className={classes.checkHelperText}>
          Please be careful changing these settings
        </FormLabel>
        <FormLabel component="legend" className={classes.checkTitleText}>
          Use this to make a copy from another Brand. The current brand will be able to modify the copied params.
        </FormLabel>
        <div style={{ paddingLeft: '2rem', paddingTop: '10px' }}>
          <TitlePage title="Warning" />
          <div style={{ paddingLeft: '6rem' }}>
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
          <div style={{ width: '500px' }}>
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
    </ContentCardPage>
  );
};

export default GameParamCloning;
