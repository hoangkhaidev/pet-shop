/* eslint-disable react/prop-types */
import { array, string, object, bool } from 'prop-types';
import { Controller } from 'react-hook-form';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(() => ({
  selectField: {
    margin: '16px 0',
  },
  formControl: {
    width: '100%',
  },
  labelStyle: {
    color: 'red',
  },
}));

const SelectField = ({
  required,
  id,
  defaultValue,
  control,
  errors,
  namefileld,
  options,
  label,
  selectDisabled
}) => {
  const classes = useStyles();

  const renderErrors = () => {
    if (isEmpty(errors)) {
      return '';
    }
    if (errors.type === 'required') {
      return 'Field is required';
    }
    if (errors.message === 'err:invalid_brand_ids') {
      return errors.message = 'Please select brand';
    }
    return errors.message;
  };

  return (
    <div className={classes.selectField}>
      <FormControl
        disabled={selectDisabled}
        variant="outlined"
        error={!isEmpty(errors)}
        className={classes.formControl}
      >
        <InputLabel htmlFor={id}>{label}
            <span className={classes.labelStyle}>
              {required ? '*' : ''}
            </span>
        </InputLabel>
        <Controller
          control={control}
          name={namefileld}
          render={({ field }) => (
            <Select
              {...field}
              defaultValue={defaultValue}
              label={
                <div>
                  {label}
                  <span className={classes.labelStyle}>
                    {required ? '*' : ''}
                  </span>
                </div>
              }
              labelId={id}
            >
              {options.map((option) => {
                // console.log(option)
                return (
                  <MenuItem key={option.id} value={option.value}>
                    {option.label}
                  </MenuItem>
                )
              })}
            </Select>
          )}
          rules={{
            required,
          }}
          defaultValue={defaultValue}
        />
        {!isEmpty(errors) && <FormHelperText>{renderErrors()}</FormHelperText>}
      </FormControl>
    </div>
  );
};

SelectField.propTypes = {
  options: array,
  id: string.isRequired,
  errors: object,
  required: bool,
};

SelectField.defaultProps = {
  options: [],
  errors: {},
  required: false,
};

export default SelectField;
