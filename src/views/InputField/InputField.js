/* eslint-disable no-else-return */
/* eslint-disable dot-notation */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
/* eslint-disable no-empty */
/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { makeStyles } from '@mui/styles';
import { isEmpty } from 'lodash';
import { string, bool, object, func, number } from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles(() => ({
    labelStyle: {
      color: 'red',
    },
}));

import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    Stack
} from '@mui/material';

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
  endAdornment
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { register, getValues } = useForm();

  const value = control?.["_fields"]?.[namefileld]?.["_f"]?.value;

  const renderErrors = () => {
    if (isEmpty(errors)) {
      return '';
    }
  
    if (errors.type === 'required') {
      return t(`${label} required`);
    }
    if (errors.type === 'maxLength') {
    }

    if (errors.type === 'pattern') {
      if (label === 'API Endpoint') {
        return t(`Invalid ${label}`);
      } else {
        return t(helperText);
      }
    }

    return t(errors.message);
  };

  return (
    <FormControl
      fullWidth
      error={!isEmpty(errors)}
      sx={{
        mt: '16px',
        mb: '7px',
        input: {
          background: '#ffffff',
        },
        '& .MuiOutlinedInput-root': {
          background: '#ffffff',
        },
        '& .Mui-disabled': {
          background: '#fafafa',
        },
        textarea: {
          background: '#ffffff',
        }
      }}
    >
            <Controller
                control={control}
                name={namefileld}
                render={({ field: { onChange, onBlur, name, ref, value } }) => (
                    <TextField
                        id={id}
                        type={type}
                        style={styles}
                        disabled={disabled}
                        autoFocus={autoFocus}
                        error={!isEmpty(errors)}
                        autoComplete="off"
                        name={name}
                        value={value}
                        readOnly={readOnly}
                        inputRef={ref}
                        onBlur={onBlur}
                        fullWidth
                        onChange={onChange}
                        label={
                          <div>
                            {label}
                            <span className={classes.labelStyle}>
                              {required ? ' *' : ''}
                            </span>
                          </div>
                        }
                        size="medium"
                        variant="outlined"
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
            {!isEmpty(errors) && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                    {renderErrors()}
                </FormHelperText>
            )}
            {isEmpty(errors) &&  (
              <FormHelperText id="accountId-error">
                {helperText}
              </FormHelperText>
            )}
    </FormControl>
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
