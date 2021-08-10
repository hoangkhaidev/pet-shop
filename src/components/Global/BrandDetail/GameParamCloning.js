/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-lonely-if */
/* eslint-disable react/jsx-no-duplicate-props */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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
import Loading from 'src/components/shared/Loading/Loading';
import api from 'src/utils/api';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import InputFieldTime from 'src/components/shared/InputField/InputFieldTime';
import InputFieldCopy from 'src/components/shared/InputField/InputFieldCopy';
import TitlePage from 'src/components/shared/TitlePage/TitlePage';
import { Checkbox } from '@material-ui/core';
import SelectField from 'src/components/shared/InputField/SelectField';

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
}));

const GameParamCloning = () => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // console.log(data)

    setIsLoading(true);
    
    const form = {
      ...data,
      product_ids: [data.product_ids],
    };
    delete form.commission;
    delete form.product_ids;
    // console.log(form);

    try {
      let response = await api.post('/api/operators/create', form);
      // console.log(response);
      if (get(response, 'success', false)) {
        toast.success('Create Operator Success', {
          onClose: navigate('/operator/list'),
        });
      } else {
        if (response?.err === 'err:form_validation_failed') {
          for (const field in response?.data) {
            // console.log(field);
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

  const onCancel = () => {
    navigate('/operator/list');
  }

  return (
    <ContentCardPage>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formStyle}>
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
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              <span className={classes.checkboxStyle}>Overwrite / Merge</span>
            </div>
            <div>
              <Checkbox
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
              <span className={classes.checkboxStyle}>Include all currencies</span>
            </div>
          </div>
          <TitlePage title="Copy" />
          <div style={{ width: '500px' }}>
            <SelectField
              namefileld="brand_id"
              id="brand_id"
              label="Brand"
              required
              fullWidth={false}
              control={control}
              errors={errors?.brand_id}
              defaultValue=""
            />
          </div>
          <Button 
            variant="contained" 
            color="primary" 
            style= {{ padding: '10px 30px', marginTop: '10px' }}
          >
            Copy
          </Button>
        </div>

      </form>
      {isLoading && <Loading />}
    </ContentCardPage>
  );
};

export default GameParamCloning;
