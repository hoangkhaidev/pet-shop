/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable radix */
/* eslint-disable no-param-reassign */
import { useRef, useEffect, forwardRef } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import IPAddressInput from "src/components/shared/IPAddressInput/IPAddressInput";

import InputMask from 'react-input-mask';
import { func, bool, string, array, object } from 'prop-types';
import isEmpty from 'lodash/isEmpty';

export const IpMaskInput = forwardRef(
  (
    {
      label,
      isOnlyOneIP,
      lastRow,
      valueIP,
      onChange,
      index,
      onAddingWhitelistIPField,
      inputRef,
      required,
      errors,
      name,
      ...other
    },
    ref
  ) => {
    const renderErrors = () => {
      if (isEmpty(errors)) {
        return "";
      }
      if (errors.type === "required") {
        return "Field is required";
      }
      return errors.message;
    };

    return (
      <FormControl error={!isEmpty(errors)} style={{ width: '100%' }}>
        <InputMask
          {...other}
          mask={[
            /[1-2]/,
            /[0-9]/,
            /[0-9]/,
            '.',
            /[1-2]/,
            /[0-9]/,
            /[0-9]/,
            '.',
            /[1-2]/,
            /[0-9]/,
            /[0-9]/,
            '.',
            /[1-2]/,
            /[0-9]/,
            /[0-9]/
          ]}
          pipe={(value) => {
            if (value === '.' || value.endsWith('..')) return false;

            const parts = value.split('.');

            if (
              parts.length > 4 || parts.some((part) => part === '00' || part < 0 || part > 255)
            ) {
              return false;
            }

            return value;
          }}
          value={valueIP}
          placeholderChar={'\u2000'}
          keepCharPositions
          showMask
          onChange={(e) => onChange(e, index)}
        >
          <TextField
            inputRef={ref}
            sx={{
              marginTop: 2
            }}
            name={name}
            error={!isEmpty(errors)}
            label={label}
            InputProps={{
              endAdornment: !isOnlyOneIP ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="adding ip field"
                    edge="end"
                    onClick={() => onAddingWhitelistIPField(index)}
                  >
                    {lastRow ? <AddIcon /> : <RemoveIcon />}
                  </IconButton>
                </InputAdornment>
              ) : (
                ''
              )
            }}
            // endAdornment={(
            //   !isOnlyOneIP ? (
            //     <InputAdornment position="end">
            //       <IconButton
            //         aria-label="adding ip field"
            //         edge="end"
            //         onClick={() => onAddingWhitelistIPField(index)}
            //       >
            //         {lastRow ? <AddIcon /> : <RemoveIcon />}
            //       </IconButton>
            //     </InputAdornment>
            //   ) : ""
            // )}
          />
        </InputMask>
        {!isEmpty(errors) && (
          <FormHelperText>
            {renderErrors()}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

IpMaskInput.propTypes = {
  onChange: func,
  isOnlyOneIP: bool,
  onAddingWhitelistIPField: func,
  label: string,
  required: bool,
  errors: object
};

IpMaskInput.defaultProps = {
  onChange: () => {},
  isOnlyOneIP: false,
  onAddingWhitelistIPField: () => {},
  label: '',
  required: false,
  errors: undefined
};

const WhitelistIPs = ({ whitelistIP, onChangeWhitelistIp, setWhitelistIP }) => {
  const textInputWhitelistIP = useRef([]);

  useEffect(() => {
    if (
      textInputWhitelistIP.current[whitelistIP.length - 1] && whitelistIP.length >= 2
    ) {
      textInputWhitelistIP.current[whitelistIP.length - 1].focus();
    }
  }, [textInputWhitelistIP, whitelistIP.length]);

  const onAddingWhitelistIPField = (e, index, rowIndex) => {
    onChangeWhitelistIp(e, index, rowIndex);
  };

  return (
    <FormGroup>
      <FormLabel>Whitelist IP Address</FormLabel>
      {whitelistIP.map((ip, index) => (
        <IPAddressInput
          key={ip}
          apiWLIP={ip}
          onChange={onAddingWhitelistIPField}
          rowIndex={index}
        />
      ))}
    </FormGroup>
  );
};

WhitelistIPs.propTypes = {
  whitelistIP: array,
  onChangeWhitelistIp: func,
  setWhitelistIP: func
};

WhitelistIPs.defaultProps = {
  whitelistIP: [],
  onChangeWhitelistIp: () => {},
  setWhitelistIP: () => {}
};

export default WhitelistIPs;
