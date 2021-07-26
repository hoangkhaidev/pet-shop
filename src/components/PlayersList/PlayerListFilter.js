import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import moment from 'moment';
import { FormControl, FormLabel, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import InputField from "src/components/shared/InputField/InputField";
import SelectField from "src/components/shared/InputField/SelectField";
import DateRangePickerComponent from "src/components/shared/DateRangePickerComponent/DateRangePickerComponent";
import ButtonGroup, { SubmitButton, ResetButton } from "src/components/shared/Button/Button";
import { func } from "prop-types";
import useFetchData from "src/utils/hooks/useFetchData";
// import { FormattedNumberInputCaptcha } from "../shared/InputField/InputFieldNumber";

const useStyles = makeStyles(() => ({
  inputSameLineWithDaterange: {
    marginTop: "16px !important",
    paddingTop: "0px !important"
  },
  dateRangeInput: {
    paddingTop: "0px !important"
  }
}));

// const fakeLanguages = [
//   {
//     id: 1,
//     label: "Vietnamese",
//     value: "vietnamese"
//   },
//   {
//     id: 2,
//     label: "English",
//     value: "english"
//   }
// ];

const PLayerListFilter = ({
  onResetFilter, onSubmitProps
}) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm();
  const [dateRange, setDateRange] = useState({
    start: moment().format("DD/MM/YYYY"),
    end: moment().format("DD/MM/YYYY")
  });
  const classes = useStyles();

  
  const { dataResponse: dataBrand} = useFetchData("/api/brand");
  const { dataResponse: dataCurrency} = useFetchData("/api/currency");
  
  const [brandData, setBrandData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);


 // useEffect(() => {
  //   console.log(currencyData);
  // }, [currencyData])

  useEffect(() => {
    let mapData = [];
    let newCurrency;
    newCurrency = [...dataCurrency];
    if (!newCurrency) return;
    if (newCurrency.length <= 0) return;
    newCurrency.forEach((data, index) => {
      let optionData = {
        id: data.code,
        value: data.code,
        label: data.name,
      };
      mapData.push(optionData)
    });
    setCurrencyData([...mapData]);
  }, [dataCurrency, setCurrencyData]);

  useEffect(() => {
    let mapData = [{id: 0, value: "all", label: "All"}];
    let newBrand;
    if(dataBrand?.list) {
      newBrand = [...dataBrand?.list];
    }
    if (!newBrand) return;
    if (newBrand.length <= 0) return;
    newBrand.forEach(data => {
      let optionData = {
        id: data.BrandId,
        value: data.BrandId,
        label: data.username,
      };
      mapData.push(optionData)
    });
    setBrandData([...mapData]);
  }, [dataBrand, setBrandData]);

  const onChangeDateRange = (startDate, endDate) => {
    // console.log(startDate, endDate);
    setDateRange({
      start: startDate,
      end: endDate
    });
  };

  // useEffect(() => {
  //   console.log(dateRange);
  // }, [dateRange])

  const onSubmit = async (data) => {
    const form = {
      ...data,
      brand_id: data.brand_id === 'all' ? 0 : Number(data.brand_id),
      ip_address: data.ip_address ? data.ip_address : '',
      nick_name: data.nick_name ? data.nick_name : '',
      player_id: data.player_id ? Number(data.player_id) : 0,
      from_date: moment(dateRange.start).format("DD/MM/YYYY"),
      to_date: moment(dateRange.end).format("DD/MM/YYYY"),
    };
    onSubmitProps(form);
  };

  return (
    <Fragment>
      <ContentCardPage>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} xl={3} md={3}>
              <InputField
                control={control}
                namefileld="player_id"
                type="text"
                label="Player ID"
                id="player_id"
                fullWidth={false}
              />
            </Grid>
            <Grid item xs={12} xl={3} md={3}>
              <InputField
                control={control}
                namefileld="nick_name"
                type="text"
                label="Nickname"
                id="nick_name"
                fullWidth={false}
                defaultValue=""
              />
            </Grid>
            
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={3}>
              <InputField
                control={control}
                namefileld="ip_address"
                type="text"
                label="IP Address"
                id="ip_address"
                fullWidth={false}
                defaultValue=""
              />
            </Grid>
            <Grid className={classes.dateRangeInput} item xs={12} xl={3} md={3}>
              <FormControl style={{ width: '100%' }}>
                <FormLabel>
                  {t("Last Login")}
                </FormLabel>
                <DateRangePickerComponent
                  control={control}
                  handleCallback={onChangeDateRange}
                  startDate={dateRange.start}
                  endDate={dateRange.end}
                />
              </FormControl>
            </Grid>
            
            <Grid item xs={12} xl={3} md={3}>
              <SelectField
                control={control}
                namefileld="brand_id"
                id="brand_id"
                label="Brand"
                fullWidth={false}
                options={brandData}
                defaultValue="all"
              />
            </Grid>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={3}>
              <SelectField
                control={control}
                namefileld="currency"
                id="currency"
                label="Currency"
                fullWidth={false}
                options={currencyData}
                defaultValue=""
              />
            </Grid>
            <Grid item xs={12} xl={3} md={3}>
              <SelectField
                control={control}
                namefileld="language"
                id="language"
                label="Language"
                fullWidth={false}
                defaultValue=""
              />
            </Grid>
          </Grid>
          <ButtonGroup>
            <SubmitButton text={'Search'} />
            <ResetButton onAction={onResetFilter} />
          </ButtonGroup>
        </form>
      </ContentCardPage>
    </Fragment>
  );
};

PLayerListFilter.propTypes = {
  onResetFilter: func,
  onSubmitProps: func
};

PLayerListFilter.defaultProps = {
  onResetFilter: () => {},
  onSubmitProps: () => {}
};

export default PLayerListFilter;
