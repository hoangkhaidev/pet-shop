/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { Checkbox, FormControl, FormHelperText, InputAdornment, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  checkboxStyle: {
    padding: '2rem 1rem',
    paddingLeft: '0',
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      padding: '2rem 2rem',
      paddingLeft: '0',
    }
  },
  labelStyle: {
    color: 'red !important',
  }
}));

const ProductCommission = ({ item, productCommission, setProductCommission, required, nameCon, hasError }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  
  const handleChangeCheckbox = (event, item) => {
    event.persist();

    let proCon = productCommission.values.map((items) => {
      if (items.product_id === item.product_id) {
        items.checked = event.target.checked;
      }
      return items;
    });

    setProductCommission((productCommission) => ({
      ...productCommission,
      values: proCon,
    }));
  };

  const handleChangeCommission = (event, item) => {
    let value = event.target.value;
    
    let regex = /^(\d{0,3})+(\.\d{0,2})?$/g;
    if (!regex.test(value)) {
      event.target.value = value.slice(0, -1);
      return 
    }

    if (Number(value) > 100) {
      event.target.value = value.slice(0, -1);
      return 
    } 

    var count = (value.match(/is/g) || []).length;
    if (count > 2) {
      event.target.value = value.slice(0, -1)
      return 
    }

    let proCon = productCommission.values.map((items) => {
      if (items.product_id === item.product_id) {
        items.commission = event.target.value;
      }
      return items;
    });

    setProductCommission((productCommission) => ({
      ...productCommission,
      values: proCon,
      touched: {
        ...productCommission.touched,
        [event.target.name]: true
      }
    }));
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

  const handleOnblur = (event) => {
    setProductCommission((productCommission) => ({
      ...productCommission,
      touched: {
        ...productCommission.touched,
        [event.target.name]: true
      }
    }));
  }

  return (
    <div 
      style={{
        display: 'flex', 
        width: '50%', 
        alignItems: 'center',
      }}>
        <Checkbox
            sx={{
              ml: 3,
            }}
            onChange={(event) => handleChangeCheckbox(event, item)}
            checked={item?.checked ? item?.checked : false}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        <span className={classes.checkboxStyle}>{item?.label}</span>
        {item.checked === true ? 
            <FormControl 
              className={clsx(classes.margin, classes.textField)} 
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: '#ffffff',
                },
                input: {
                  background: '#ffffff',
                },
              }}
            >
              <TextField
                  name={nameCon}
                  id={nameCon}
                  label={
                    <div>
                      Commission
                      <span className={classes.labelStyle}>
                        {required ? ' *' : ''}
                      </span>
                    </div>
                  }
                  className={clsx(classes.margin, classes.textField)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  onChange={(event) => handleChangeCommission(event, item) }
                  error={hasError(nameCon)}
                  onKeyDown={formatInput}
                  value={item.commission}
                  variant="outlined"
                  onBlur={(event) => handleOnblur(event)}
              />
              <FormHelperText id="outlined-weight-helper-text" style={{whiteSpace: 'nowrap'}}>{t('h_commission')}</FormHelperText>
              { hasError(nameCon) && 
                <FormHelperText className={classes.labelStyle} style={{whiteSpace: 'nowrap'}}>
                  {productCommission.errors[`${nameCon}`][0] ? 'Commission is required' : ''}
                </FormHelperText>}
            </FormControl>
        : ''}
    </div>
  );
};

export default ProductCommission;
