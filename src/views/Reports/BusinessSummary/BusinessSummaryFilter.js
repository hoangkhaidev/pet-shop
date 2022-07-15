/* eslint-disable import/no-duplicates */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';
import { func } from "prop-types";
import { useSelector } from "react-redux";
import get from 'lodash/get';
import useRouter from "utils/hooks/useRouter";
import { makeStyles } from "@mui/styles";
import useFetchData from "utils/hooks/useFetchData";
import api from "utils/api";
import MainCard from "ui-component/cards/MainCard";
import { FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { FormControl } from "@mui/material";
import DateRangePickerComponent from "views/DateRangePickerComponent/DateRangePickerComponent";
import SelectFieldMultiple from "views/InputField/SelectFieldMutiple";
import SelectFieldMutipleCustom from "views/InputField/SelectFieldMutipleCustomer";
import ButtonGroup, { ResetButton, SubmitButton } from "views/Button/Button";

const useStyles = makeStyles(() => ({
  inputSameLineWithDaterange: {
    marginTop: "16px !important",
    paddingTop: "0px !important"
  },
  dateRangeInput: {
    paddingTop: "0px !important"
  },
  textNowrap: {
    whiteSpace: 'nowrap',
    ['@media (max-width:991px)']: { // eslint-disable-line no-useless-computed-key
      whiteSpace: 'unset',
    }
  }
}));

const BusinessSummaryFilter = ({
  onSubmitProps, setObjFilter
}) => {
  const router = useRouter();
  const roleUser = useSelector((state) => state.roleUser);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      option: "day",
    }
  });

  const [dateRange, setDateRange] = useState({
    start: router.query.from_date_router ? router.query.from_date_router : moment().startOf('month').format("DD/MM/YYYY"),
    end: router.query.to_date_router ? router.query.to_date_router : moment().endOf('month').format("DD/MM/YYYY")
  });

  let brand_router = [];

  if (router?.query?.brand_id_router === 0) {
    brand_router = [];
  }

  if (router?.query?.brand_id_router) {
    if (Array.isArray(router?.query?.brand_id_router)) {
      brand_router = (router.query.brand_id_router || [router.query.brand_id_router]).map((item) => {
        return Number(item);
      });
    } else {
      brand_router = [Number(router.query.brand_id_router)];
    }
  };

  let brandStart = router?.query.brand_id_router ? brand_router : ['all'];
  let productStart = router?.query.product_ids ? [Number(router?.query.product_ids)] : ['all'];
  const [brandMultiple, setBrandMultiple] = useState(brandStart);
  const [productMultiple, setProductMultiple] = useState(productStart);

  const dateRangeRef = useRef(null);
  const classes = useStyles();

  const { dataResponse: dataProduct } = useFetchData('/api/product');
  
  const [brandData, setBrandData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [productData, setProductData] = useState([]);

  let optionStart = router?.query.option ? router?.query.option : 'day';
  const [radio, setRadio] = useState(optionStart);

  const handleChange = (event) => {
    setRadio(event.target.value);
  };

  useEffect(() => {
    let mapData = [{id: 0, value: "all", label: "All"}];
    let newProducts = cloneDeep(dataProduct);
    (newProducts || []).forEach((data, index) => {
      let optionData = {
        id: data.id,
        value: data.id,
        label: data.name,
      };
      mapData.push(optionData)
    });
    setProductData([...mapData]);
  }, [dataProduct, setProductData]);
  
  useEffect(() => {
    let mapData = [{id: 0, value: "all", label: "All without Test"}];
    let newBrand = cloneDeep(brandsData);

    (newBrand || []).forEach(data => {
      let optionData = {
        id: data.brand_id,
        value: data.brand_id,
        label: data.username,
        is_test: data.is_test
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
    let checkBrand = brandMultiple?.findIndex(item => (item === 'all')) > -1;
    let checkProduct = productMultiple?.findIndex(item => (item === 'all')) > -1;
    const form = {
      ...data,
      brand_ids: checkBrand ? [] : brandMultiple,
      product_ids: checkProduct ? [] : productMultiple,
      option: radio,
      from_date: dateRange.start,
      to_date: dateRange.end,
      sort_field: radio === 'brand' ? radio : "period",
    };
    onSubmitProps(form);
  };

  const onResetFilterPlayer = () => {
    reset({
      option: "day",
    });
    setDateRange({
      start: moment().startOf('month').format("DD/MM/YYYY"),
      end: moment().endOf('month').format("DD/MM/YYYY")
    });
    setObjFilter({
      brand_ids: [],
      product_ids: [],
      sort_order: "desc",
      sort_field: "period",
      from_date: moment().startOf('month').format("DD/MM/YYYY"),
      to_date: moment().endOf('month').format("DD/MM/YYYY"),
      option: "day",
    });
    setBrandMultiple(['all']);
    setProductMultiple(['all']);
    setRadio('day')
   
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
            <Grid className={classes.dateRangeInput} item xs={12} xl={3} md={3} sx={{mt: '7px'}}>
              <FormControl style={{ width: '100%' }}>
                <FormLabel style={{ paddingTop: '24px' }}></FormLabel>
                <DateRangePickerComponent
                  control={control}
                  handleCallback={onChangeDateRange}
                  startDate={dateRange.start}
                  endDate={dateRange.end}
                  dateRangeRef={dateRangeRef}
                  format="DD/MM/YYYY"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} xl={3} md={3}>
              <SelectFieldMultiple
                selectDisabled= {roleUser.account_type === 'brand' ? true : false}
                options={brandData} 
                label={'Brand'} 
                id={'brand_ids'}
                setBrandMultiple={setBrandMultiple}
                brandMultiple={brandMultiple}
                defaultValue={'all'}
              />
              <SelectFieldMutipleCustom
                options={productData}
                label={'Product'} 
                id={'product_ids'}
                setStateMultiple={setProductMultiple}
                stateMultiple={productMultiple}
                defaultValue={'all'}
              />
            </Grid>
            <Grid item xs={12} xl={3} md={6}>
            <RadioGroup aria-label="gender" name="option" value={radio} onChange={handleChange}>
              <div style={{ display: 'flex', paddingTop: '25px', paddingLeft: '15px' }}>
                <div>
                  <FormControlLabel value="day" control={<Radio />} label="Total by Day" />
                  <FormControlLabel value="month" control={<Radio />} label="Total by Month" />
                </div>
                <div>
                  <FormControlLabel value="week" control={<Radio />} label="Total by Week" />
                  <FormControlLabel value="year" control={<Radio />} label="Total by Year" />
                </div>
                <div className={classes.textNowrap} >
                  <FormControlLabel value="brand" control={<Radio />} label="Total by Brand" />
                </div>
              </div>
            </RadioGroup>
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

BusinessSummaryFilter.propTypes = {
  onResetFilter: func,
  onSubmitProps: func
};

BusinessSummaryFilter.defaultProps = {
  onResetFilter: () => {},
  onSubmitProps: () => {}
};

export default BusinessSummaryFilter;
