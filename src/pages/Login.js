/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import {
  Box,
  Container,
  Card,
  Typography,
  makeStyles
} from '@material-ui/core';
import get from "lodash/get";
import { useDispatch } from "react-redux";

import InputField from 'src/components/shared/InputField/InputField';
import FormattedNumberInput from 'src/components/shared/InputField/InputFieldNumber';
import { SubmitButton } from 'src/components/shared/Button/Button';
import Captcha from 'src/components/Captcha/Captcha';
import api from "src/utils/api";
import { getToken, checkIsAuthen } from "src/features/authentication/authentication";

const useStyles = makeStyles(() => ({
  captchaInput: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  }
}));

const Login = () => {
  const [captchaId, setCaptchaId] = useState("");
  const navigate = useNavigate();
  const classes = useStyles();
  const { control, handleSubmit, setError, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  // if (isLoggedIn) {
  //   navigate("/home/dashboard");
  // }

  const onSubmit = async (data) => {
    if (data.captcha === "") {
      return setError("captcha", {
        type: "manual",
        message: "Please input captcha"
      });
    }
    const form = {
      username: data.username,
      password: data.password,
      captcha: {
        captcha_id: captchaId,
        verify_value: data.captcha
      }
    };
    const response = await api.post("/login", form, false);
    if (get(response, "success", false)) {
      const token = get(response, "data.token", "");
      dispatch(getToken(token));
      dispatch(checkIsAuthen(true));
      navigate("/home/dashboard");
    } else {
      const errorsResponse = get(response, "data", {});
      for (const err in errorsResponse) {
        setError(err, {
          type: "manual",
          message: errorsResponse[err]
        });
      }
    }
  };

  console.log("errors", errors);

  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
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
          {/* <Formik
            initialValues={{
              email: 'demo@devias.io',
              password: 'Password123'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={() => {
              navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik> */}
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  pb: 1,
                  pt: 3,
                  px: 4
                }}
              >
                <Typography
                  color="textPrimary"
                  variant="h4"
                >
                  Sign in
                </Typography>
                <InputField
                  nameField="username"
                  label="Username"
                  id="email-field"
                  required
                  errors={errors.username}
                  control={control}
                />
                <InputField
                  nameField="password"
                  label="Password"
                  id="password-field"
                  type="password"
                  required
                  errors={errors.password}
                  control={control}
                />
                <div className={classes.captchaInput}>
                  <Captcha
                    setCaptchaId={setCaptchaId}
                  />
                  <FormattedNumberInput
                    nameField="captcha"
                    label="Captcha"
                    id="password-field"
                    control={control}
                    allowLeadingZeros
                    allowNegative={false}
                    decimalScale={0}
                    maxLength={5}
                    errors={errors.captcha}
                    required
                  />
                </div>
                <SubmitButton />
              </Box>
            </form>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
