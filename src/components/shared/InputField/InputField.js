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
  // eslint-disable-next-line react/prop-types
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
    // console.log(errors)
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
    if (errors.message === 'err:locked_account') {
      return errors.message = 'Oops! your account has been locked.';
    }
    if (errors.message === 'err:banned_account') {
      return errors.message = 'Oops! your account has been banned.';
    }
    if (errors.message === 'err:login_different_device') {
      return errors.message = 'You are currently logged in from another device';
    }
    if (errors.message === 'err:inactive_account') {
      return errors.message = 'Oops! your account has been inactive. Please contact your upline for more information.';
    }
    if (errors.type === 'required') {
      return 'Field is required.';
    }
    if (errors.type === 'maxLength') {
    }
    // if (errors.type === 'minLength') {
    //   return 'Length 3 - 15 chars.';
    // }
    if (errors.type === 'pattern') {
      // return 'Length 3 - 15 chars, allow letter (lowercase), digit and underscore(_).';
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
