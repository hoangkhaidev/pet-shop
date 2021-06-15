import { string, bool, object, func, number } from 'prop-types';
import { Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import isEmpty from "lodash/isEmpty";
import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  inputField: {
    margin: '16px 0'
  },
  formControl: {
    width: '100%'
  },
  labelStyle: {
    color: 'red'
  }
}));

const InputField = ({
  required,
  id,
  label,
  rows,
  isHasInputProps,
  callbackInputProps,
  autoFocus,
  // eslint-disable-next-line react/prop-types
  control,
  errors,
  nameField,
  type,
  styles,
  helperText,
  readOnly,
  multiline
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

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
      <FormControl error={!isEmpty(errors)} className={classes.formControl}>
        <Controller
          control={control}
          name={nameField}
          render={({
            field: {
              onChange, onBlur, name, ref, value
            },
          }) => (
            <TextField
              autoFocus={autoFocus}
              style={styles}
              type={type}
              id={id}
              label={<div>{label}<span className={classes.labelStyle}>{required ? "*" : ""}</span></div>}
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
                shrink: !!value
              }}
              InputProps={{
                readOnly,
                endAdornment: (
                  isHasInputProps ? (
                    <InputAdornment
                      position="start"
                    >
                      <IconButton
                        aria-label={label}
                        onClick={callbackInputProps}
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : ""
                )
              }}
            />
          )}
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

InputField.propTypes = {
  type: string,
  rows: number,
  label: string,
  nameField: string,
  id: string,
  required: bool,
  styles: object,
  errors: object,
  isHasInputProps: bool,
  callbackInputProps: func,
  autoFocus: bool,
  helperText: string,
  readOnly: bool,
  multiline: bool
};

InputField.defaultProps = {
  type: 'text',
  rows: 1,
  label: '',
  nameField: '',
  id: '',
  required: false,
  styles: {},
  errors: {},
  isHasInputProps: false,
  callbackInputProps: () => {},
  autoFocus: false,
  helperText: "",
  readOnly: false,
  multiline: false,
};

export default InputField;
