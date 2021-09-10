import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { FormHelperText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    marginTop: '16px !important',
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

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];

function getStyles(name, brandMultiple, theme) {
  return {
    fontWeight:
      brandMultiple.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectFieldMutiple({ options, label, required, id, setBrandMultiple, brandMultiple, errorBrandMul, selectDisabled, defaultValue }) {
  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (event) => {
    let index = event.target.value.findIndex((item) => item === 'all');
    if (index !== -1) {
      if (index === 0) { 
        event.target.value.splice(index, 1);
      } else {
        event.target.value = ['all'];
      }
    }

    setBrandMultiple(event.target.value);
  };

  return (
    <div>
      <FormControl 
        className={classes.formControl} 
        variant="outlined" 
        error={ errorBrandMul ? true : false } 
        disabled={selectDisabled}
      >
        {/* <InputLabel id="demo-mutiple-name-label">{label}</InputLabel> */}
        <InputLabel id="demo-simple-select-outlined-label" htmlFor={id}>{label}
            <span className={classes.labelStyle}>
              {required ? '*' : ''}
            </span>
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          multiple
          value={brandMultiple ? brandMultiple : [] }
          onChange={handleChange}
          MenuProps={MenuProps}
          label="Brand"
          defaultValue={defaultValue}
        >
          {(options || []).map((option, index) => (
            <MenuItem key={index} value={option.value} style={getStyles(option.label, brandMultiple, theme)}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {errorBrandMul ? (<FormHelperText>{errorBrandMul}</FormHelperText>) : ''}
      </FormControl>
      
    </div>
  );
}
