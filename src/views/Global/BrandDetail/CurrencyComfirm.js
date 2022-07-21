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
import SelectFieldMultiple from 'views/InputField/SelectFieldMutiple';
import SelectFieldMultipleCurrency from 'views/InputField/SelectFieldMutipleCurrency';
import { useForm } from 'react-hook-form';

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

const CurrencyComfirm = ({include_all_currencies, onSubmit}) => {
    const classes = useStyles();

    const { dataResponse: dataCurrency } = useFetchData("/api/currency/public_list");

    const [currencyData, setCurrencyData] = useState([]);
    const [ currencyMultiple, setCurrencyMultiple] = useState([]);
    const [ errorCurrency, setErrorCurrency] = useState('');

    const [open, setOpen] = useState(false);

    const { control, handleSubmit, reset } = useForm();

    const onOpenModal = useCallback(() => {
        setOpen(true);
    }, []);

    const onClose = () => {
        setOpen(false);
    };

    const onSubmitCurrecy = (currency_codes) => {
        if (currency_codes.length > 0) {
            onSubmit(currency_codes);
            onClose();
        } else {
            onSubmit([]);
            setErrorCurrency('Currency codes is required')
        }
        
    }

    useEffect(() => {
        setErrorCurrency('');
    }, [currencyMultiple]);

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
        setCurrencyMultiple([]);
    }, [include_all_currencies, open]);

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
                <form onSubmit={handleSubmit(onSubmit)}>
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
                            <SelectFieldMultipleCurrency
                                required
                                options={currencyData} 
                                label={'Currency'} 
                                id={'currency_codes'}
                                setBrandMultiple={setCurrencyMultiple}
                                brandMultiple={currencyMultiple}
                                errorBrandMul={errorCurrency}
                                defaultValue={''}
                            />
                        </FormControl>
                        <div className={classes.title__groupButton} style={{ justifyContent: 'flex-end' }}>
                            <Button
                                style={{ marginRight: '10px' }}
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={() => onSubmitCurrecy(currencyMultiple)}
                            >
                                OK
                            </Button>
                            <Button variant="contained" color="error" onClick={() => onClose()}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </form>
            </ModalComponent>
        </>
    );
};

export default CurrencyComfirm;
