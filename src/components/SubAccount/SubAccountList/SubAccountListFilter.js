import { useFormContext } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import { func } from "prop-types";

import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import InputField from "src/components/shared/InputField/InputField";
import ButtonGroup, { SubmitButton, ResetButton } from "src/components/shared/Button/Button";
import SelectField from "src/components/shared/InputField/SelectField";
import { SORT_ODER, USER_STATUS } from "src/constants";

const SubAccountListFilter = ({
  onResetFilter
}) => {
  const { control } = useFormContext();

  return (
    <ContentCardPage>
      <Grid container spacing={2}>
        <Grid item xs={12} xl={3} md={4}>
          <InputField
            control={control}
            nameField="name_search"
            type="text"
            label="Name or Username"
            id="name_search"
            fullWidth={false}
          />
        </Grid>
        <Grid item xs={12} xl={3} md={4}>
          <SelectField
            control={control}
            nameField="brand"
            id="brand"
            label="Brand"
            fullWidth={false}
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12} xl={3} md={4}>
          <SelectField
            control={control}
            nameField="status_search"
            label="Status"
            id="status_search"
            fullWidth={false}
            options={USER_STATUS}
            defaultValue="all"
          />
        </Grid>
        <Grid item xs={12} xl={3} md={4}>
          <SelectField
            control={control}
            nameField="sort_order"
            label="Sort Order"
            id="sort_order"
            fullWidth={false}
            options={SORT_ODER}
            defaultValue="asc"
          />
        </Grid>
      </Grid>
      <ButtonGroup>
        <SubmitButton />
        <ResetButton onAction={onResetFilter} />
      </ButtonGroup>
    </ContentCardPage>
  );
};

SubAccountListFilter.propTypes = {
  onResetFilter: func
};

SubAccountListFilter.defaultProps = {
  onResetFilter: () => {}
};

export default SubAccountListFilter;
