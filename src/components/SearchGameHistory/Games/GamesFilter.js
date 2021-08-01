import { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
// import FormControl from "@material-ui/core/FormControl";
import { useTranslation } from "react-i18next";
import moment from 'moment';
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core";
import { func } from "prop-types";

import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import DateRangePickerComponent from "src/components/shared/DateRangePickerComponent/DateRangePickerComponent";
import InputField from "src/components/shared/InputField/InputField";
import SelectField from "src/components/shared/InputField/SelectField";
import ButtonGroup, { SubmitButton, ResetButton } from "src/components/shared/Button/Button";
import useRouter from "src/utils/hooks/useRouter";
import useFetchData from "src/utils/hooks/useFetchData";
// import { DateRangeContext } from "../SearchGameHistory";

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
    paddingTop: "32px !important"
  },
}));

const GameFilter = ({
  onResetFilter, onSubmitProps, setObjFilter
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
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
      round_id: "",
      time_zone: tz,
      game_type: "all",
      game_name: ""
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
    let mapData = [];
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

  const [dateRange, setDateRange] = useState({
    start: moment().format("DD/MM/YYYY"),
    end: moment().format("DD/MM/YYYY")
  });

  const onChangeDateRange = (startDate, endDate) => {
    setDateRange({
      start: moment(startDate).format("DD/MM/YYYY"),
      end: moment(endDate).format("DD/MM/YYYY")
    });
  };

  const onSubmit = async (data) => {
    // console.log(data);
    const form = {
      ...data,
      game_type: data.game_type === 'all' ? '' : data.game_type,
      from_date: dateRange.start,
      to_date: dateRange.end,
    };
    onSubmitProps(form);
  };

  const onReset = () => {
    reset({
      time_zone: tz,
      sort_field: "start_at",
      sort_order: "DESC",
      player_id: Number(router.query.id),
      round_id: "",
      game_type: "all",
      game_name: "",
    });
    setDateRange({
      start: moment().format("DD/MM/YYYY"),
      end: moment().format("DD/MM/YYYY")
    });
    setObjFilter({
      time_zone: tz,
      sort_field: "start_at",
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
    <Fragment>
      <ContentCardPage>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid className={classes.inputDataPicked} item xs={12} xl={3} md={4}>
              <DateRangePickerComponent
                startDate={dateRange.start}
                endDate={dateRange.end}
                maxDate={moment().format("DD/MM/YYYY 23:59")}
                minDate={moment().subtract(29, 'days').format("DD/MM/YYYY 00:00")}
                handleCallback={onChangeDateRange}
                format="DD/MM/YYYY"
                dateRangeRef={dateRangeRef}
              />
              <FormLabel style={{marginLeft: '10px', marginTop: '5px'}}>
                {t("Form - To")}
              </FormLabel>
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
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={4}>
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
                defaultValue=""
              />
            </Grid>
           
          </Grid>
          <ButtonGroup>
            <SubmitButton text='Search' />
            <ResetButton onAction={onReset} />
          </ButtonGroup>
        </form>
      </ContentCardPage>
    </Fragment>
  );
};

GameFilter.propTypes = {
  onResetFilter: func
};

GameFilter.defaultProps = {
  onResetFilter: () => {}
};

export default GameFilter;
