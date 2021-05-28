import { Fragment, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
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

const GameFilter = ({
  onResetFilter
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      rount_id: "",
      time_zone: "+07:00",
      game_type: "all",
      game_name: "all"
    }
  });
  const { dateRange: dateRangeCont } = useContext(DateRangeContext);

  const [dateRange, setDateRange] = useState({
    start: dateRangeCont.start,
    end: dateRangeCont.end
  });

  const onChangeDateRange = (start, end) => {
    const startTimeFormat = moment(start).format("DD/MM/YYYY");
    const endTimeFormat = moment(end).format("DD/MM/YYYY");
    setDateRange({
      start: startTimeFormat,
      end: endTimeFormat
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
    setDateRange({
      start: moment().format("DD/MM/YYYY"),
      end: moment().format("DD/MM/YYYY")
    });
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
                  startDate={dateRange.start}
                  endDate={dateRange.end}
                  handleCallback={onChangeDateRange}
                  format="DD/MM/YYYY"
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

GameFilter.propTypes = {
  onResetFilter: func
};

GameFilter.defaultProps = {
  onResetFilter: () => {}
};

export default GameFilter;
