/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { FormControl, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

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
      <FormControl 
        className={classes.formControl} 
        sx={{
          textarea: {
            background: '#ffffff',
          }
        }}
      >
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