/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useFormContext } from "react-hook-form";
import { func } from "prop-types";
import MainCard from "ui-component/cards/MainCard";
import { Grid } from "@mui/material";
import InputField from "views/InputField/InputField";
import ButtonGroup, { SubmitButton } from "views/Button/Button";

const CommissionListFilter = ({onResetFilter, operatorData}) => {
  const { control } = useFormContext();

  return (
    <MainCard title="Commission">
      <Grid container spacing={2}>
        <Grid item xs={12} xl={3} md={8}>
          <InputField
            control={control}
            namefileld="name_search"
            type="text"
            label="Operator / Brand"
            id="name_search"
            fullWidth={false}
          />
        </Grid>
        <Grid item xs={12} xl={3} md={4} style={{ alignItems: 'center', display: 'flex', justifyContent: 'flex-end' }}>
          <ButtonGroup>
            <SubmitButton text="Search"/>
          </ButtonGroup>
        </Grid>
      </Grid>
    </MainCard>
  );
};

CommissionListFilter.propTypes = {
  onResetFilter: func,
};

CommissionListFilter.defaultProps = {
  onResetFilter: () => {}
};

export default CommissionListFilter;
