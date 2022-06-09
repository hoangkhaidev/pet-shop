/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable prefer-const */
/* eslint-disable no-lonely-if */
/* eslint-disable radix */
/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import moment from 'moment';
import { func } from "prop-types";
import useRouter from "utils/hooks/useRouter";
import useFetchData from "utils/hooks/useFetchData";
import MainCard from "ui-component/cards/MainCard";
import { Grid } from "@mui/material";
import DateRangePickerComponent from "views/DateRangePickerComponent/DateRangePickerComponent";
import InputField from "views/InputField/InputField";
import SelectField from "views/InputField/SelectField";
import ButtonGroup, { ResetButton, SubmitButton } from "views/Button/Button";
import { makeStyles } from "@mui/styles";

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
  inputDataPicked: {
    paddingTop: "30px !important"
  },
  dateRangeInput: {
    paddingTop: "0px !important"
  },
  formControlDateTimePicker: {
    width: "100%"
  }
}));

const GameTransactionFilter = ({
  onSubmitProps, setObjFilter, gameName
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

  let gameRouter = 'all';
  if (gameName) {
    gameRouter = gameName;
  } else {
    if (router.query.game_name) {
      gameRouter = router.query.game_name;
    }
  }

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      game_name: gameRouter,
      game_type: router.query.game_type ? router.query.game_type : "all",
      time_zone: router.query.time_zone ? router.query.time_zone : tz,
      round_id: router.query.round_id ? router.query.round_id : "",
    }
  });

  useEffect(() => {
    let mapData = [{id: 0, value: "all", label: "All"}];
    let newGameType;
    newGameType = dataGame.game_type_list;
    if (!newGameType) return;
    if (newGameType.length <= 0) return;
    newGameType.map((data) => {
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
    let newGameName;
    newGameName = dataGame?.games;
    if (!newGameName) return;
    if (newGameName.length <= 0) return;
    newGameName.map((data) => {
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

  //format time router
  let formDateRouter = moment().format("DD/MM/YYYY 00:00");
  if (router.query.from_date) {
    let new_from_date = moment(router.query.from_date, "DD/MM/YYYY");
    formDateRouter = moment(new_from_date).format("DD/MM/YYYY 00:00");
  }

  let toDateRouter = moment().format("DD/MM/YYYY 23:59");
  if (router.query.to_date) {
    let new_from_date = moment(router.query.to_date, "DD/MM/YYYY");
    toDateRouter = moment(new_from_date).format("DD/MM/YYYY 23:59");
  }

  const [dateRange, setDateRange] = useState({
    start: formDateRouter,
    end: toDateRouter,
  });

  const onChangeDateRange = (startDate, endDate) => {
    setDateRange({
      start: moment(startDate).format("DD/MM/YYYY H:mm"),
      end: moment(endDate).format("DD/MM/YYYY H:mm")
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
      page: 1,
      page_size: 30,
      time_zone: tz,
      sort_field: "end_date",
      sort_order: "desc",
      player_id: Number(router.query.id),
      round_id: "",
      game_type: "all",
      game_name: "all",
    });
    setDateRange({
      start: moment().format("DD/MM/YYYY 00:00"),
      end: moment().format("DD/MM/YYYY 23:59")
    });
    setObjFilter({
      page: 1,
      page_size: 30,
      time_zone: tz,
      sort_field: "end_date",
      sort_order: "desc",
      player_id: Number(router.query.id),
      round_id: "",
      game_type: "",
      game_name: "",
      from_date: moment().format("DD/MM/YYYY 00:00"),
      to_date: moment().format("DD/MM/YYYY 23:59"),
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
                  className={classes.inputDataPicked}
                  control={control}
                  timePicker
                  maxDate={moment().format("DD/MM/YYYY 23:59")}
                  minDate={moment().subtract(29, 'days').format("DD/MM/YYYY 00:00")}
                  startDate={dateRange.start}
                  endDate={dateRange.end}
                  handleCallback={onChangeDateRange}
                  dateRangeRef={dateRangeRef}
                  format="DD/MM/YYYY H:mm"
                  showtime24={true}
                />
            </Grid>
            <Grid item xs={12} xl={3} md={4}>
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
            <Grid item xs={12} xl={3} md={4}>
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
          <Grid container spacing={2}>
            <Grid item xs={12} xl={3} md={4}>
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
                      value: "start_date",
                      label: "Start Date"
                    },
                    {
                      id: 2,
                      value: "end_date",
                      label: "End Date"
                    },
                    {
                      id: 2,
                      value: "game_name",
                      label: "Game"
                    }
                  ]
                }
                defaultValue="end_date"
              />
            </Grid>
            <Grid item xs={12} xl={3} md={4}>
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
            <SubmitButton text='Search' />
            <ResetButton onAction={onReset} />
          </ButtonGroup>
        </form>
      </MainCard>
    </>
  );
};

GameTransactionFilter.propTypes = {
  onResetFilter: func,
};

GameTransactionFilter.defaultProps = {
  onResetFilter: () => {}
};

export default GameTransactionFilter;
