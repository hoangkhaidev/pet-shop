import { string, bool, object, func, number } from 'prop-types';
import { Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import isEmpty from 'lodash/isEmpty';
import InputAdornment from '@material-ui/core/InputAdornment';
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

const InputFieldTime = ({
  endText,
  required,
  defaultValue,
  pattern,
  maxLength,
  id,
  label,
  rows,
  minLength,
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
      return errors.message = 'Duplicate role name';
    }
    if (errors.message === 'err:invalid_role_name') {
      return errors.message = 'Invalid role name (Max 100 characters)';
    }
    if (errors.message === 'err:invalid_password') {
      return errors.message = 'Invalid password';
    }
    if (errors.message === 'err:confirm_password_mismatch') {
      return errors.message = 'Confirm Password mismatch';
    }
    if (errors.message === 'err:invalid_brand_ids') {
      return errors.message = 'Please select brand';
    }
    if (errors.message === 'err:duplicate_username') {
      return errors.message = 'Duplicate username';
    }
    if (errors.message === 'err:duplicate_operator_name') {
      return errors.message = 'Duplicate name';
    }
    if (errors.message === 'err:invalid_email') {
      return errors.message = 'Invalid email';
    }
    if (errors.message === 'err:invalid_product_ids') {
      return errors.message = 'Invalid product';
    }
    if (errors.message === 'err:invalid_ip_address') {
      return errors.message = 'Invalid IP address';
    }
    if (errors.message === 'err:incorrect_password') {
      return errors.message = 'Incorrect password';
    }
    if (errors.message === 'err:username_not_found') {
      return errors.message = 'Account not found';
    }
    if (errors.type === 'required') {
      return 'Field is required.';
    }
    if (errors.type === 'minLength') {
      return `min is ${minLength}.`;
    }
    if (errors.type === 'pattern') {
    }
    return errors.message;
  };

  const handlerTimeChange = (event) => {
    let value = event.target.value;
    let regex = /^\d+(\.\d{0,0})?$/g;
    if (!regex.test(value)) {
      event.target.value = value.slice(0, -1)
    }

  }

  return (
    <div className={classes.inputField}>
      <FormControl error={!isEmpty(errors)} className={classes.formControl}>
        <Controller
          control={control}
          name={namefileld}
          render={({ field: { onChange, onBlur, name, ref, value } }) => {
            return (
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
                onChange={handlerTimeChange}
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
                  endAdornment: <InputAdornment position="end">{endText}</InputAdornment>,
                }}
              />
            )}
          }
          rules={{
            required,
            maxLength,
            pattern,
            defaultValue,
            minLength
          }}
        />
        {!isEmpty(errors) && <FormHelperText>{renderErrors()}</FormHelperText>}
      </FormControl>
    </div>
  );
};

InputFieldTime.propTypes = {
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

InputFieldTime.defaultProps = {
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

export default InputFieldTime;
