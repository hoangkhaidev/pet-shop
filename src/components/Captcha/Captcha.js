/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback, useState } from 'react';
import get from 'lodash/get';
import api from 'src/utils/api';
import { func } from 'prop-types';

const captchaConfig = {
  height: 25,
  width: 80,
  color: { R: 0, G: 0, B: 0, A: 255 },
  bg_color: { R: 244, G: 244, B: 244, A: 255 }
};

const Captcha = ({
  setCaptchaId
}) => {
  const [captcha, setCaptcha] = useState({});

  const generateCaptcha = useCallback(async () => {
    try {
      const response = await api.post('/captcha/generate', captchaConfig, false);
      setCaptcha(get(response, "data", {}));
      setCaptchaId(get(response, "data.captcha_id", ""));
    } catch (e) {
      console.log('e', e);
    }
  }, []);

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  return (
    <div
      style={{
        height: 25,
        width: 60,
        justifyContent: 'center'
      }}
    >
      {captcha.image && (
        <img alt="" height={25} width={60} src={captcha.image} />
      )}
    </div>
  );
};

Captcha.propTypes = {
  setCaptchaId: func,
};

Captcha.defaultProps = {
  setCaptchaId: () => {}
};

export default Captcha;
