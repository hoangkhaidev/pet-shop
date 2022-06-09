/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable prefer-const */
/* eslint-disable radix */
/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import moment from 'moment';
import { func } from "prop-types";
import { makeStyles } from "@mui/styles";
import useRouter from "utils/hooks/useRouter";
import useFetchData from "utils/hooks/useFetchData";
import { cloneDeep } from "lodash";
import MainCard from "ui-component/cards/MainCard";
import { Grid } from "@mui/material";
import DateRangePickerComponent from "views/DateRangePickerComponent/DateRangePickerComponent";
import InputField from "views/InputField/InputField";
import SelectField from "views/InputField/SelectField";
import ButtonGroup, { ResetButton, SubmitButton } from "views/Button/Button";

const useStyles = makeStyles(() => ({
  inputSameLineWithDaterange: {
    // marginTop: "16px !important",
    // paddingTop: "0px !important"
  },
  dateRangeInput: {
    // paddingTop: "0px !important"
  },
  formControlDateTimePicker: {
    width: "100%"
  },
  inputDataPicked: {
    paddingTop: "30px !important"
  },
}));

const GameFilter = ({
  onResetFilter, onSubmitProps, setObjFilter
}) => {
  const classes = useStyles();
  const router = useRouter();

  const dateRangeRef = useRef(null);

  const { dataResponse: dataGame} = useFetchData("/api/games");
  const { dataResponse: dataTimezone} = useFetchData("/api/timezones");

  const [gameTypeData, setGameTypeData] = useState([]);
  const [gameNameData, setGameNameData] = useState([]);
  const [timezoneData, setTimezoneData] = useState([]);

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
      game_name: router.query.game_name ? router.query.game_name : "all",
      game_type: router.query.game_type ? router.query.game_type : "all",
      time_zone: router.query.time_zone ? router.query.time_zone : tz,
      round_id: router.query.round_id ? router.query.round_id : "",
    }
  });
  
  useEffect(() => {
    let mapData = [{id: 0, value: "all", label: "All"}];
    let newGameType = cloneDeep(dataGame.game_type_list);
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
      game_type: data.game_type === 'all' ? '' : data.game_type,
      game_name: data.game_name === 'all' ? '' : data.game_name,
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
      player_id: Number(router.query.id),
      round_id: "",
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
      player_id: Number(router.query.id),
      round_id: "",
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
      <MainCard sx={{mb: '15px'}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid className={classes.inputDataPicked} item xs={12} xl={3} md={4} sx={{mt: '2px'}}>
              <DateRangePickerComponent
                startDate={dateRange.start}
                endDate={dateRange.end}
                maxDate={moment().format("DD/MM/YYYY 23:59")}
                minDate={moment().subtract(29, 'days').format("DD/MM/YYYY 00:00")}
                handleCallback={onChangeDateRange}
                format="DD/MM/YYYY"
                dateRangeRef={dateRangeRef}
              />
            </Grid>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={4}>
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
                namefileld="game_type"
                id="game_type"
                label="Game Type"
                fullWidth={false}
                options={gameTypeData}
                defaultValue="all"
              />
            </Grid>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={4} >
              <SelectField
                control={control}
                namefileld="time_zone"
                id="time_zone"
                label="Time Zone"
                fullWidth={false}
                options={timezoneData}
                defaultValue={tz}
              />
              <SelectField
                control={control}
                namefileld="game_name"
                id="game_name"
                label="Game Name"
                fullWidth={false}
                options={gameNameData}
                defaultValue="all"
              />
            </Grid>
          </Grid>
          <ButtonGroup>
            <SubmitButton text='Search' />
            <ResetButton onAction={onReset} />
          </ButtonGroup>
        </form>
      </MainCard>
    </>
  );
};

GameFilter.propTypes = {
  onResetFilter: func
};

GameFilter.defaultProps = {
  onResetFilter: () => {}
};

export default GameFilter;
