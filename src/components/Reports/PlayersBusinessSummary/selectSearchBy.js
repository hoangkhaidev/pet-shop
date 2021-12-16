
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty';

const useStyles = makeStyles(() => ({
    selectField: {
        margin: '16px 0',
    },
}));

export default function SelectSearchBy({ error, control, name, options, setSearchBy, searchBy, required, label, id }) {
  const classes = useStyles();

  const handleChange = (event) => {
    setSearchBy(event.target.value);
  };

  return (
    <div className={classes.selectField}>
      <FormControl fullWidth error={!isEmpty(error)}>
        <InputLabel htmlFor={id}>{label}
            <span className={classes.labelStyle}>
              {required ? '*' : ''}
            </span>
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id={id}
          name={name}
          value={searchBy}
          label={label}
          control={control}
          onChange={handleChange}
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