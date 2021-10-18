/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback } from 'react';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import APIUtils from './api/APIUtils'
import 'react-toastify/dist/ReactToastify.css';
import Socket from './api/Socket'
import { useTranslation } from 'react-i18next';
// import { onReloadPage, updateResultStatus } from './actions';
import { useNotification } from './context/NotificationContext';
import { onReloadPage, updateResultStatus } from './features/status/status';

const SocketComponent = () => {
  const [socket, setSocket] = useState(null)
  const [, dispatchNotification] = useNotification();
  const { t } = useTranslation(["translation", "err"]);
  const dispatch = useDispatch();

  const setNotification = (data) => {
    dispatchNotification(data)
  }

  const setResultStatus = (data) => {
    if (data.success) {
      dispatch(updateResultStatus(data.type))
    }
  }

  const handleBackendClientVersion = useCallback((data) => {
    if (process.env.REACT_APP_BACKEND_CLIENT_VERSION !== data.version) {
      dispatch(onReloadPage(true));
    }
  }, [dispatch])

  const handleMessage = (method, data)=> {
    console.log(data);
    console.log(method);
      if (method === 'logout') {
        APIUtils.logOut(data.reason)
        window.location.reload()
      }
      if (method === 'top_bar_menu_dw_notify') {
        setNotification({
          type: 'update_notification',
          ...data,
        })
      } else if (method === 'toast_message') {
        let message = '';
        if (data && data.type === 'build_app') {
          if (data.success) {
            message = `${data.app_name} ${t('Build')} ${t('Success')}`
          } else {
            message = `${data.app_name} ${t('Build')} ${t('Unsuccess')}`
          }
        } else {
          if (data && data.message && data.message !== '') {
            message = t(data.message);
          }
        }

        if (message && message !== '') {
            if (data.success) {
              toast.success(message);
            } else {
              toast.error(message);
            }
        }
      }
      if (method === "period_result_cancelled" || method === "period_result_updated") {
        setResultStatus({
          type: method,
          ...data,
        })
      }
  }

  useEffect(() => {
    if (APIUtils.isAuthed())  {
      setSocket(new Socket(handleMessage, setNotification, setResultStatus, handleBackendClientVersion))
    }
  }, [handleBackendClientVersion]);

  useEffect(() => {
    if (socket) {
      socket.connect()
    }
  }, [socket]);

  return (
    <></>
  );
}

export default SocketComponent;
