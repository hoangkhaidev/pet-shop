import Grid from "@material-ui/core/Grid";
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import { Button } from "@material-ui/core";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import InputField from "src/components/shared/InputField/InputField";
import { useForm } from "react-hook-form";

const RunDevelopmentTestFilter = ({ onSubmitProps }) => {

  const { control, handleSubmit } = useForm({
    defaultValues: {
      nick_name: "",
    }
  });

  const onSubmit = async (data) => {
    // console.log(data);
    const form = {
      ...data,
    };

    onSubmitProps(form);
  };

  return (
    <ContentCardPage>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TitlePage title="Run Development Test" />
        <Grid container spacing={2}>
          <Grid item xs={12} xl={3} md={6}>
              <InputField
                  control={control}
                  namefileld="nick_name"
                  type="text"
                  label="Nick Name"
                  id="nick_name"
                  fullWidth={false}
              />
          </Grid>
          <Grid item xs={12} xl={3} md={6} style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
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
