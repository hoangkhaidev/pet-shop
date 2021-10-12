import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import moment from 'moment';
import { func } from "prop-types";
import get from 'lodash/get';
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import DateRangePickerComponent from "src/components/shared/DateRangePickerComponent/DateRangePickerComponent";
import InputField from "src/components/shared/InputField/InputField";
import SelectField from "src/components/shared/InputField/SelectField";
import ButtonGroup, { SubmitButton, ResetButton } from "src/components/shared/Button/Button";
import useFetchData from "src/utils/hooks/useFetchData";
import useRouter from "src/utils/hooks/useRouter";
import { useSelector } from "react-redux";
import cloneDeep from "lodash.clonedeep";
import api from "src/utils/api";
import { SORT_ODER } from "src/constants";
import SelectFieldMutiple from "src/components/shared/InputField/SelectFieldMutiple";
import SelectFieldMutipleCustom from "src/components/shared/InputField/SelectFieldMutipleCustom";

const useStyles = makeStyles(() => ({
  inputDataPicked: {
    paddingTop: "32px !important"
  },
  dateRangeInput: {
    paddingTop: "0px !important"
  },
  formControlDateTimePicker: {
    width: "100%"
  }
}));

const statusData = [
  {
    id: 1,
    value: "all",
    label: "All"
  },
  {
    id: 2,
    value: "refunded",
    label: "Refunded"
  },
  {
    id: 3,
    value: "refund",
    label: "Refund process"
  },
  {
    id: 4,
    value: "retry_result",
    label: "Retry process"
  },
  {
    id: 5,
    value: "manual_retry_refund",
    label: "Manual Refund"
  },
  {
    id: 6,
    value: "manual_retry_result",
    label: "Manual Retry"
  }
];

const FailedTransactionFilter = ({
  onResetFilter, onSubmitProps, setObjFilter, clickRef
}) => {
  const classes = useStyles();
  const router = useRouter();

  const dateRangeRef = useRef(null);
  const roleUser = useSelector((state) => state.roleUser);

  const { dataResponse: dataTimezone} = useFetchData("/api/timezones");

  const [timezoneData, setTimezoneData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);

  const [brandMultiple, setBrandMultiple] = useState(['all']);
  const [statusMultiple, setStatusMultiple] = useState(['all']);

  const pad = (number, length) => {
    let str = "" + number
    while (str.length < length) {
        str = '0' + str
    }
    return str;
  }

  let tz = new Date().getTimezoneOffset()
  tz = ((tz <0 ? '+' : '-') + pad(parseInt(Math.abs(tz / 60)), 2) + pad(Math.abs(tz % 60), 2));

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      player_id: router.query.player_id ? router.query.player_id : "",
      nick_name: "",
      round_id: "",
      time_zone: tz,
      status_list: "all"
    }
  });

  useEffect(() => {
    let mapData = [{id: 0, value: "all", label: "All"}];
    let newBrand = cloneDeep(brandsData);
    newBrand.forEach(data => {
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
    let mapData = [];
    let newTimezone;
    if(dataTimezone) {
      newTimezone = [...dataTimezone];
    }
    if (!newTimezone) return;
    if (newTimezone.length <= 0) return;
    newTimezone.forEach(data => {
      let optionData = {
        id: data.offset,
        value: data.offset,
        label: data.name,
      };
      mapData.push(optionData)
    });
    setTimezoneData([...mapData]);
  }, [dataTimezone, setTimezoneData]);

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

  const [dateRange, setDateRange] = useState({
    start: moment().format("DD/MM/YYYY 00:00"),
    end: moment().format("DD/MM/YYYY 23:59"),
  });

  const onChangeDateRange = (startDate, endDate) => {
    setDateRange({
      start: moment(startDate).format("DD/MM/YYYY H:mm"),
      end: moment(endDate).format("DD/MM/YYYY H:mm")
    });
  };

  const onSubmit = async (data) => {
    let checkBrand = brandMultiple?.findIndex(item => (item === 'all')) > -1;
    let checkStatus = statusMultiple?.findIndex(item => (item === 'all')) > -1;
    const form = {
      ...data,
      nick_name: data.nick_name ? data.nick_name : '',
      round_id: data.round_id ? data.round_id : '',
      brand_ids: checkBrand ? [] : brandMultiple,
      player_id: Number(data.player_id),
      from_date: dateRange.start,
      to_date: dateRange.end,
      status_list: checkStatus ? [] : statusMultiple,
    };
    onSubmitProps(form);
  };

  const onReset = () => {
    reset({
      page: 1,
      page_size: 30,
      time_zone: tz,
      sort_field: "end_at",
      sort_order: "desc",
      brand_ids: "all",
      round_id: "",
      player_id: "",
      nick_name: "",
    });
    setDateRange({
      start: moment().format("DD/MM/YYYY 00:00"),
      end: moment().format("DD/MM/YYYY 23:59")
    });
    setObjFilter({
      page: 1,
      page_size: 30,
      time_zone: tz,
      brand_ids: [],
      sort_field: "end_at",
      sort_order: "desc",
      player_id: 0,
      nick_name: "",
      round_id: "",
      from_date: moment().format("DD/MM/YYYY 00:00"),
      to_date: moment().format("DD/MM/YYYY 23:59"),
      status_list: []
    });
    setBrandMultiple(['all']);
    setStatusMultiple(['all']);
  };

  useEffect(() => {
    dateRangeRef.current.setStartDate(dateRange.start);
    dateRangeRef.current.setEndDate(dateRange.end);
  }, [dateRange]);

  return (
    <>
      <ContentCardPage>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid className={classes.inputDataPicked} item xs={12} xl={3} md={3}>
                <DateRangePickerComponent
                  className={classes.inputDataPicked}
                  control={control}
                  timePicker
                  startDate={dateRange.start}
                  endDate={dateRange.end}
                  maxDate={moment().format("DD/MM/YYYY 23:59")}
                  minDate={moment().subtract(29, 'days').format("DD/MM/YYYY 00:00")}
                  handleCallback={onChangeDateRange}
                  dateRangeRef={dateRangeRef}
                  format="DD/MM/YYYY H:mm"
                />
                <InputField
                  control={control}
                  namefileld="round_id"
                  type="text"
                  label="Round ID"
                  id="round_id"
                  fullWidth={false}
                />
                
            </Grid>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={3}>
              <SelectFieldMutiple
                selectDisabled= {roleUser.account_type === 'brand' ? true : false}
                options={brandData} 
                label={'Brand'} 
                id={'brand_ids'}
                setBrandMultiple={setBrandMultiple}
                brandMultiple={brandMultiple}
                defaultValue={'all'}
              />
              <SelectField
                control={control}
                namefileld="time_zone"
                id="time_zone"
                label="Time Zone"
                fullWidth={false}
                options={timezoneData}
                defaultValue={tz}
              />
            </Grid>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={3}>
              <InputField
                control={control}
                namefileld="player_id"
                type="text"
                label="Player ID"
                id="player_id"
                fullWidth={false}
              />
              <div style={{ marginTop: '-16px' }}>
                <SelectFieldMutipleCustom
                  options={statusData} 
                  label={'Round Status'} 
                  id={'status_list'}
                  setStateMultiple={setStatusMultiple}
                  stateMultiple={statusMultiple}
                  defaultValue={'all'}
                />
              </div>
            </Grid>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={3}>
              <InputField
                control={control}
                namefileld="nick_name"
                type="text"
                label="Nickname"
                id="nick_name"
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
                      value: "start_at",
                      label: "Start Date"
                    },
                    {
                      id: 2,
                      value: "end_at",
                      label: "End Date"
                    },
                    {
                      id: 2,
                      value: "game",
                      label: "Game"
                    }
                  ]
                }
                defaultValue="end_at"
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
                defaultValue="desc"
              />
            </Grid>
          </Grid>
          <ButtonGroup>
            <SubmitButton text='Search' clickRef={clickRef} />
            <ResetButton onAction={onReset} />
          </ButtonGroup>
        </form>
      </ContentCardPage>
    </>
  );
};

FailedTransactionFilter.propTypes = {
  onResetFilter: func,
};

FailedTransactionFilter.defaultProps = {
  onResetFilter: () => {}
};

export default FailedTransactionFilter;