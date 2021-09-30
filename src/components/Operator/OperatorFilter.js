import { useFormContext } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import { func } from "prop-types";
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import InputField from "src/components/shared/InputField/InputField";
import SelectField from "src/components/shared/InputField/SelectField";
import ButtonGroup, { SubmitButton, ResetButton } from "src/components/shared/Button/Button";

import { OPERATOR_STATUS, SORT_ODER } from "src/constants";

const OperatorListFilter = ({onResetFilter}) => {
  const { control } = useFormContext();

  return (
    <ContentCardPage>
      <Grid container spacing={2}>
        <Grid item xs={12} xl={3} md={4}>
          <InputField
            control={control}
            namefileld="name_search"
            type="text"
            label="Name or Username"
            id="name_search"
            fullWidth={false}
          />
        </Grid>
        <Grid item xs={12} xl={3} md={4}>
          <SelectField
            control={control}
            namefileld="status_search"
            id="status_search"
            label="Status"
            fullWidth={false}
            options={OPERATOR_STATUS}
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
                  value: "username",
                  label: "Username"
                },
                {
                  id: 2,
                  value: "name",
                  label: "Name"
                }
              ]
            }
            defaultValue="username"
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
            defaultValue="asc"
          />
        </Grid>
      </Grid>
      <ButtonGroup>
        <SubmitButton text="Search"/>
        <ResetButton onAction={onResetFilter} />
      </ButtonGroup>
    </ContentCardPage>
  );
};

OperatorListFilter.propTypes = {
  onResetFilter: func
};

OperatorListFilter.defaultProps = {
  onResetFilter: () => {}
};

export default OperatorListFilter;
