/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';
import isEmpty from 'lodash/isEmpty';

const useStyles = makeStyles(() => ({
    selectField: {
        margin: '16px 0',
    },
}));

export default function SelectCustomer({ error, name, options, setFormState, formState, required, label, id }) {
  const classes = useStyles();

  const handleChange = (event) => {
    setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          [event.target.name]:
            event.target.type === 'checkbox'
              ? event.target.checked
              : event.target.value
        },
        touched: {
          ...formState.touched,
          [event.target.name]: true
        }
    }));
  };

  return (
    <div className={classes.selectField}>
      <FormControl fullWidth error={!isEmpty(error)}>
        <InputLabel htmlFor={id}>{label}
            <span className={classes.labelStyle}>
              {required ? ' *' : ''}
            </span>
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id={id}
          name={name}
          value={formState?.values?.status}
          label={label}
          onChange={handleChange}
          sx={{
            background: '#ffffff',
            '& .MuiSelect-select': {
              background: '#ffffff',
            }
          }}
        >
          { options.map((option, index) => {
            return (
                <MenuItem key={index} value={option.value}>
                    {option.label}
                </MenuItem>
            )}) 
          }
        </Select>
      </FormControl>
    </div>
  );
}