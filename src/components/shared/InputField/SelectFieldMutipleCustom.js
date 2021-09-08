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
    // marginTop: '16px !important',
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
            {required ? '*' : ''}
          </span>
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          multiple
          value={stateMultiple ? stateMultiple : []}
          onChange={handleChange}
          MenuProps={MenuProps}
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
