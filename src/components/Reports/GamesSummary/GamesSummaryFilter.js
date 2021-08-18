import { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import moment from 'moment';
import { FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup } from "@material-ui/core";
import cloneDeep from 'lodash/cloneDeep';
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import SelectField from "src/components/shared/InputField/SelectField";
import DateRangePickerComponent from "src/components/shared/DateRangePickerComponent/DateRangePickerComponent";
import ButtonGroup, { SubmitButton, ResetButton } from "src/components/shared/Button/Button";
import { func } from "prop-types";
import useFetchData from "src/utils/hooks/useFetchData";
import { useSelector } from "react-redux";
import api from "src/utils/api";
import get from 'lodash/get';

const useStyles = makeStyles(() => ({
  inputSameLineWithDaterange: {
    marginTop: "16px !important",
    paddingTop: "0px !important"
  },
  dateRangeInput: {
    paddingTop: "0px !important"
  }
}));

const GamesSummaryFilter = ({
  onResetFilter, onSubmitProps, setObjFilter
}) => {
  //   const router = useRouter();
  const roleUser = useSelector((state) => state.roleUser);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      brand_ids: "all",
      product_ids: "all",
      option: "day",
    }
  });

  const [dateRange, setDateRange] = useState({
    start: moment().startOf('month').format("DD/MM/YYYY"),
    end: moment().endOf('month').format("DD/MM/YYYY")
  });
  const dateRangeRef = useRef(null);
  const classes = useStyles();

  const { dataResponse: dataProduct } = useFetchData('/api/product');
  
  const [brandData, setBrandData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [radio, setRadio] = useState('day');

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
    let mapData = [{id: 0, value: "all", label: "All"}];
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleUser]);

  const onDataBrand = async () => {
    const response = await api.post('/api/brand/public_list', null);
    if (get(response, "success", false)) {
      setBrandsData(response?.data);
    } else {
      console.log("response", response);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const onChangeDateRange = (startDate, endDate) => {
    // console.log(startDate, endDate);
    setDateRange({
      start: moment(startDate).format("DD/MM/YYYY"),
      end: moment(endDate).format("DD/MM/YYYY")
    });
  };

  const onSubmit = async (data) => {
    // console.log(data)
    const form = {
      ...data,
      brand_ids: data.brand_ids === 'all' ? [] : [Number(data.brand_ids)],
      product_ids: data.product_ids === 'all' ? [] : [Number(data.product_ids)],
      option: radio,
      from_date: dateRange.start,
      to_date: dateRange.end,
    };
    // console.log(form)
    onSubmitProps(form);
  };

  const onResetFilterPlayer = () => {
    reset({
      brand_ids: "all",
      product_ids: "all",
      option: "day",
    });
    setDateRange({
      start: moment().startOf('month').format("DD/MM/YYYY"),
      end: moment().endOf('month').format("DD/MM/YYYY")
    });
    setObjFilter({
      brand_ids: [],
      product_ids: [],
      from_date: moment().startOf('month').format("DD/MM/YYYY"),
      to_date: moment().endOf('month').format("DD/MM/YYYY"),
      option: "day",
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
                selectDisabled= {roleUser.account_type === 'brand' ? true : false}
                control={control}
                namefileld="brand_ids"
                id="brand_ids"
                label="Brand"
                fullWidth={false}
                options={brandData}
              />
              <SelectField
                control={control}
                namefileld="product_ids"
                id="product_ids"
                label="Product"
                fullWidth={false}
                options={productData}
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

GamesSummaryFilter.propTypes = {
  onResetFilter: func,
  onSubmitProps: func
};

GamesSummaryFilter.defaultProps = {
  onResetFilter: () => {},
  onSubmitProps: () => {}
};

export default GamesSummaryFilter;
