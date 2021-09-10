import Grid from "@material-ui/core/Grid";
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import { Button } from "@material-ui/core";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import InputField from "src/components/shared/InputField/InputField";
import { useForm } from "react-hook-form";

const RunDevelopmentTestFilter = ({onSubmitFilter}) => {

  // const { control } = useFormContext();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (dataForm) => {
    onSubmitFilter(dataForm);
  }

  return (
    <ContentCardPage>
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
              <div style={{ fontWeight: '600' }}>(Operator's player token, with balance 100 USD)</div>
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
    </ContentCardPage>
  );
};

export default RunDevelopmentTestFilter;
