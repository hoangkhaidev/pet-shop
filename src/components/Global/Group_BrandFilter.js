import { useFormContext } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import { func } from "prop-types";
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import InputField from "src/components/shared/InputField/InputField";
import { ButtonGroup } from "@material-ui/core";
import { SubmitButton } from "src/components/shared/Button/Button";
import TitlePage from "../shared/TitlePage/TitlePage";

const Group_BrandFilter = ({onResetFilter, operatorData}) => {
  const { control } = useFormContext();

  return (
    <ContentCardPage>
      <TitlePage title="Group / Brand" />
      <Grid container spacing={2}>
        <Grid item xs={12} xl={3} md={8}>
          <InputField
            control={control}
            namefileld="key_search"
            type="text"
            label="Operator / Brand"
            id="key_search"
            fullWidth={false}
            defaultValue=''
          />
        </Grid>
        <Grid item xs={12} xl={3} md={4} style={{ alignItems: 'center', display: 'flex', justifyContent: 'flex-end' }}>
          <ButtonGroup>
            <SubmitButton text="Search"/>
          </ButtonGroup>
        </Grid>
      </Grid>
    </ContentCardPage>
  );
};

Group_BrandFilter.propTypes = {
  onResetFilter: func,
};

Group_BrandFilter.defaultProps = {
  onResetFilter: () => {}
};

export default Group_BrandFilter;
