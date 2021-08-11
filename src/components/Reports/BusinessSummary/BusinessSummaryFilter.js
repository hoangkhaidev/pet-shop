import { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import moment from 'moment';
import { FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup } from "@material-ui/core";
// import { useTranslation } from "react-i18next";
import cloneDeep from 'lodash/cloneDeep';
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
// import InputField from "src/components/shared/InputField/InputField";
import SelectField from "src/components/shared/InputField/SelectField";
import DateRangePickerComponent from "src/components/shared/DateRangePickerComponent/DateRangePickerComponent";
import ButtonGroup, { SubmitButton, ResetButton } from "src/components/shared/Button/Button";
import { func } from "prop-types";
import useFetchData from "src/utils/hooks/useFetchData";
// import useRouter from "src/utils/hooks/useRouter";
// import { useSelector } from "react-redux";
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

const BusinessSummaryFilter = ({
  onResetFilter, onSubmitProps, setObjFilter
}) => {
  // const { t } = useTranslation();
//   const roleUser = useSelector((state) => state.roleUser);
//   const router = useRouter();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      brand_id: "all",
      product_id: "all",
      options: "day",
    }
  });
  const [dateRange, setDateRange] = useState({
    start: moment().startOf('month').format("DD/MM/YYYY"),
    end: moment().endOf('month').format("DD/MM/YYYY")
  });
  const dateRangeRef = useRef(null);
  const classes = useStyles();

  const { dataResponse: dataProduct } = useFetchData('/api/product');
  const { dataResponse: dataBrand} = useFetchData("/api/brand/public_list");
  
  const [brandData, setBrandData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [radio, setRadio] = useState('day');

  const handleChange = (event) => {
    console.log(event.target.value)
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
    let mapData = [{id: 0, value: "all", label: "All"}];
    let newBrand = cloneDeep(dataBrand);

    (newBrand || []).forEach(data => {
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
      start: moment(startDate).format("DD/MM/YYYY"),
      end: moment(endDate).format("DD/MM/YYYY")
    });
  };

  const onSubmit = async (data) => {
    console.log(data)
    const form = {
      ...data,
      brand_id: data.brand_id === 'all' ? 0 : Number(data.brand_id),
      product_id: data.product_id === 'all' ? 0 : Number(data.product_id),
      options: radio,
      from_date: dateRange.start,
      to_date: dateRange.end,
    };
    console.log(form)
    onSubmitProps(form);
  };

  const onResetFilterPlayer = () => {
    reset({
      brand_id: "all",
      product_id: "all",
      options: "day",
    });
    setDateRange({
      start: moment().startOf('month').format("DD/MM/YYYY"),
      end: moment().endOf('month').format("DD/MM/YYYY")
    });
    setObjFilter({
      brand_id: 0,
      product_id: 0,
      from_date: moment().startOf('month').format("DD/MM/YYYY"),
      to_date: moment().endOf('month').format("DD/MM/YYYY"),
      options: "day",
    });
    setRadio('day')
   
  }

  useEffect(() => {
    dateRangeRef.current.setStartDate(dateRange.start);
    dateRangeRef.current.setEndDate(dateRange.end);
  }, [dateRange]);

  // console.log(roleUser)

  return (
    <>
      <ContentCardPage>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid className={classes.dateRangeInput} item xs={12} xl={3} md={3}>
              <FormControl style={{ width: '100%' }}>
                <FormLabel style={{ paddingTop: '24px' }}>
                </FormLabel>
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
              <SelectField
                control={control}
                namefileld="brand_id"
                id="brand_id"
                label="Brand"
                fullWidth={false}
                options={brandData}
              />
              <SelectField
                control={control}
                namefileld="product_id"
                id="product_id"
                label="Product"
                fullWidth={false}
                options={productData}
              />
            </Grid>
            <Grid item xs={12} xl={3} md={6}>
            <RadioGroup aria-label="gender" name="options" value={radio} onChange={handleChange}>
              <div style={{ display: 'flex', paddingTop: '25px', paddingLeft: '15px' }}>
                <div>
                  <FormControlLabel value="day" control={<Radio />} label="Total by Day" />
                  <FormControlLabel value="month" control={<Radio />} label="Total by Month" />
                </div>
                <div>
                  <FormControlLabel value="week" control={<Radio />} label="Total by Week" />
                  <FormControlLabel value="year" control={<Radio />} label="Total by Year" />
                </div>
                <div style={{ whiteSpace: 'nowrap' }}>
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
      </ContentCardPage>
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
