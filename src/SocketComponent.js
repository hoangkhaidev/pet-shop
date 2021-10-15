/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback } from 'react';
import { useDispatch } from "react-redux";
import Socket from './api/Socket';
import APIUtils from './api/APIUtils';
import { onReloadPage, updateResultStatus } from './actions';

const SocketComponent = () => {
  const [socket, setSocket] = useState(null)
  const dispatch = useDispatch();

  const onGetResultStatus = (data) => {
    if (data.success) {
      dispatch(updateResultStatus(data.type))
    }
  }

  const onGetBackendClientVersion = useCallback((data) => {
    if (process.env.REACT_APP_BACKEND_CLIENT_VERSION !== data.version) {
      dispatch(onReloadPage(true));
    }
  }, [dispatch])

  useEffect(() => {
    if (APIUtils.isAuthed())  {
      setSocket(new Socket(onGetResultStatus, onGetBackendClientVersion))
    }
  }, [onGetBackendClientVersion])

  useEffect(() => {
    if (socket) {
      socket.connect()
    }
  }, [socket])

  return (
    <></>
  );
}

export default SocketComponent;
