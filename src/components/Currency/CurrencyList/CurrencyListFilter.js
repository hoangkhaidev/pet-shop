import Grid from "@material-ui/core/Grid";
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import { Button, FormControl, makeStyles } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useFetchData from "src/utils/hooks/useFetchData";
import cloneDeep from 'lodash/cloneDeep';
import { useEffect, useState } from "react";
import api from "src/utils/api";
import get from 'lodash/get';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '50ch',
    '& .MuiAutocomplete-endAdornment': {
      top: '8px !important',
    }
  },
  
}));

const CurrencyListFilter = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { dataResponse: dataCurrency} = useFetchData("/api/currency/all_for_create");

  const [currencydata, setCurrencydata] = useState([]);
  const [formState, setFormState] = useState({
    code: '',
    name: '',
    symbol: '',
  });

  useEffect(() => {
    let mapData = [];
    let newCurrency = cloneDeep(dataCurrency);
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
  }, [dataCurrency, setCurrencydata]);

  const onChangeCurrency = (event, value) => {
    let data = value.split(" - ");
    setFormState({
      code: data[0],
      name: data[1],
      symbol: data[2],
    })
  }
  // useEffect(() => {
  //   console.log(formState)
  // }, [formState])

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
    <ContentCardPage>
      <TitlePage title="Currency" />
      <Grid container spacing={2}>
        <Grid item xs={12} xl={3} md={6}>
          <FormControl className={ classes.textField } variant="outlined">
            {/* <TextField 
              id="Currency" 
              label="Enter Currency Code" 
              variant="outlined" 
              name={searchProductState}
              onChange={ onSearchCurrency }
            /> */}
            <Autocomplete
              id="currency"
              onChange={onChangeCurrency}
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
          {/* <Button variant="contained" onClick={() => onAddCurrency()}>
            Add New Currency
          </Button> */}
          <Button
            variant="contained"
            style={{ backgroundColor: '#1cb13c' }}
            startIcon={<AddIcon />}
            onClick={() => onAddCurrency()}
          >
            Add New Currency
          </Button>
        </Grid>
      </Grid>
    </ContentCardPage>
  );
};

export default CurrencyListFilter;
