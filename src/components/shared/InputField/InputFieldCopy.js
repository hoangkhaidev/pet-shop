import { string, bool, object, func, number } from 'prop-types';
import { Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import isEmpty from 'lodash/isEmpty';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useTranslation } from 'react-i18next';
// import { Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

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

const InputFieldCopy = ({
  endText,
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
  onClick
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
              onClick={onClick}
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
                endAdornment: <InputAdornment position="end">
                          <FontAwesomeIcon 
                            icon={faCopy} 
                            size={'2x'} 
                            color={'#1cb13c'} 
                            title={endText} 
                            onClick={callbackInputProps}
                            style={{cursor: 'pointer'}}
                          />
                        {/* <Button variant="contained" color="primary" onClick={callbackInputProps}>{endText}</Button> */}
                    </InputAdornment>,
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

InputFieldCopy.propTypes = {
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

InputFieldCopy.defaultProps = {
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

export default InputFieldCopy;
