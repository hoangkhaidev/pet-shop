/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Stack
} from '@mui/material';
import { useForm } from 'react-hook-form';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import get from "lodash/get";

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Captcha from 'views/Captcha/Captcha';
import { useDispatch, useSelector } from 'react-redux';
import APIUtils from 'api/APIUtils';
import { useTranslation } from "react-i18next";
import { checkIsAuthen, getToken } from 'features/authentication/authentication';
import { useNavigate } from 'react-router';
import { toast } from "react-toastify";
import api from 'utils/api';
import { makeStyles } from '@mui/styles';
import InputField from 'views/InputField/InputField';
import InputNumber from 'views/InputField/InputNumber';

// ============================|| FIREBASE - LOGIN ||============================ //

const useStyles = makeStyles(() => ({
    labelStyle: {
      color: 'red',
    },
  }));

const FirebaseLogin = ({ ...others }) => {
    const navigate = useNavigate();
    const [captchaId, setCaptchaId] = useState('');
    const [captchaLoad, setCaptchaLoad] = useState(null);
    const { t } = useTranslation(['translation','err',]);
    const dispatch = useDispatch();
    const token = useSelector(state => state.authentication.token);
    const { control, handleSubmit, setError, formState: { errors } } = useForm();
    const [logOutReason, setLogOutReason] = useState(APIUtils.getLogOutReason());

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // useEffect(() => {
    //   if (!!token) {
    //     // Reload when login
    //     window.location.reload();
    //   }
    // }, [token])
  
    useEffect(() => {
      if (logOutReason) {
        setError('username', {
          type: 'error', 
          message: t(logOutReason)
        })
      }
    }, [logOutReason]);
      
    useEffect(() => {
      document.title = 'Login';
    }, []);

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
            verify_value: `${data.captcha}`
          }
        };
    
        APIUtils.deleteLogOutReason();
        setLogOutReason('');
    
        const response = await api.post("/login", form, false);
        if (get(response, "success", false)) {
          const token = get(response, "data.token", "");
          dispatch(checkIsAuthen(true));
          dispatch(getToken(token));
          // navigate("/home/dashboard");
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
          setCaptchaLoad(Math.random());
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                  namefileld="username"
                  label="Username"
                  id="outlined-adornment-email-login"
                  type="text"
                  required
                  errors={errors.username}
                  control={control}
                />
                <InputField
                  namefileld="password"
                  label="Password"
                  id="outlined-adornment-password-login"
                  type={showPassword ? 'text' : 'password'}
                  required
                  errors={errors.password}
                  control={control}
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                  }
                />
                <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={2} >
                    <InputNumber 
                      namefileld="captcha"
                      label="Captcha"
                      id="captcha"
                      required
                      errors={errors.captcha}
                      control={control}
                    />
                    <Captcha
                        setCaptchaId={setCaptchaId}
                        captchaLoad={captchaLoad}
                    />
                </Stack>
                <Box sx={{ mt: 2 }}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Sign in
                        </Button>
                    </AnimateButton>
                </Box>
            </form>
        </>
    );
};

export default FirebaseLogin;
