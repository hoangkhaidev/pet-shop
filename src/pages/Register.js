import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
} from '@material-ui/core';

const Register = () => {

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
        </Container>
      </Box>
    </>
  );
};

export default Register;
