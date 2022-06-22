/* eslint-disable import/no-duplicates */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import moment from 'moment';
import { useTranslation } from "react-i18next";
import cloneDeep from 'lodash/cloneDeep';
import { func } from "prop-types";
import { useSelector } from "react-redux";
import get from 'lodash/get';
import { makeStyles } from "@mui/styles";
import useRouter from "utils/hooks/useRouter";
import useFetchData from "utils/hooks/useFetchData";
import api from "utils/api";
import MainCard from "ui-component/cards/MainCard";
import { FormLabel, Grid } from "@mui/material";
import { FormControl } from "@mui/material";
import SelectField from "views/InputField/SelectField";
import ButtonGroup, { ResetButton, SubmitButton } from "views/Button/Button";
import DateRangePickerComponent from "views/DateRangePickerComponent/DateRangePickerComponent";
import InputField from "views/InputField/InputField";
import InputNumber from "views/InputField/InputNumber";

const SORT_ODER = [
  {
    id: 1,
    value: "asc",
    label: "ASC"
  },
  {
    id: 2,
    value: "desc",
    label: "DESC"
  }
];

const useStyles = makeStyles(() => ({
  inputSameLineWithDaterange: {
    marginTop: "16px !important",
    paddingTop: "0px !important"
  },
  dateRangeInput: {
    paddingTop: "0px !important"
  }
}));

const PLayerListFilter = ({
  onSubmitProps, setObjFilter
}) => {
  const { t } = useTranslation();
  const roleUser = useSelector((state) => state.roleUser);
  const router = useRouter();

  let playerRouter = '';
  if (router?.query.player_id && Number(router?.query.player_id) !== 0) {
    playerRouter = router?.query.player_id;
  }
  
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      brand_id: router?.query?.brand_id ? router?.query?.brand_id : 0,
      player_id: playerRouter,
      nick_name: router?.query?.nick_name ? router?.query?.nick_name : '',
      ip_address: router?.query?.ip_address ? router?.query?.ip_address : '',
      currency: router?.query?.currency ? router?.query?.currency : 'all',
      language: router?.query?.language ? router?.query?.language : 'all',
    }
  });

  let from_dateFilter = moment().format("DD/MM/YYYY");
  if (router?.query?.from_date) {
    from_dateFilter = router?.query?.from_date;
  }

  let to_dateFilter = moment().format("DD/MM/YYYY");
  if (router?.query?.to_date) {
    to_dateFilter = router?.query?.to_date;
  }

  const [dateRange, setDateRange] = useState({
    start: from_dateFilter,
    end: to_dateFilter
  });
  const dateRangeRef = useRef(null);
  const classes = useStyles();

  const { dataResponse: dataCurrency} = useFetchData("/api/currency/public_list");
  const { dataResponse: dataLanguage} = useFetchData("/api/language");
  
  const [brandData, setBrandData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);
  const [languageData, setLanguageData] = useState([]);

  useEffect(() => {
    let mapData = [{id: 0, value: 'all', label: "All"}];
    let newLanguage = cloneDeep(dataLanguage);
    (newLanguage || []).forEach((data) => {
      let optionData = {
        id: data.code,
        value: data.code,
        label: data.name,
      };
      mapData.push(optionData)
    });
    setLanguageData([...mapData]);
  }, [dataLanguage, setLanguageData]);
  
  useEffect(() => {
    let mapData = [{id: 0, value: 'all', label: "All"}];
    let newCurrency = cloneDeep(dataCurrency);
    (newCurrency || []).forEach((data) => {
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
    let mapData = [{id: 0, value: 0, label: "All"}];
    let newBrand = cloneDeep(brandsData);

    (newBrand || []).forEach(data => {
      let optionData = {
        id: data.brand_id,
        value: data.brand_id,
        label: data.username,
      };
      mapData.push(optionData)
    });
    setBrandData([...mapData]);
  }, [brandsData, setBrandData]);

  useEffect(() => {
    if (roleUser.account_type !== 'brand') {
      onDataBrand();
    }
  }, [roleUser]);

  const onDataBrand = async () => {
    const response = await api.post('/api/brand/public_list', null);
    if (get(response, "success", false)) {
      setBrandsData(response?.data);
    } else {
      console.log("response", response);
    }
  };

  const onChangeDateRange = (startDate, endDate) => {
    setDateRange({
      start: moment(startDate).format("DD/MM/YYYY"),
      end: moment(endDate).format("DD/MM/YYYY")
    });
  };

  const onSubmit = async (data) => {
    const form = {
      ...data,
      brand_id: data.brand_id === 'all' ? 0 : Number(data.brand_id),
      language: data.language === 'all' ? '' : data.language,
      currency: data.currency === 'all' ? '' : data.currency,
      ip_address: data.ip_address ? data.ip_address : '',
      nick_name: data.nick_name ? data.nick_name : '',
      player_id: data.player_id ? Number(data.player_id) : 0,
      from_date: dateRange.start,
      to_date: dateRange.end,
    };
    onSubmitProps(form);
  };

  const onResetFilterPlayer = () => {
    reset({
      player_id: "",
      nick_name: "",
      brand_id: 0,
      ip_address: "",
      language: "all",
      currency: "all",
      sort_field: "id",
      sort_order: "desc",
      page: 1,
      page_size: 30,
    });
    setDateRange({
      start: moment().format("DD/MM/YYYY"),
      end: moment().format("DD/MM/YYYY")
    });
    setObjFilter({
      player_id: 0,
      nick_name: "",
      brand_id: 0,
      ip_address: "",
      from_date: moment().format("DD/MM/YYYY"),
      to_date: moment().format("DD/MM/YYYY"),
      language: "",
      currency: "",
      sort_field: "id",
      sort_order: "desc",
      page: 1,
      page_size: 30,
    });
  }

  useEffect(() => {
    dateRangeRef.current.setStartDate(dateRange.start);
    dateRangeRef.current.setEndDate(dateRange.end);
  }, [dateRange]);

  return (
    <>
      <MainCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item  xs={12} xl={3} md={3}>
              <InputNumber
                namefileld="player_id"
                label="Player ID"
                id="player_id"
                control={control}
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
              />
            </Grid>
            <Grid className={classes.dateRangeInput} item xs={12} xl={3} md={3}>
              <FormControl style={{ width: '100%', marginTop: '12px' }}>
                <FormLabel>
                  {t("Last Login")}
                </FormLabel>
                <DateRangePickerComponent
                  control={control}
                  handleCallback={onChangeDateRange}
                  startDate={dateRange.start}
                  endDate={dateRange.end}
                  dateRangeRef={dateRangeRef}
                  showtime24={false}
                  format="DD/MM/YYYY"
                />
              </FormControl>
            </Grid>
            
            <Grid item xs={12} xl={3} md={3}>
              <SelectField
                selectDisabled= {roleUser.account_type === 'brand' ? true : false}
                control={control}
                namefileld="brand_id"
                id="brand_id"
                label="Brand"
                fullWidth={false}
                options={brandData}
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
              />
            </Grid>
            <Grid item xs={12} xl={3} md={3}>
              <SelectField
                control={control}
                namefileld="language"
                id="language"
                label="Language"
                options={languageData}
                fullWidth={false}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} xl={3} md={3}>
              <SelectField
                control={control}
                namefileld="sort_field"
                id="sort_field"
                label="Sort field"
                fullWidth={false}
                options={
                  [
                    {
                      id: 1,
                      value: "id",
                      label: "Player ID"
                    },
                    {
                      id: 2,
                      value: "username",
                      label: "Nickname"
                    },
                    {
                      id: 3,
                      value: "created_at",
                      label: "Sign Up"
                    },
                    {
                      id: 4,
                      value: "last_login_in",
                      label: "Last Login Time"
                    }
                  ]
                }
                defaultValue="id"
              />
            </Grid>
            <Grid item xs={12} xl={3} md={3}>
              <SelectField
                control={control}
                namefileld="sort_order"
                id="sort_order"
                label="Sort order"
                options={SORT_ODER}
                fullWidth={false}
                defaultValue="asc"
              />
            </Grid>
          </Grid>
          <ButtonGroup>
            <SubmitButton text={'Search'} />
            <ResetButton onAction={onResetFilterPlayer} />
          </ButtonGroup>
        </form>
      </MainCard>
    </>
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
