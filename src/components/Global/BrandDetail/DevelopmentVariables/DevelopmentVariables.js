import { FormProvider } from 'react-hook-form';
import TitlePage from 'src/components/shared/TitlePage/TitlePage';
import TableDevelopmentVariables from './TableDevelopmentVariables';

const DevelopmentVariables = () => {

  return (
    <>
      <FormProvider>
        <TitlePage title="Development Variables" />
      </FormProvider>
      <TableDevelopmentVariables />
    </>
  );
};

export default DevelopmentVariables;
