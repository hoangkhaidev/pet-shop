/* eslint-disable prefer-template */
/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/system';
import BiotechIcon from '@mui/icons-material/Biotech';

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

function getStyles(name, brandMultiple, theme) {
  return {
    fontWeight:
      brandMultiple.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectFieldMultiple({ options, label, required, id, setBrandMultiple, brandMultiple, errorBrandMul, selectDisabled, defaultValue }) {
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

    setBrandMultiple(event.target.value);

  };

  return (
    <div>
      <FormControl 
        className={classes.formControl} 
        variant="outlined" 
        error={ errorBrandMul ? true : false } 
        disabled={selectDisabled}
        sx={{
            marginBottom: '18px',
        }}
      >
        <InputLabel id="demo-simple-select-outlined-label" htmlFor={id}>{label}
            <span className={classes.labelStyle}>
              {required ? ' *' : ''}
            </span>
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          multiple
          value={brandMultiple ? brandMultiple : [] }
          onChange={handleChange}
          MenuProps={MenuProps}
          label="Brand"
          sx={{
            background: '#ffffff',
            '& .MuiSelect-select': {
              background: '#ffffff',
            },
            '& .Mui-disabled': {
              background: '#fafafa',
            }
          }}
          renderValue={value => {
            let arrLabel = [];
            options.map((option) => {
              value.forEach((itemVal) => {
                if (itemVal === option.value) {
                  arrLabel.push(option.label);
                }
              });
              return option.value
            }); 

            if (arrLabel.length > 0) {
              return arrLabel.join(', ');
            } else {
              return 'All';
            }
          }}
          defaultValue={defaultValue}
        >
          {(options || []).map((option, index) => {
            if (option.is_test) {
              return (
                <MenuItem key={index} value={option.value} style={getStyles(option.label, brandMultiple, theme)}>
                  {option.label}
                  <BiotechIcon />
                </MenuItem>
              );
            }
            return (
              <MenuItem key={index} value={option.value} style={getStyles(option.label, brandMultiple, theme)}>
                {option.label}
              </MenuItem>
            );
          }

          )}
        </Select>
        {errorBrandMul ? (<FormHelperText>{errorBrandMul}</FormHelperText>) : ''}
      </FormControl>
    </div>
  );
}
