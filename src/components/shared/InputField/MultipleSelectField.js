/* eslint-disable no-use-before-define */
import { array, string, object, bool } from 'prop-types';
import { Controller } from 'react-hook-form';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles(() => ({
  selectField: {
    margin: '16px 0',
  },
  formControl: {
    width: '100%',
  },
}));

const MultilpleSelectField = ({
  required,
  id,
  defaultValue,
  control,
  errors,
  nameField,
  options,
  label,
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
    <div className={classes.selectField}>
      <FormControl
        variant="outlined"
        error={!isEmpty(errors)}
        className={classes.formControl}
      >
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Controller
          control={control}
          name={nameField}
          render={({ field }) => (
            // <Select
            //   defaultValue={defaultValue}
            //   label={label}
            //   labelId={id}
            // >
            //   {options.map((option) => (
            //     <MenuItem key={option.id} value={option.value}>
            //       {option.label}
            //     </MenuItem>
            //   ))}
            // </Select>
            <Autocomplete
              multiple
              {...field}
              id="checkboxes-tags-demo"
              options={options}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.title}
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Checkboxes"
                  placeholder="Favorites"
                />
              )}
            />
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

MultilpleSelectField.propTypes = {
  options: array,
  id: string.isRequired,
  errors: object,
  required: bool,
};

MultilpleSelectField.defaultProps = {
  options: [],
  errors: {},
  required: false,
};

export default MultilpleSelectField;
