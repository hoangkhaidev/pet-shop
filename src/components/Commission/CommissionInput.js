import { makeStyles } from '@material-ui/core';
import React from 'react';
import {
  Input,
} from 'reactstrap';

const useStyles = makeStyles((theme) => ({
    input_text: {
        position: 'absolute',
        top: '10px',
        right: '10px',
    },
    input_commission: {
        fontSize: '16px',
        padding: '20px 25px',
        height: '1.4375em',
        border: '1px solid #ddd',
        borderRadius: '5%',
    }
  }));

const CommissionInput = props => {
  const { name, defaultValue, id, placeholder, onChange = null, disabled = false, ref } = props;
  const classes = useStyles();
  
  const handlerCommissionChange = (event) => {
    let value = event.target.value;
    let regex = /^\d+(\.\d{0,2})?$/g;
    if (!regex.test(value)) {
      event.target.value = value.slice(0, -1)
      if (onChange) {
        onChange(event);
      }
      return 
    }

    if (Number(value) > 100) {
      event.target.value = value.slice(0, -1)
      if (onChange) {
        onChange(event);
      }
      return 
    } 
    
    var count = (value.match(/is/g) || []).length;
    if (count > 2) {
      event.target.value = value.slice(0, -1)
      if (onChange) {
        onChange(event);
      }
      return 
    }

    if (onChange) {
      onChange(event);
    }
  }
  
  const formatInput = (e) => {
    let checkIfNum;
    if (e.key !== undefined) {
      checkIfNum = e.key === "e" || e.key === "+" || e.key === "-" || (e.key === "." && e.target.value.indexOf(".") !== -1) ;
    }
    else if (e.keyCode !== undefined) {
      checkIfNum = e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187 || e.keyCode === 189;
    } 
    return checkIfNum && e.preventDefault();
  }

  return(
    <div style={{ position: 'relative' }}>
        <Input
          type="number"
          step="0.1"
          min="0"
          max="100"
          disabled={disabled}
          name={name}
          id={id}
          ref={ref}
          defaultValue={defaultValue}
          onChange={handlerCommissionChange}
          onKeyDown={formatInput}
          autoComplete="off" 
          className="text-right"
          placeholder={placeholder}
          style={{ fontSize: '16px', padding: '20px 25px', height: '1.4375em', border: '1px solid #ddd', borderRadius: '5%' }}
        />
        <div>
          <span className={classes.input_text}>%</span>
        </div>
    </div>
  )
}

export default CommissionInput