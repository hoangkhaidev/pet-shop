import { Fragment, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
// import { useTranslation } from "react-i18next";
// import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core";
import moment from 'moment';
import { func } from "prop-types";

import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import DateRangePickerComponent from "src/components/shared/DateRangePickerComponent/DateRangePickerComponent";
import InputField from "src/components/shared/InputField/InputField";
import ButtonGroup, { SubmitButton, ResetButton } from "src/components/shared/Button/Button";

// import { DateRangeContext } from "../SearchGameHistory";
// import useRouter from "src/utils/hooks/useRouter";

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

const OperatorLogsFilter = ({
  onResetFilter, onSubmitProps, setObjFilter
}) => {
  const classes = useStyles();
  // const router = useRouter();

  const dateRangeRef = useRef(null);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      username: "",
      description: "",
      activity: "",
      target: "",
    }
  });

  const [dateRange, setDateRange] = useState({
    start: moment().format("DD/MM/YYYY"),
    end: moment().format("DD/MM/YYYY"),
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
      start: moment().format("DD/MM/YYYY"),
      end: moment().format("DD/MM/YYYY")
    });
    setObjFilter({
      username: "",
      description: "",
      activity: "",
      target: "",
      from_date: moment().format("DD/MM/YYYY"),
      to_date: moment().format("DD/MM/YYYY"),
      sort_field: "created_at",
      sort_order: "DESC",
      page: 1,
      page_size: 30,
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
            <Grid className={classes.inputDataPicked} item xs={12} xl={3} md={4}>
                <DateRangePickerComponent
                  className={classes.inputDataPicked}
                  control={control}
                  timePicker
                  startDate={dateRange.start}
                  endDate={dateRange.end}
                  handleCallback={onChangeDateRange}
                  dateRangeRef={dateRangeRef}
                  format="DD/MM/YYYY"
                />
                {/* <FormLabel style={{marginLeft: '10px', marginTop: '5px'}}>
                  {t("From - To")}
                </FormLabel> */}
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

OperatorLogsFilter.propTypes = {
  onResetFilter: func,
};

OperatorLogsFilter.defaultProps = {
  onResetFilter: () => {}
};

export default OperatorLogsFilter;
