import { FormControl, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    inputField: {
      margin: '16px 0',
    },
    formControl: {
      width: '100%',
    },
    labelStyle: {
      color: 'red',
    },
}));

export default function Textarea({ error, name, label, required, setFormState, formState }) {
  const classes = useStyles();

  const handleChange = (event) => {
    // setReason(event.target.value);
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
    <div className={classes.inputField}>
      <FormControl className={classes.formControl}>
        <TextField
          id="outlined-multiline-static"
          label={
            <div>
              {label}
              <span className={classes.labelStyle}>
                {required ? '*' : ''}
              </span>
            </div>
          }
          error={error}
          name={name}
          onChange={handleChange}
          value={formState?.values?.reason}
          multiline
          rows={4}
        />
      </FormControl>
    </div>
  );
}