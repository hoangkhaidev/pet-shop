import NumberFormat from 'react-number-format';
import { func, string, number, object, bool } from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { Controller } from 'react-hook-form';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import isEmpty from "lodash/isEmpty";

const useStyles = makeStyles(() => ({
  inputField: {
    margin: '16px 0'
  },
  formControl: {
    width: '100%',
    paddingLeft: "0 !important",
    paddingRight: "0 !important"
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
  onChange: func.isRequired
};

const FormattedNumberInput = ({
  // eslint-disable-next-line react/prop-types
  label, control, nameField, styles,
  errors, required,
  ...rest
}) => {
  const classes = useStyles();

  const renderErrors = () => {
    if (isEmpty(errors)) {
      return "";
    }
    if (errors.type === "required") {
      return "Field is required";
    }
    return errors.message;
  };

  return (
    <div className={classes.inputField}>
      <FormControl sx={{ px: 2 }} error={!isEmpty(errors)} className={classes.formControl}>
        <Controller
          render={({
            field: { onChange, onBlur, value, name, ref },
          }) => (
            <NumberFormat
              {...rest}
              value={value}
              error={!isEmpty(errors)}
              name={name}
              label={`${label}${required ? "*" : ""}`}
              style={styles}
              maxLength="2"
              customInput={
                TextField
              }
              className={classes.inputFieldNumber}
              autoComplete="off"
              type="text"
              onValueChange={({ value: v }) => onChange({ target: { name, value: v } })}
            />
          )}
          control={control}
          name={nameField}
          rules={{
            required
          }}
        />
        {!isEmpty(errors) && (
          <FormHelperText>
            {renderErrors()}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

FormattedNumberInput.propTypes = {
  label: string.isRequired,
  maxLength: number,
  nameField: string.isRequired,
  styles: object,
  errors: object,
  required: bool
};

FormattedNumberInput.defaultProps = {
  maxLength: undefined,
  styles: null,
  errors: {},
  required: false
};

export default FormattedNumberInput;
