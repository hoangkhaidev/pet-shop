/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback} from 'react';
import ModalComponent from 'views/ModalComponent/ModalComponent';
import TitlePage from 'views/TitlePage/TitlePage';
// import InputField from 'views/InputField/InputField';
import { SubmitButton } from 'views/Button/Button';
import { Box } from '@mui/material';

const Login = ({ title }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
    
  };

  return (
    <div style={{ margin: 0 }}>
      <Box 
        onClick={onOpenModal} 
        sx={{
            fontSize: '13px', 
            fontWeight: '600', 
            cursor: 'pointer',
            '&:hover': {
                color: '#f68930'
            }
        }}
      >{title}</Box>
      <ModalComponent open={open} onClose={onClose}>
        <div>
          <TitlePage title="Đăng Nhập" sx={{ textAlign: 'center' }}/>
          <form>
            <div className="sr_item">
                <div className="label_text"> Tài khoản:</div>
                <div className="input_item" style={{width: 'calc(100% - 70px)'}}>
                    <span className="wpcf7-form-control-wrap d_name">
                        <input type="text" name="d_name" value="" size="40" className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" />
                    </span>
                </div>
            </div>
            <div className="sr_item">
                <div className="label_text"> Mật khẩu:</div>
                <div className="input_item" style={{width: 'calc(100% - 70px)'}}>
                    <span className="wpcf7-form-control-wrap d_address">
                        <input type="text" name="d_address" value="" size="40" className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" />
                    </span>
                </div>
            </div>
            <div style={{textAlign: 'center'}}>
              <SubmitButton text={'Đăng nhập'} />
            </div>
          </form>
        </div>
      </ModalComponent>
    </div>
  );
};

export default Login;
