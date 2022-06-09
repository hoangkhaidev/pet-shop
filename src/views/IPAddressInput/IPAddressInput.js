/* eslint-disable no-return-assign */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { Fragment, useRef } from 'react';
import { array, func, number } from 'prop-types';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  listInput: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 4,
  },
  inputStyles: {
    height: 50,
    width: 50,
    borderRadius: 4,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
    fontSize: '1rem',
    border: '1px solid #172b4d',
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      height: 45,
      width: 45,
      marginLeft: 5,
      marginRight: 5,
    }
  },
}));

const IPAddressInput = ({ apiWLIP, onChange, rowIndex, requiredCheck }) => {
  const classes = useStyles();
  const ref = useRef([]);

  const onChangeWLIPAddressForAPI = (e, index) => {
    let { formattedValue } = e;

    if (formattedValue.length === 3 && index < 3) {
      setTimeout(() => {
        ref.current[index + 1]?.focus();
      }, 0);
    } 
    if (formattedValue > 25) {
      setTimeout(() => {
        ref.current[index + 1]?.focus();
      }, 0);
    }

    onChange(e, index, rowIndex);
  };

  const onKeyPress = (e, index) => {
    if (apiWLIP[index].length === 0 && e.keyCode === 8 && index !== 0) {
      setTimeout(() => {
        ref.current[index - 1].focus();
      }, 0);
    }
  };

  return (
    <>
      <div className={classes.listInput}>
        {(apiWLIP || []).map((value, index) => (
          <Fragment key={index}>
            <NumberFormat
              min={0}
              max={255}
              required={requiredCheck}
              key={index}
              className={classes.inputStyles}
              maxLength={3}
              allowLeadingZeros={false}
              allowNegative={false}
              value={value}
              getInputRef={(el) => (ref.current[index] = el)}
              onValueChange={(values) => {
                if (values.formattedValue > 255) {
                  if (index >= 3) onChangeWLIPAddressForAPI({ formattedValue: 255 }, index);
                  else {
                    let str = values.formattedValue.toString();
                    str = str.slice(0, -1);
                    values.formattedValue = Number(str);
  
                    let text = values.value;
                    let result = text.substring(2, 3);
                    
                    onChangeWLIPAddressForAPI({ formattedValue: result }, index + 1);
                    setTimeout(() => {
                      ref.current[index + 1]?.focus();
                    }, 100);
                  }

                  return;
                }
                  
                if (values.formattedValue < 0) values.formattedValue = 0;

                onChangeWLIPAddressForAPI(values, index);
              }}
              onKeyDown={(e) => onKeyPress(e, index)}
            />
            {index < 3 && <span>.</span>}
          </Fragment>
        ))}
      </div>
    </>
  );
};

IPAddressInput.propTypes = {
  apiWLIP: array,
  onChange: func,
  rowIndex: number,
};

IPAddressInput.defaultProps = {
  apiWLIP: [],
  onChange: () => {},
  rowIndex: 0,
};

export default IPAddressInput;