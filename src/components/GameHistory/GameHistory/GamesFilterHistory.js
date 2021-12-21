/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import moment from 'moment';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import { func } from "prop-types";
import get from 'lodash/get';
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import DateRangePickerComponent from "src/components/shared/DateRangePickerComponent/DateRangePickerComponent";
import InputField from "src/components/shared/InputField/InputField";
import SelectField from "src/components/shared/InputField/SelectField";
import ButtonGroup, { SubmitButton, ResetButton } from "src/components/shared/Button/Button";
import useFetchData from "src/utils/hooks/useFetchData";
import { useSelector } from "react-redux";
import api from "src/utils/api";
import InputNumber from "src/components/shared/InputField/InputNumber";
import useRouter from "src/utils/hooks/useRouter";
import cloneDeep from "lodash.clonedeep";

const useStyles = makeStyles(() => ({
  inputSameLineWithDaterange: {
    marginTop: "16px !important",
    paddingTop: "0px !important"
  },
  dateRangeInput: {
    paddingTop: "0px !important"
  },
  formControlDateTimePicker: {
    width: "100%"
  },
  inputDataPicked: {
    paddingTop: "16px !important"
  },
}));

const GamesFilterHistory = ({
  onSubmitProps, setObjFilter, clickRef
}) => {
  const classes = useStyles();
  const router = useRouter();

  const roleUser = useSelector((state) => state.roleUser);

  const dateRangeRef = useRef(null);

  const { dataResponse: dataGame} = useFetchData("/api/games");
  const { dataResponse: dataTimezone} = useFetchData("/api/timezones");

  const [gameTypeData, setGameTypeData] = useState([]);
  const [gameNameData, setGameNameData] = useState([]);
  const [timezoneData, setTimezoneData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);

  const pad = (number, length) => {
    let str = "" + number
    while (str.length < length) {
        str = '0' + str
    }
    return str;
  }

  let tz = new Date().getTimezoneOffset()
  tz = ((tz <0 ? '+' : '-') + pad(parseInt(Math.abs(tz / 60)), 2) + pad(Math.abs(tz % 60), 2));

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      player_id: router.query.player_id ? Number(router.query.player_id) : "",
      brand_id: router.query.brand_id ? Number(router.query.brand_id) : "",
      game_name: router.query.game_name ? router.query.game_name : "all",
      game_type: router.query.game_type ? router.query.game_type : "all",
      time_zone: router.query.time_zone ? router.query.time_zone : tz,
      round_id: router.query.round_id ? router.query.round_id : "",
      nick_name: router.query.nick_name ? router.query.nick_name : "",
    }
  });

  useEffect(() => {
    let mapData = [];
    if (roleUser.account_type === 'brand') {
      mapData = [{id: 0, value: 0, label: ""}];
    }
    let newBrand = cloneDeep(brandsData);
    newBrand?.forEach(data => {
      let optionData = {
        id: data.brand_id,
        value: data.brand_id,
        label: data.username,
      };
      mapData.push(optionData)
    });
    setBrandData([...mapData]);
  }, [brandsData, setBrandData])
  
  useEffect(() => {
    let mapData = [{id: 0, value: "all", label: "All"}];
    let newGameType = cloneDeep(dataGame?.game_type_list);
    newGameType?.map((data) => {
      let optionData = {
        id: data,
        value: data,
        label: data,
      };
      mapData.push(optionData);
      return data;
    });
    setGameTypeData([...mapData]);
  }, [dataGame, setGameTypeData]);

  useEffect(() => {
    let mapData = [{id: 0, value: "all", label: "All"}];
    let newGameName = cloneDeep(dataGame?.games);
    newGameName?.map((data) => {
      let optionData = {
        id: data.game_name,
        value: data.game_name,
        label: data.game_name,
      };
      mapData.push(optionData);
      return data;
    });
    setGameNameData([...mapData]);
  }, [dataGame, setGameNameData]);

  useEffect(() => {
    let mapData = [];
    let newTimezone = cloneDeep(dataTimezone);
    newTimezone?.forEach(data => {
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

  //format time router
  let formDateRouter = moment().format("DD/MM/YYYY");
  if (router.query.from_date) {
    let new_from_date = moment(router.query.from_date, "DD/MM/YYYY");
    formDateRouter = moment(new_from_date).format("DD/MM/YYYY");
  }

  let toDateRouter = moment().format("DD/MM/YYYY");
  if (router.query.to_date) {
    let new_from_date = moment(router.query.to_date, "DD/MM/YYYY");
    toDateRouter = moment(new_from_date).format("DD/MM/YYYY");
  }

  const [dateRange, setDateRange] = useState({
    start: formDateRouter,
    end: toDateRouter
  });

  const onChangeDateRange = (startDate, endDate) => {
    setDateRange({
      start: moment(startDate).format("DD/MM/YYYY"),
      end: moment(endDate).format("DD/MM/YYYY")
    });
  };

  const onSubmit = async (data) => {
    const form = {
      ...data,
      game_name: data.game_name === 'all' ? '' : data.game_name,
      game_type: data.game_type === 'all' ? '' : data.game_type,
      brand_id: data?.brand_id === '' ? data?.brand_id : Number(data.brand_id),
      player_id: Number(data.player_id),
      from_date: dateRange.start,
      to_date: dateRange.end,
    };
    onSubmitProps(form);
  };

  const onReset = () => {
    reset({
      time_zone: tz,
      sort_field: "start_date",
      sort_order: "DESC",
      player_id: "",
      round_id: "",
      brand_id: "",
      nick_name: "",
      game_type: "all",
      game_name: "all",
    });
    setDateRange({
      start: moment().format("DD/MM/YYYY"),
      end: moment().format("DD/MM/YYYY")
    });
    setObjFilter({
      time_zone: tz,
      sort_field: "start_date",
      sort_order: "DESC",
      player_id: "",
      round_id: "",
      brand_id: "",
      game_type: "",
      game_name: "",
      from_date: moment().format("DD/MM/YYYY"),
      to_date: moment().format("DD/MM/YYYY"),
    });
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
              <SelectField
                selectDisabled= {roleUser.account_type === 'brand' ? true : false}
                control={control}
                namefileld="brand_id"
                errors={errors?.brand_id}
                id="brand_id"
                label="Brand"
                required={roleUser.account_type === 'brand' ? false : true}
                options={brandData}
                fullWidth={false}
              />
              <DateRangePickerComponent
                startDate={dateRange.start}
                endDate={dateRange.end}
                handleCallback={onChangeDateRange}
                maxDate={moment().format("DD/MM/YYYY 23:59")}
                minDate={moment().subtract(29, 'days').format("DD/MM/YYYY 00:00")}
                format="DD/MM/YYYY"
                dateRangeRef={dateRangeRef}
              />
            </Grid>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={3}>
              <InputNumber
                namefileld="player_id"
                label="Player ID"
                id="player_id"
                control={control}
              />
              <SelectField
                control={control}
                namefileld="game_type"
                id="game_type"
                label="Game Type"
                fullWidth={false}
                options={gameTypeData}
              />
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
              <SelectField
                control={control}
                namefileld="game_name"
                id="game_name"
                label="Game Name"
                fullWidth={false}
                options={gameNameData}
              />
            </Grid>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={3}>
              <InputField
                control={control}
                namefileld="round_id"
                type="text"
                label="Round ID"
                id="round_id"
                fullWidth={false}
              />
              <SelectField
                control={control}
                namefileld="time_zone"
                id="time_zone"
                label="Time Zone"
                fullWidth={false}
                options={timezoneData}
              />
            </Grid>
          </Grid>
          <ButtonGroup>
            <SubmitButton text='Search' clickRef={clickRef} />
            <ResetButton onAction={onReset}/>
          </ButtonGroup>
        </form>
      </ContentCardPage>
    </>
  );
};

GamesFilterHistory.propTypes = {
  onResetFilter: func
};

GamesFilterHistory.defaultProps = {
  onResetFilter: () => {}
};

export default GamesFilterHistory;
