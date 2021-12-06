import { string, bool, object, func, number } from 'prop-types';
import { Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import isEmpty from 'lodash/isEmpty';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  inputField: {
    margin: '16px 0',
  },
  formControl: {
    width: '100%',
  },
  labelStyle: {
    color: 'red',
  },
}));

const InputField = ({
  required,
  defaultValue,
  pattern,
  maxLength,
  id,
  label,
  rows,
  isHasInputProps,
  callbackInputProps,
  autoFocus,
  control,
  errors,
  namefileld,
  type,
  styles,
  helperText,
  readOnly,
  multiline,
  disabled,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const renderErrors = () => {
    if (isEmpty(errors)) {
      return '';
    }
    if (errors.message === 'err:duplicate_role_name') {
      return errors.message = t('duplicate_role_name');
    }
    if (errors.message === 'err:invalid_role_name') {
      return errors.message = t('invalid_role_name');
    }
    if (errors.message === 'err:invalid_password') {
      return errors.message = t('invalid_password');
    }
    if (errors.message === 'err:invalid_old_password') {
      return errors.message = t('invalid_old_password');
    }
    if (errors.message === 'err:confirm_password_mismatch') {
      return errors.message = t('confirm_password_mismatch');
    }
    if (errors.message === 'err:invalid_brand_ids') {
      return errors.message = t('invalid_brand_ids');
    }
    if (errors.message === 'err:duplicate_username') {
      return errors.message = t('duplicate_username');
    }
    if (errors.message === 'err:duplicate_operator_name') {
      return errors.message = t('duplicate_operator_name');
    }
    if (errors.message === 'err:invalid_email') {
      return errors.message = t('invalid_email');
    }
    if (errors.message === 'err:invalid_product_ids') {
      return errors.message = t('invalid_product_ids');
    }
    if (errors.message === 'err:invalid_ip_address') {
      return errors.message = t('invalid_ip_address');
    }
    if (errors.message === 'err:incorrect_password') {
      return errors.message = t('incorrect_password');
    }
    if (errors.message === 'err:username_not_found') {
      return errors.message = t('username_not_found');
    }
    if (errors.message === 'err:locked_account') {
      return errors.message = t('locked_account');
    }
    if (errors.message === 'err:banned_account') {
      return errors.message = t('banned_account');
    }
    if (errors.message === 'err:login_different_device') {
      return errors.message = t('login_different_device');
    }
    if (errors.message === 'err:inactive_account') {
      return errors.message = t('inactive_account');
    }
    if (errors.type === 'required') {
      return t('required');
    }
    if (errors.type === 'maxLength') {
    }

    if (errors.type === 'pattern') {
    }

    return errors.message;
  };

  return (
    <div className={classes.inputField}>
      <FormControl error={!isEmpty(errors)} className={classes.formControl}>
        <Controller
          control={control}
          name={namefileld}
          render={({ field: { onChange, onBlur, name, ref, value } }) => (
            <TextField
              disabled={disabled}
              autoFocus={autoFocus}
              style={styles}
              type={type}
              id={id}
              label={
                <div>
                  {label}
                  <span className={classes.labelStyle}>
                    {required ? '*' : ''}
                  </span>
                </div>
              }
              fullWidth
              inputRef={ref}
              onBlur={onBlur}
              onChange={onChange}
              name={name}
              helperText={t(helperText)}
              defaultValue={value}
              autoComplete="off"
              error={!isEmpty(errors)}
              size="medium"
              rows={rows}
              multiline={multiline}
              InputLabelProps={{
                shrink: !!value,
              }}
              InputProps={{
                readOnly,
                endAdornment: isHasInputProps ? (
                  <InputAdornment position="start">
                    <IconButton aria-label={label} onClick={callbackInputProps}>
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  ''
                ),
              }}
            />
          )}
          rules={{
            required,
            maxLength,
            pattern,
            defaultValue
          }}
        />
        {!isEmpty(errors) && <FormHelperText>{renderErrors()}</FormHelperText>}
      </FormControl>
    </div>
  );
};

InputField.propTypes = {
  type: string,
  rows: number,
  label: string,
  namefileld: string,
  id: string,
  required: bool,
  styles: object,
  errors: object,
  isHasInputProps: bool,
  callbackInputProps: func,
  autoFocus: bool,
  helperText: string,
  readOnly: bool,
  multiline: bool,
  disabled: bool,
};

InputField.defaultProps = {
  type: 'text',
  rows: 1,
  label: '',
  namefileld: '',
  id: '',
  required: false,
  disabled: false,
  styles: {},
  errors: {},
  isHasInputProps: false,
  callbackInputProps: () => {},
  autoFocus: false,
  helperText: '',
  readOnly: false,
  multiline: false,
};

export default InputField;
