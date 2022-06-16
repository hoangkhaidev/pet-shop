/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-empty */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { string, bool, object, func, number } from 'prop-types';
import { Controller } from 'react-hook-form';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@mui/styles';
import { FormControl, FormHelperText, InputAdornment, TextField } from '@mui/material';

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
    if (errors.type === 'required') {
      return t('required');
    }
    if (errors.type === 'maxLength') {
    }
    if (errors.type === 'pattern') {
    }
    return t(errors.message);
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
                    {required ? ' *' : ''}
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
