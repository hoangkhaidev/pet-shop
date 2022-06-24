/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import MainCard from "ui-component/cards/MainCard";
import InputField from "views/InputField/InputField";
import TitlePage from "views/TitlePage/TitlePage";

const RunDevelopmentTestFilter = ({onSubmitFilter}) => {

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (dataForm) => {
    onSubmitFilter(dataForm);
  }

  return (
    <MainCard>
      <form onSubmit={handleSubmit(onSubmit)} >
        <TitlePage title="Run Development Test" />
        <Grid container spacing={2}>
          <Grid item xs={12} xl={3} md={6}>
              <InputField
                  control={control}
                  required
                  namefileld="token"
                  errors={errors?.token}
                  type="text"
                  label="Token"
                  id="token"
                  fullWidth={false}
              />
              <div style={{ fontWeight: '600' }}>(Operator's player token, with balance = 100)</div>
          </Grid>
          <Grid item xs={12} xl={3} md={6} style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              type="submit"
              style={{ backgroundColor: '#1cb13c' }}
            >
              Run Test
            </Button>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
};

export default RunDevelopmentTestFilter;
