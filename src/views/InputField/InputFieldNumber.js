/* eslint-disable dot-notation */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
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
  inputField: {
    margin: '16px 0',
  },
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

const FormattedNumberInput = ({
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
  inputProps,
  defaultValue,
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
    return t(errors.message);
  };

  return (
    <div className={classes.inputField}>
      <FormControl
        sx={{ px: 2 }}
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
                style={styles}
                decimalScale={value >= 100 ? 0 : 2}
                decimalSeparator="."
                customInput={TextField}
                defaultValue={defaultValue}
                value={value}
                InputProps={InputProps}
                inputProps={{
                  maxLength: value >= 100 ? 3 : null,
                }}
                onValueChange={(values) => {
                  values?.floatValue > 100
                    ? onChange({ target: { name, value: 100 } })
                    : values?.floatValue < 0 
                      ? onChange({ target: { name, value: 0 } }) 
                      : onChange({ target: { name, value: values.floatValue } });
                }}
                maxLength={value >= 100 ? 3 : null}
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

FormattedNumberInput.propTypes = {
  label: string.isRequired,
  maxLength: number,
  namefileld: string.isRequired,
  styles: object,
  errors: object,
  required: bool,
  helperText: string,
};

FormattedNumberInput.defaultProps = {
  maxLength: undefined,
  styles: null,
  errors: {},
  required: false,
  helperText: null,
};

export default FormattedNumberInput;

export const FormattedNumberInputNew = ({
  label,
  control,
  namefileld,
  styles,
  errors,
  required,
  id,
  InputProps,
  helperText,
  ...rest
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();

  const renderErrors = () => {
    if (isEmpty(errors)) {
      return '';
    }
    if (errors.type === 'required') {
      return t('required');
    }
    return t(errors.message);
  };

  const value = control?.["_fields"]?.[namefileld]?.["_f"]?.value;

  return (
    <div className={classes.inputField}>
      <FormControl 
        error={!isEmpty(errors)} 
        className={classes.formControl}
        sx={{
          '& .MuiOutlinedInput-root': {
            background: '#ffffff',
          },
          input: {
            background: '#ffffff',
          },
        }}
      >
        <Controller
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
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
              InputProps={InputProps}
              // required
              error={!isEmpty(errors)}
              style={styles}
              // decimalScale={value >= 100 ? 0 : 2}
              // decimalSeparator=","
              customInput={TextField}
              defaultValue={0}
              value={value}
              onValueChange={(values) => {
                onChange({ target: { name, value: values.floatValue } });
              }}
              // maxLength={value <= maxLength}
              helperText={helperText}
            />
          )}
          control={control}
          name={namefileld}
          rules={{
            required,
          }}
        />
        {!isEmpty(errors) && <FormHelperText>{renderErrors()}</FormHelperText>}
      </FormControl>
    </div>
  );
};

FormattedNumberInputNew.propTypes = {
  label: string.isRequired,
  maxLength: number,
  namefileld: string.isRequired,
  styles: object,
  errors: object,
  required: bool,
};

FormattedNumberInputNew.defaultProps = {
  maxLength: undefined,
  styles: null,
  errors: {},
  required: false,
};

export const FormattedNumberInputCaptcha = ({
  label,
  pattern,
  control,
  namefileld,
  styles,
  errors,
  required,
  helperText,
  ...rest
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const renderErrors = () => {
    if (isEmpty(errors)) {
      return '';
    }
    if (errors.type === 'required') {
      return 'Field is required';
    }
    if (errors.type === 'pattern') {
      // return 'Field is required';
    }
    return t(errors.message);
  };

  return (
    <div className={classes.inputField}>
      <FormControl
        sx={{ px: 2 }}
        error={!isEmpty(errors)}
        className={classes.formControl}
      >
        <Controller
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <NumberFormat
              {...rest}
              value={value}
              error={!isEmpty(errors)}
              name={name}
              label={`${label}${required ? '*' : ''}`}
              style={styles}
              maxLength="2"
              defaultValue=""
              customInput={TextField}
              className={classes.inputFieldNumber}
              autoComplete="off"
              type="text"
              onValueChange={({ value: v }) =>
                onChange({ target: { name, value: v } })
              }
              helperText={helperText}
            />
          )}
          control={control}
          name={namefileld}
          rules={{
            required,
            pattern
          }}
        />
        {!isEmpty(errors) && <FormHelperText>{renderErrors()}</FormHelperText>}
      </FormControl>
    </div>
  );
};

FormattedNumberInputCaptcha.propTypes = {
  label: string.isRequired,
  maxLength: number,
  namefileld: string.isRequired,
  styles: object,
  errors: object,
  required: bool,
  helperText: string,
};

FormattedNumberInputCaptcha.defaultProps = {
  maxLength: undefined,
  styles: null,
  errors: {},
  required: false,
  helperText: null,
};
