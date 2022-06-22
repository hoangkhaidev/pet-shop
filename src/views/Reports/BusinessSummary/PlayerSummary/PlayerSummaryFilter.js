/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
import { useForm } from "react-hook-form";
import { func } from "prop-types";
import MainCard from "ui-component/cards/MainCard";
import { Grid } from "@mui/material";
import SelectField from "views/InputField/SelectField";
import ButtonGroup, { SubmitButton } from "views/Button/Button";

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

const SORT_FIELD_PLAYER_SUMMARY = [
  {
    id: 1,
    value: "period",
    label: "Period"
  },
  {
    id: 2,
    value: "player_id",
    label: "Player ID"
  },
  {
    id: 3,
    value: "nick_name",
    label: "Nickname"
  },
  {
    id: 4,
    value: "sign_up_language",
    label: "Sign Up Language"
  },
  {
    id: 5,
    value: "brand_name",
    label: "Brand"
  },
  {
    id: 6,
    value: "bet_native",
    label: "Bets"
  },
  {
    id: 7,
    value: "win_native",
    label: "Wins"
  },
  {
    id: 7,
    value: "margin_native",
    label: "Margins"
  },
  {
    id: 7,
    value: "currency_code",
    label: "Currency"
  },
  {
    id: 8,
    value: "bet",
    label: "Bet ($)"
  },
  {
    id: 9,
    value: "win",
    label: "Win ($)"
  },
  {
    id: 10,
    value: "margin",
    label: "Margin ($)"
  },
];

const PlayerSummaryFilter = ({
  onSubmitProps
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      sort_field: "margin_native",
    }
  });

  const onSubmit = async (data) => {
    const form = {
      ...data,
      sort_field: data?.sort_field,
    };
    onSubmitProps(form);
  };

  return (
    <>
      <MainCard sx={{mb: '10px'}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} xl={3} md={3}>
              <SelectField
                control={control}
                namefileld="sort_field"
                id="sort_field"
                label="Sort field"
                fullWidth={false}
                options={SORT_FIELD_PLAYER_SUMMARY}
                defaultValue="margin_native"
              />
            </Grid>
            <Grid item xs={12} xl={3} md={3}>
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
            <SubmitButton text={'Search'} />
          </ButtonGroup>
        </form>
      </MainCard>
    </>
  );
};

PlayerSummaryFilter.propTypes = {
  onResetFilter: func,
  onSubmitProps: func
};

PlayerSummaryFilter.defaultProps = {
  onResetFilter: () => {},
  onSubmitProps: () => {}
};

export default PlayerSummaryFilter;
