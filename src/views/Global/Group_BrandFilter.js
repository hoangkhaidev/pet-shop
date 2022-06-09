/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
import { useFormContext } from "react-hook-form";
import { func } from "prop-types";
import MainCard from "ui-component/cards/MainCard";
import { Grid } from "@mui/material";
import InputField from "views/InputField/InputField";
import ButtonGroup, { SubmitButton } from "views/Button/Button";

const Group_BrandFilter = ({onResetFilter, operatorData}) => {
  const { control } = useFormContext();

  return (
    <MainCard title="Group / Brand" sx={{mb: '15px'}}>
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
    </MainCard>
  );
};

Group_BrandFilter.propTypes = {
  onResetFilter: func,
};

Group_BrandFilter.defaultProps = {
  onResetFilter: () => {}
};

export default Group_BrandFilter;
