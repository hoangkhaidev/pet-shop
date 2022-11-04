/* eslint-disable import/no-duplicates */
/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-template */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import cloneDeep from 'lodash/cloneDeep';
import { useEffect, useState } from "react";
import get from 'lodash/get';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from "react-redux";
import { makeStyles } from '@mui/styles';
import api from 'utils/api';
import MainCard from 'ui-component/cards/MainCard';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { FormControl } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '50ch',
    '& .MuiAutocomplete-endAdornment': {
      top: '12px !important',
    },
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    }
  },
  
}));

const CurrencyListFilter = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [currencyData, setCurrencyData] = useState([]);
  ///handle permission
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionCurrency = {};
  permission_groups?.map((item) => {
    if (item.name === 'Configuration') {
      arrPermissionCurrency = (item.permissions[0]);
    }
    return item.name === 'Configuration'
  });

  const onDataCurrency = async () => {
    if (arrPermissionCurrency?.full) {
      const response = await api.post('/api/currency/all_for_create', null);
      if (get(response, "success", false)) {
        setCurrencyData(response?.data);
      } else {
        console.log("response", response);
      }
    } else if(arrPermissionCurrency?.create) {
      const response = await api.post('/api/currency/all_for_create', null);
      if (get(response, "success", false)) {
        setCurrencyData(response?.data);
      } else {
        console.log("response", response);
      }
    }

  };

  useEffect(() => {
    onDataCurrency();
  }, []);

  const [currencydata, setCurrencydata] = useState([]);
  const [formState, setFormState] = useState({
    code: '',
    name: '',
    symbol: '',
  });

  useEffect(() => {
    let mapData = [];
    let newCurrency = cloneDeep(currencyData);
    (newCurrency || []).forEach((data, index) => {
      let optionData = {
        id: data.code,
        value: data.code,
        symbol: data.symbol,
        label: data.name,
      };
      mapData.push(optionData)
    });
    setCurrencydata([...mapData]);
  }, [currencyData, setCurrencydata]);

  const onChangeCurrency = (event, value) => {
    let data = value?.split(" - ");
    setFormState({
      code: data?.[0],
      name: data?.[1],
      symbol: data?.[2],
    })
  };

  const onAddCurrency = async () => {
    try {
      let response = await api.post(`/api/currency/create`, formState);

      if (get(response, 'success', false)) {
        toast.success("Create Currency Success", {
          onClose: navigate("/configuration/currency")
        });
        window.location.reload();
      } else {
        toast.warn("The input value must be an item on the specified list");
      }
    } catch (e) {
      console.log("e", e);
    }
  }
 
  return (
    <MainCard title="Currency">
      <Grid container spacing={2}>
        <Grid item xs={12} xl={3} md={6}>
          <FormControl className={ classes.textField } variant="outlined">
            <Autocomplete
              id="currency"
              onChange={onChangeCurrency}
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: '#ffffff',
                },
                input: {
                  background: '#ffffff',
                }
              }}
              options={currencydata.map((option) => {
                return option.value + ' - ' + option.label + ' - ' + option.symbol;
              })}
              renderInput={(params) => (
                <TextField {...params} label="Enter Currency Code" margin="normal" variant="outlined" />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} xl={3} md={6} style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
          {
            arrPermissionCurrency?.full ? (
              <Button
                variant="contained"
                style={{ backgroundColor: '#1cb13c' }}
                startIcon={<AddIcon />}
                onClick={() => onAddCurrency()}
              >
                Add New Currency
              </Button>
            ) : 
            arrPermissionCurrency?.create ? (
              <Button
                variant="contained"
                style={{ backgroundColor: '#1cb13c' }}
                startIcon={<AddIcon />}
                onClick={() => onAddCurrency()}
              >
                Add New Currency
              </Button>
            ) : ''
          }
          
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default CurrencyListFilter;
