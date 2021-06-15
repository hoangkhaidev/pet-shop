import { Fragment, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core";
import moment from 'moment';
import { func } from "prop-types";

import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import DateRangePickerComponent from "src/components/shared/DateRangePickerComponent/DateRangePickerComponent";
import InputField from "src/components/shared/InputField/InputField";
import SelectField from "src/components/shared/InputField/SelectField";
import ButtonGroup, { SubmitButton, ResetButton } from "src/components/shared/Button/Button";

import { DateRangeContext } from "../SearchGameHistory";

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
  }
}));

const GameTransactionFilter = ({
  onResetFilter
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      round_id: "",
      time_zone: "+07:00",
      game_type: "all",
      game_name: "all"
    }
  });
  const [dateRange, setDateRange] = useState({
    start: moment().startOf("day").format("DD/MM/YYYY HH:mm:ss"),
    end: moment().endOf("day")
  });
  const { setDateRange: setDateRangeCont } = useContext(DateRangeContext);

  const onChangeDateRange = (start, end) => {
    const startTimeFormat = moment(start).format("DD/MM/YYYY HH:mm:ss");
    const endTimeFormat = moment(end).format("DD/MM/YYYY HH:mm:ss");
    setDateRange({
      start: startTimeFormat,
      end: endTimeFormat
    });
    setDateRangeCont({
      start: moment(start).format("DD/MM/YYYY"),
      end: moment(end).format("DD/MM/YYYY")
    });
  };

  const onSubmit = async (data) => {
    const form = {
      ...data,
      end: dateRange.end,
      start: dateRange.start
    };
  };

  const onReset = () => {
    reset();
    onResetFilter();
  };

  return (
    <Fragment>
      <ContentCardPage>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={4}>
              <FormControl className={classes.formControlDateTimePicker}>
                <FormLabel>
                  {t("Form - To")}
                </FormLabel>
                <DateRangePickerComponent
                  control={control}
                  timePicker
                  startDate={dateRange.start}
                  endDate={dateRange.end}
                  handleCallback={onChangeDateRange}
                />
              </FormControl>
            </Grid>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={4}>
              <InputField
                control={control}
                nameField="rount_id"
                type="text"
                label="Round ID"
                id="rount_id"
                fullWidth={false}
              />
            </Grid>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={4}>
              <SelectField
                control={control}
                nameField="time_zone"
                id="time_zone"
                label="Time Zone"
                fullWidth={false}
                options={fakeTimezones}
                defaultValue="+07:00"
              />
            </Grid>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={4}>
              <SelectField
                control={control}
                nameField="game_type"
                id="game_type"
                label="Game Type"
                fullWidth={false}
                options={fakeGameTypes}
                defaultValue="all"
              />
            </Grid>
            <Grid item xs={12} xl={3} md={4}>
              <SelectField
                control={control}
                nameField="game_name"
                id="game_name"
                label="Game Name"
                fullWidth={false}
                options={fakeGameNames}
                defaultValue="all"
              />
            </Grid>
          </Grid>
          <ButtonGroup>
            <SubmitButton />
            <ResetButton onAction={onReset} />
          </ButtonGroup>
        </form>
      </ContentCardPage>
    </Fragment>
  );
};

GameTransactionFilter.propTypes = {
  onResetFilter: func,
};

GameTransactionFilter.defaultProps = {
  onResetFilter: () => {}
};

export default GameTransactionFilter;
