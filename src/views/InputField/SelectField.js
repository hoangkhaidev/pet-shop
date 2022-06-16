/* eslint-disable arrow-body-style */
/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { array, string, object, bool } from 'prop-types';
import { Controller } from 'react-hook-form';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

const useStyles = makeStyles(() => ({
  selectField: {
    margin: '16px 0',
  },
  formControlSelect: {
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
  selectDisabled,
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
    return t(errors.message);
  };

  return (
    <div className={classes.selectField}>
      <FormControl
        disabled={selectDisabled}
        variant="outlined"
        id="1232132132132132132132132"
        error={!isEmpty(errors)}
        className={classes.formControlSelect}
        sx={{ 
          mb: '10px',
          '&.MuiInputBase-root': {
            background: '#ffffff',
          }
        }}
      >
        <InputLabel htmlFor={id}>{label}
            <span className={classes.labelStyle}>
              {required ? '*' : ''}
            </span>
        </InputLabel>
        <Controller
          control={control}
          name={namefileld}
          render={({ field }) => {
            // if (options?.length === 0) return null;
            return (
              <Select
                {...field}
                defaultValue={defaultValue}
                sx={{
                  background: '#ffffff',
                  '& .MuiSelect-select': {
                    background: '#ffffff',
                  },
                  '& .Mui-disabled': {
                    background: '#fafafa',
                  }
                }}
                label={
                  <div>
                    {label}
                    <span className={classes.labelStyle}>
                      {required ? ' *' : ''}
                    </span>
                  </div>
                }
                labelId={id}
              >
                {options?.map((option, index) => {
                  return (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  )
                })}
              </Select>
            )
          }}
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