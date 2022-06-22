/* eslint-disable dot-notation */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import NumberFormat from 'react-number-format';
import { func, string, number, object, bool } from 'prop-types';
import { Controller } from 'react-hook-form';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@mui/styles';
import { FormControl, FormHelperText, TextField } from '@mui/material';

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
  },

  labelStyle: {
    color: 'red',
  },
}));

const NumberFormatCustom = (props) => {
  const { inputRef, defaultValue, disabled, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      disabled={disabled}
      defaultValue={defaultValue}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      maxLength={2}
    />
  );
};

NumberFormatCustom.propTypes = {
  inputRef: func.isRequired,
  name: string.isRequired,
  onChange: func.isRequired,
};

const InputNumberValue = ({
  label,
  pattern,
  control,
  namefileld,
  id,
  styles,
  errors,
  required,
  helperText,
  defaultValue,
  disabled,
  ...rest
}) => {
  const classes = useStyles();

  const renderErrors = () => {
    if (isEmpty(errors)) {
      return '';
    }
    if (errors.type === 'required') {
      return 'Field is required';
    }
    if (errors.type === 'pattern') {
    }
    return errors.message;
  };

  const value = control?.["_fields"]?.[namefileld]?.["_f"]?.value;

  return (
    <div>
      <FormControl
        sx={{ 
          px: 2, 
          mt: '4px',
          input: {
            background: '#ffffff',
          },
          '& .Mui-disabled': {
            background: '#fafafa',
          }
        }}
        error={!isEmpty(errors)}
        className={classes.formControl}
      >
        <Controller
          render={({ field: { onChange, onBlur, value, name, ref } }) => {
            return (
              <NumberFormat
                namefileld={namefileld}
                label={
                  <div>
                    {label}
                    <span className={classes.labelStyle}>
                      {required ? '*' : ''}
                    </span>
                  </div>
                }
                id={id}
                control={control}
                error={!isEmpty(errors)}
                disabled={disabled}
                style={styles}
                decimalScale={2}
                decimalSeparator="."
                customInput={TextField}
                defaultValue={defaultValue}
                value={value}
                allowNegative={true}
                onValueChange={(values) => {
                    // onChange({ target: { name, value: values.floatValue } });
                    values?.floatValue < 0 
                      ? onChange({ target: { name, value: 0 } }) 
                      : onChange({ target: { name, value: values.floatValue } });
                }}
                maxLength={3}
                helperText={helperText}
              />
            )
          } 
        }
          control={control}
          name={namefileld}
          rules={{
            required,
            pattern
          }}
          {...rest}
        />
        {!isEmpty(errors) && <FormHelperText>{renderErrors()}</FormHelperText>}
      </FormControl>
    </div>
  );
};

InputNumberValue.propTypes = {
  label: string.isRequired,
  maxLength: number,
  namefileld: string.isRequired,
  styles: object,
  errors: object,
  required: bool,
  helperText: string,
};

InputNumberValue.defaultProps = {
  maxLength: undefined,
  styles: null,
  errors: {},
  required: false,
  helperText: null,
};

export default InputNumberValue;
