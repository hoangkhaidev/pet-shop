/* eslint-disable react/prop-types */
import { array, string, object, bool } from "prop-types";
import { Controller } from "react-hook-form";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import isEmpty from "lodash/isEmpty";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(() => ({
  selectField: {
    margin: '16px 0'
  },
  formControl: {
    width: '100%'
  }
}));

const SelectField = ({
  required,
  id,
  defaultValue,
  control,
  errors,
  nameField,
  options,
  label
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
    <div className={classes.selectField}>
      <FormControl variant="outlined" error={!isEmpty(errors)} className={classes.formControl}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Controller
          control={control}
          name={nameField}
          render={({ field }) => (
            <Select
              {...field}
              defaultValue={defaultValue}
              label={label}
              labelId={id}
            >
              {options.map(option => (
                <MenuItem key={option.id} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          )}
          rules={{
            required
          }}
          defaultValue={defaultValue}
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

SelectField.propTypes = {
  options: array,
  id: string.isRequired,
  errors: object,
  required: bool
};

SelectField.defaultProps = {
  options: [],
  errors: {},
  required: false
};

export default SelectField;
