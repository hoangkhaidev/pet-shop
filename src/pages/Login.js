/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import {
  Box,
  Container,
  Card,
  Typography,
  makeStyles,
} from '@material-ui/core';
import get from "lodash/get";
import { useDispatch } from "react-redux";
import InputField from 'src/components/shared/InputField/InputField';
import  { FormattedNumberInputCaptcha } from 'src/components/shared/InputField/InputFieldNumber';
import { SubmitButton } from 'src/components/shared/Button/Button';
import Captcha from 'src/components/Captcha/Captcha';
import api from "src/utils/api";
import { getToken, checkIsAuthen } from "src/features/authentication/authentication";
import { toast } from "react-toastify";
import APIUtils from "src/api/APIUtils";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  captchaInput: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  checkHelperText: {
    color: 'red !important',
    fontSize: '14px !important',
  }
}));

const Login = () => {
  const [captchaId, setCaptchaId] = useState("");
  const { t } = useTranslation(['translation','err',]);
  const navigate = useNavigate();
  const classes = useStyles();
  const { control, handleSubmit, setError, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const token = useSelector(state => state.authentication.token);

  const [logOutReason, setLogOutReason] = useState(APIUtils.getLogOutReason());
  
  useEffect(() => {
    if (!!token) {
      // Reload when login
      window.location.reload();
    }
  }, [token])

  useEffect(() => {
    if (logOutReason) {
      setError('username', {
        type: 'error', 
        message: t(logOutReason)
      })
    }
  }, [logOutReason]);

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

    APIUtils.deleteLogOutReason();
    setLogOutReason('');

    const response = await api.post("/login", form, false);
    if (get(response, "success", false)) {
      const token = get(response, "data.token", "");
      dispatch(checkIsAuthen(true));
      dispatch(getToken(token));
      navigate("/home/dashboard");
    } else {
      if (response?.err === 'err:ip_not_allowed') {
        toast.warn(t('ip_not_allowed'));
      }
      const errorsResponse = get(response, "data", {});
      for (const err in errorsResponse) {
        setError(err, {
          type: "manual",
          message: t(errorsResponse[err])
        });
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
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
                  namefileld="username"
                  label="Username"
                  id="username"
                  required
                  errors={errors.username}
                  control={control}
                />
                <InputField
                  namefileld="password"
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
                  <FormattedNumberInputCaptcha
                    namefileld="captcha"
                    label="Captcha"
                    id="captcha-field"
                    control={control}
                    allowLeadingZeros
                    allowNegative={false}
                    decimalScale={0}
                    maxLength={5}
                    errors={errors.captcha}
                    required
                  />
                </div>
                <SubmitButton text={'LOGIN'}/>
              </Box>
            </form>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
