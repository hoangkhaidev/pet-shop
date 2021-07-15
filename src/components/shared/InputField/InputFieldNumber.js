import NumberFormat from 'react-number-format';
import { func, string, number, object, bool } from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { Controller } from 'react-hook-form';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty';

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
  // eslint-disable-next-line react/prop-types
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
      // return 'Field is required';
    }
    return errors.message;
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
              InputProps={InputProps}
              // required
              error={!isEmpty(errors)}
              style={styles}
              decimalScale={value >= 100 ? 0 : 2}
              decimalSeparator=","
              customInput={TextField}
              defaultValue={0}
              value={value}
              onValueChange={(values) => {
                // if (values?.floatValue > 100) {
                //   onChange({ target: { name, value: 100 } })
                // } else {
                //   onChange({ target: { name, value: values.floatValue } });
                // }
                // if (values?.floatValue < 0)  {
                //   onChange({ target: { name, value: 0 } })
                // } else {
                //   onChange({ target: { name, value: values.floatValue } });
                // }
                // console.log(values);
                values?.floatValue > 100
                  ? onChange({ target: { name, value: 100 } })
                  : values?.floatValue < 0 
                    ? onChange({ target: { name, value: 0 } }) 
                    : onChange({ target: { name, value: values.floatValue } });
              }}
              maxLength={value >= 100 ? 3 : null}
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

export const FormattedNumberInputComission = ({
  // eslint-disable-next-line react/prop-types
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

  const renderErrors = () => {
    if (isEmpty(errors)) {
      return '';
    }
    if (errors.type === 'required') {
      return 'Field is required';
    }
    return errors.message;
  };

  return (
    <div className={classes.inputField}>
      <FormControl error={!isEmpty(errors)} className={classes.formControl}>
        <Controller
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
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
              InputProps={InputProps}
              // required
              error={!isEmpty(errors)}
              style={styles}
              decimalScale={value >= 100 ? 0 : 2}
              decimalSeparator=","
              customInput={TextField}
              defaultValue={0}
              value={value}
              onValueChange={(values) => {
                console.log(values);
                values?.floatValue > 100
                  ? onChange({ target: { name, value: 100 } })
                  : values?.floatValue < 0 
                    ? onChange({ target: { name, value: 0 } }) 
                    : onChange({ target: { name, value: values.floatValue } });
              }}
              maxLength={value >= 100 ? 3 : null}
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

FormattedNumberInputComission.propTypes = {
  label: string.isRequired,
  maxLength: number,
  namefileld: string.isRequired,
  styles: object,
  errors: object,
  required: bool,
};

FormattedNumberInputComission.defaultProps = {
  maxLength: undefined,
  styles: null,
  errors: {},
  required: false,
};
