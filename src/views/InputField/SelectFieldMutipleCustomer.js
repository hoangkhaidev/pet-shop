/* eslint-disable no-unneeded-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/system';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    marginTop: '23px !important',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  labelStyle: {
    color: 'red',
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, stateMultiple, theme) {
  return {
    fontWeight:
      stateMultiple.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectFieldMutipleCustom({ 
  options, 
  label,
  required,
  id,
  setStateMultiple,
  stateMultiple,
  errorMul,
  selectDisabled, 
  defaultValue 
}) {
  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (event) => {
    
    let index = event.target.value.findIndex((item) => item === 'all');

    let arrOptions = options.map((item) => {
      return item.value;
    });

    if (event.target.value.length > 0) {
      if (index !== -1) {
        if (index === 0) { 
          
          event.target.value.splice(index, 1);
        } else {
          event.target.value = ['all'];
        }
        if (arrOptions?.length === event.target.value?.length)  {
          event.target.value = ['all'];
        }
      }
    } else {
      event.target.value = ['all'];
    }
    
    arrOptions.splice(0, 1);
    
    setStateMultiple(event.target.value);
  };

  return (
    <div>
      <FormControl
        className={classes.formControl}
        variant="outlined"
        error={errorMul ? true : false}
        disabled={selectDisabled}
      >
        <InputLabel id="demo-simple-select-outlined-label" htmlFor={id}>{label}
          <span className={classes.labelStyle}>
            {required ? ' *' : ''}
          </span>
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          multiple
          value={stateMultiple ? stateMultiple : []}
          onChange={handleChange}
          MenuProps={MenuProps}
          sx={{
            background: '#ffffff',
            '& .MuiSelect-select': {
              background: '#ffffff',
            }
          }}
          label={label}
          defaultValue={defaultValue}
        >
          {(options || []).map((option, index) => (
            <MenuItem key={index} value={option.value} style={getStyles(option.label, stateMultiple, theme)}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {errorMul ? (<FormHelperText>{errorMul}</FormHelperText>) : ''}
      </FormControl>
    </div>
  );
}
