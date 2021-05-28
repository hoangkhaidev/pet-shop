import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import moment from 'moment';
import { FormControl, FormLabel, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import InputField from "src/components/shared/InputField/InputField";
import SelectField from "src/components/shared/InputField/SelectField";
import DateRangePickerComponent from "src/components/shared/DateRangePickerComponent/DateRangePickerComponent";
import ButtonGroup, { SubmitButton, ResetButton } from "src/components/shared/Button/Button";
import { func } from "prop-types";

const useStyles = makeStyles(() => ({
  inputSameLineWithDaterange: {
    marginTop: "16px !important",
    paddingTop: "0px !important"
  },
  dateRangeInput: {
    paddingTop: "0px !important"
  }
}));

const fakeBrand = [
  {
    id: 1,
    label: "Brand 1",
    value: "brand_1"
  },
  {
    id: 2,
    label: "Brand 2",
    value: "brand_2"
  }
];

const fakeCurrencies = [
  {
    id: 1,
    label: "Vietnam Dong",
    value: "vnd"
  },
  {
    id: 2,
    label: "USD",
    value: "usd"
  }
];

const fakeLanguages = [
  {
    id: 1,
    label: "Vietnamese",
    value: "vietnamese"
  },
  {
    id: 2,
    label: "English",
    value: "english"
  }
];

const PLayerListFilter = ({
  onResetFilter, onSubmitProps
}) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm();
  const [dateRange, setDateRange] = useState({
    start: moment().format("DD/MM/YYYY"),
    end: moment().format("DD/MM/YYYY")
  });
  const classes = useStyles();

  const onChangeDateRange = (startDate, endDate) => {
    setDateRange({
      start: startDate,
      end: endDate
    });
  };

  const onSubmit = async (data) => {
    const form = {
      ...data,
      end: dateRange.end,
      start: dateRange.start
    };
    onSubmitProps(form);
  };

  return (
    <Fragment>
      <ContentCardPage>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} xl={3} md={4}>
              <InputField
                control={control}
                nameField="player_id"
                type="text"
                label="Player ID"
                id="player_id"
                fullWidth={false}
              />
            </Grid>
            <Grid item xs={12} xl={3} md={4}>
              <InputField
                control={control}
                nameField="nickname"
                type="text"
                label="Nickname"
                id="nickname"
                fullWidth={false}
              />
            </Grid>
            <Grid item xs={12} xl={3} md={4}>
              <SelectField
                control={control}
                nameField="casino_brand"
                id="casino_brand"
                label="Casino / Brand"
                fullWidth={false}
                options={fakeBrand}
                defaultValue=""
              />
            </Grid>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={4}>
              <InputField
                control={control}
                nameField="ip_address"
                type="text"
                label="IP Address"
                id="ip_address"
                fullWidth={false}
              />
            </Grid>
            <Grid className={classes.dateRangeInput} item xs={12} xl={3} md={4}>
              <FormControl>
                <FormLabel>
                  {t("Last Login")}
                </FormLabel>
                <DateRangePickerComponent
                  control={control}
                  onChangeDateRange={onChangeDateRange}
                  dateRangeProps={dateRange}
                />
              </FormControl>
            </Grid>
            <Grid className={classes.inputSameLineWithDaterange} item xs={12} xl={3} md={4}>
              <SelectField
                control={control}
                nameField="currency"
                id="currency"
                label="Currency"
                fullWidth={false}
                options={fakeCurrencies}
                defaultValue=""
              />
            </Grid>
            <Grid item xs={12} xl={3} md={4}>
              <SelectField
                control={control}
                nameField="language"
                id="language"
                label="Language"
                fullWidth={false}
                options={fakeLanguages}
                defaultValue=""
              />
            </Grid>
          </Grid>
          <ButtonGroup>
            <SubmitButton />
            <ResetButton onAction={onResetFilter} />
          </ButtonGroup>
        </form>
      </ContentCardPage>
    </Fragment>
  );
};

PLayerListFilter.propTypes = {
  onResetFilter: func,
  onSubmitProps: func
};

PLayerListFilter.defaultProps = {
  onResetFilter: () => {},
  onSubmitProps: () => {}
};

export default PLayerListFilter;
