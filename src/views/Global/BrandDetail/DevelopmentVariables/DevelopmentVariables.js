/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import { FormProvider } from 'react-hook-form';
import TitlePage from 'views/TitlePage/TitlePage';
import TableDevelopmentVariables from './TableDevelopmentVariables';

const DevelopmentVariables = ({ setValueTab }) => {

  return (
    <>
      <FormProvider>
        <TitlePage title="Development Variables" />
      </FormProvider>
      <TableDevelopmentVariables setValueTab={setValueTab} />
    </>
  );
};

export default DevelopmentVariables;
