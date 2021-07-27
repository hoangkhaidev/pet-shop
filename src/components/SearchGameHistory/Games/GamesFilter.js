import { Fragment, useState } from "react";
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
// import { DateRangeContext } from "../SearchGameHistory";

const fakeTimezones = [
  {
    id: 1,
    value: "+07:00",
    label: "Asia/Ho_Chi_Minh"
  },
  {
    id: 2,
    value: "+00:00",
    label: "Europe/London"
  }
];

const fakeGameTypes = [
  {
    id: 1,
    value: "all",
    label: "All"
  },
  {
    id: 2,
    value: "game_type1",
    label: "Game Type 1"
  },
  {
    id: 3,
    value: "game_type2",
    label: "Game Type 2"
  }
];

const fakeGameNames = [
  {
    id: 1,
    value: "all",
    label: "All"
  },
  {
    id: 2,
    value: "game_name2",
    label: "Game Name 2"
  },
  {
    id: 3,
    value: "game_name3",
    label: "Game Name 3"
  }
];

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
  onResetFilter, onSubmitProps
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      round_id: "",
      time_zone: "+0700",
      game_type: "",
      game_name: ""
    }
  });
  // const { dateRange: dateRangeCont } = useContext(DateRangeContext);

  const [dateRange, setDateRange] = useState({
    start: moment().format("DD/MM/YYYY"),
    end: moment().format("DD/MM/YYYY")
  });

  const onChangeDateRange = (startDate, endDate) => {
    setDateRange({
      start: startDate,
      end: endDate
    });
  };

  const onSubmit = async (data) => {
    console.log(data);
    const form = {
      ...data,
      from_date: moment(dateRange.start).format("DD/MM/YYYY"),
      to_date: moment(dateRange.end).format("DD/MM/YYYY"),
    };
    onSubmitProps(form);
  };

  const onReset = () => {
    reset();
    onResetFilter();
    setDateRange({
      from_date: moment().format("DD/MM/YYYY"),
      to_date: moment().format("DD/MM/YYYY")
    });
  };

  return (
    <Fragment>
      <ContentCardPage>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid className={classes.inputDataPicked} item xs={12} xl={3} md={4}>
              <DateRangePickerComponent
                startDate={dateRange.start}
                endDate={dateRange.end}
                handleCallback={onChangeDateRange}
                format="DD/MM/YYYY"
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
                options={fakeGameTypes}
                defaultValue=""
              />
            </Grid>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={4}>
              <SelectField
                control={control}
                namefileld="time_zone"
                id="time_zone"
                label="Time Zone"
                fullWidth={false}
                options={fakeTimezones}
                defaultValue="+0700"
              />
              <SelectField
                control={control}
                namefileld="game_name"
                id="game_name"
                label="Game Name"
                fullWidth={false}
                options={fakeGameNames}
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
