/* eslint-disable no-return-assign */
/* eslint-disable dot-notation */
/* eslint-disable import/first */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable arrow-body-style */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import NumberFormat from 'react-number-format';
import { func, string, number, object, bool } from 'prop-types';
import { Controller } from 'react-hook-form';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles(() => ({
  
  formControl: {
    width: '100%',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    paddingBottom: '3px',
  },

  labelStyle: {
    color: 'red',
  },
}));

const NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
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

const InputNumber = ({
  label,
  pattern,
  control,
  namefileld,
  id,
  styles,
  errors,
  required,
  InputProps,
  helperText,
  defaultValue,
  ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const renderErrors = () => {
    if (isEmpty(errors)) {
      return '';
    }
    
    if (errors.type === 'required') {
      return t('required');
    }

    if (errors.type === 'pattern') {
    }

    return t(errors.message);
  };

  const value = control?.["_fields"]?.[namefileld]?.["_f"]?.value;

  return (
    <div className={classes.inputField}>
      <FormControl
        sx={{ 
          px: 2, 
          mt: '16px',
          mb: '8px',
          input: {
            background: '#ffffff',
          },
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
                      {required ? ' *' : ''}
                    </span>
                  </div>
                }
                id={id}
                control={control}
                error={!isEmpty(errors)}
                style={styles}
                decimalScale={0}
                decimalSeparator="."
                customInput={TextField}
                defaultValue={defaultValue}
                value={value}
                inputProps={{
                    maxLength: 15,
                }}
                allowNegative={true}
                onValueChange={(values) => {
                    onChange({ target: { name, value: values.floatValue } });
                }}
                maxLength={15}
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

InputNumber.propTypes = {
  label: string.isRequired,
  maxLength: number,
  namefileld: string.isRequired,
  styles: object,
  errors: object,
  required: bool,
  helperText: string,
};

InputNumber.defaultProps = {
  maxLength: undefined,
  styles: null,
  errors: {},
  required: false,
  helperText: null,
};

export default InputNumber;
