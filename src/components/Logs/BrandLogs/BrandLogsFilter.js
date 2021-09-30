import { useState } from "react";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import moment from 'moment';
import { func } from "prop-types";
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import InputField from "src/components/shared/InputField/InputField";
import ButtonGroup, { SubmitButton, ResetButton } from "src/components/shared/Button/Button";
import DateRangePickerLogs from "src/components/shared/DateRangePickerComponent/DateRangePickerLogs";

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

const BrandLogsFilter = ({
  onResetFilter, onSubmitProps, setObjFilter
}) => {
  const classes = useStyles();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      username: "",
      description: "",
      activity: "",
      target: "",
    }
  });

  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
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
      from_date: dateRange.start,
      to_date: dateRange.end,
    };
    onSubmitProps(form);
  };

  const onReset = () => {
    reset({
      username: "",
      description: "",
      activity: "",
      target: "",
    });
    setDateRange({
      start: "",
      end: ""
    });
    setObjFilter({
      username: "",
      description: "",
      activity: "",
      target: "",
      from_date: "",
      to_date: "",
      sort_field: "created_at",
      sort_order: "DESC",
      page: 1,
      page_size: 30,
    });
  };

  return (
    <>
      <ContentCardPage>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid className={classes.inputDataPicked} item xs={12} xl={3} md={4}>
                <DateRangePickerLogs
                  className={classes.inputDataPicked}
                  control={control}
                  handleCallback={onChangeDateRange}
                  format="DD/MM/YYYY"
                />
            </Grid>
            <Grid item xs={12} xl={3} md={4}>
              <InputField
                control={control}
                namefileld="username"
                type="text"
                label="Username"
                id="username"
                fullWidth={false}
              />
              <InputField
                control={control}
                namefileld="activity"
                type="text"
                label="Activity"
                id="activity"
                fullWidth={false}
              />
            </Grid>
            <Grid item xs={12} xl={3} md={4}>
              <InputField
                control={control}
                namefileld="target"
                type="text"
                label="Target"
                id="target"
                fullWidth={false}
              />
              <InputField
                control={control}
                namefileld="description"
                type="text"
                label="Description"
                id="description"
                fullWidth={false}
              />
            </Grid>
          </Grid>
          <ButtonGroup>
            <SubmitButton text='Search' />
            <ResetButton onAction={onReset} />
          </ButtonGroup>
        </form>
      </ContentCardPage>
    </>
  );
};

BrandLogsFilter.propTypes = {
  onResetFilter: func,
};

BrandLogsFilter.defaultProps = {
  onResetFilter: () => {}
};

export default BrandLogsFilter;
