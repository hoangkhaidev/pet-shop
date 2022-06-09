/* eslint-disable import/no-duplicates */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import AdjustIcon from '@mui/icons-material/Adjust';
import { validate } from 'validate.js';
import { makeStyles } from '@mui/styles';
import useFetchData from 'utils/hooks/useFetchData';
import { cloneDeep } from 'lodash';
import { Button, FormLabel, InputLabel, Select } from '@mui/material';
import ModalComponent from 'views/ModalComponent/ModalComponent';
import TitlePage from 'views/TitlePage/TitlePage';
import { FormControl } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    rootChip: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: `${theme.spacing(0.5)} !important`,
        },
    },
    operatorAdminLabel: {
        marginTop: '16px !important',
        fontWeight: '600 !important',
    },
    checkHelperText: {
        color: 'red !important',
        paddingTop: '5px !important',
        fontStyle: 'italic',
    },
    checkTitleText: {
        paddingTop: '5px !important',
    },
    selectField: {
        margin: '16px 0',
    },
    formControl: {
        width: '100%',
        paddingBottom: '20px !important',
    },
    labelStyle: {
        color: 'red',
    },
    checkHelperError: {
        color: 'red !important',
        fontSize: '12px !important',
        marginLeft: '15px',
        paddingTop: '5px !important'
    }
}));

const schema = {
    currency_codes: {
      presence: { allowEmpty: false, message: 'is required' },
    },
}

const CurrencyComfirm = ({include_all_currencies, onSubmit}) => {
    const classes = useStyles();

    const { dataResponse: dataCurrency } = useFetchData("/api/currency/public_list");

    const [currencyData, setCurrencyData] = useState([]);

    const initFormState = {
        isValid: false,
        values: {
          currency_codes: '',
        },
        errors: {},
        touched: {}
    };

    const [open, setOpen] = useState(false);
    const [formStateCurrency, setFormStateCurrency] = useState(initFormState);

    const handleChangeCurrency = (event) => {
        setFormStateCurrency({
            ...formStateCurrency,
            values: {
                ...formStateCurrency.values,
                [event.target.name]:
                event.target.type === 'checkbox'
                    ? event.target.checked
                    : event.target.value
            },
            touched: {
                ...formStateCurrency.touched,
                [event.target.name]: true
            }
        });
    }

    const onOpenModal = useCallback(() => {
        setOpen(true);
    }, []);

    const onClose = () => {
        setOpen(false);
    };

    const onSubmitCurrecy = (currency_codes) => {
        if (formStateCurrency.isValid === true) {
            onSubmit(currency_codes);
            onClose();
        } else{
            setFormStateCurrency({
              ...formStateCurrency,
              touched: {
                ...formStateCurrency.touched,
                currency_codes: true
              }
            });
        }
    }

    useEffect(() => {
        let mapData = [];
        let newCurrency = cloneDeep(dataCurrency);
        (newCurrency || []).forEach((data, index) => {
            let optionData = {
                id: data.code,
                value: data.code,
                label: `${data.code} - ${data.name}`,
            };
            mapData.push(optionData)
        });
        setCurrencyData([...mapData]);
    }, [dataCurrency, setCurrencyData]);

    useEffect(() => {
        setFormStateCurrency(initFormState);
    }, [include_all_currencies, open]);

    useEffect(() => {
        const errors = validate(formStateCurrency.values, schema);
        setFormStateCurrency((formStateCurrency) => ({
          ...formStateCurrency,
          isValid: errors ? false : true,
          errors: errors || {}
        }));
    }, [formStateCurrency.values]);
    
    const hasError = (field) => formStateCurrency.touched[field] && formStateCurrency.errors[field] ? true : false;

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={onOpenModal}
                startIcon={<AdjustIcon fontSize="small" />}
            >
                Copy
            </Button>
            <ModalComponent
                open={open}
                onClose={onClose}
            >
                <div>
                    <TitlePage title={'Confirmation'} />
                    <div className={classes.title__text}>
                        {`What currency do you want to copy ?`}
                    </div>
                    <FormControl
                        style={{ marginTop: '20px' }}
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <InputLabel htmlFor="outlined-age-native-simple">
                            Currency
                            <span className={classes.labelStyle}>*</span>
                        </InputLabel>
                        <Select
                            native
                            value={formStateCurrency?.values?.currency_codes}
                            onChange={handleChangeCurrency}
                            label="Currency"
                            name="currency_codes"
                            sx={{
                                background: '#ffffff',
                                '& .MuiNativeSelect-select': {
                                  background: '#ffffff',
                                }
                            }}
                            error={hasError('currency_codes')}
                            inputProps={{
                                name: 'currency_codes',
                            }}
                        >
                            <option aria-label="None" value="" />
                            {currencyData?.map((item) => (
                                <option key={item.id} value={item.value}>{item.label}</option>
                            ))}
                        </Select>
                        <FormLabel component="legend" className={classes.checkHelperError}>
                            { hasError('currency_codes') ? formStateCurrency.errors.currency_codes[0] : null }
                        </FormLabel>
                    </FormControl>
                    <div className={classes.title__groupButton} style={{ justifyContent: 'flex-end' }}>
                        <Button
                            style={{ marginRight: '10px' }}
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={() => onSubmitCurrecy(formStateCurrency?.values?.currency_codes)}
                        >
                            OK
                        </Button>
                        <Button variant="contained" color="error" onClick={() => onClose()}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </ModalComponent>
        </>
    );
};

export default CurrencyComfirm;