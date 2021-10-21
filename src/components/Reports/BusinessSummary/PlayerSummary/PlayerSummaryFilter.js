import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import ButtonGroup, { SubmitButton } from "src/components/shared/Button/Button";
import { func } from "prop-types";
import SelectField from "src/components/shared/InputField/SelectField";
import { SORT_ODER } from "src/constants";

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
      <ContentCardPage>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} xl={3} md={3}>
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
                  ]
                }
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
      </ContentCardPage>
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
