import get from "lodash/get";
import has from "lodash/get";
import APIUtils from "./APIUtils";

const SOCKET_API_URL = process.env.REACT_APP_SOCKET_API_URL

class Socket {
  constructor(setNotification, setResultStatus, setVersion) {
    this.requestIdCounter = 0
    this.requestCallbackMap = {};
    this.pingInterval = null;
    this.authed = false
    this.ws = null
    this.setNotification = setNotification;
    this.setResultStatus = setResultStatus;
    this.setVersion = setVersion
  }

  connect() {
    this.ws = new WebSocket(SOCKET_API_URL);
    // ws.binaryType = 'arraybuffer';
    this.ws.onopen = () => {
      // send auth
      console.log('socket open')
      this.sendRequest('auth', {
          'token': APIUtils.getToken(),
        }, (response, error) => {
        if (!error) {
          this.authed = true
          this.setNotification({
            type: 'reconnect_notification'
          })
          
          clearInterval(this.pingInterval)
          this.pingInterval = setInterval(this.ping.bind(this), 9000);
        } else {
          // console.log('autherror', error);
          setTimeout(function () {
            window.location.reload(true)
          }, 5000);
        }
      });
    };

    this.ws.onmessage = (e) => {
      // a message was received
      // const rawData = new Uint8Array(e.data);
      // const responseObject = msgpack.decode(rawData);
      const responseObject = JSON.parse(e.data);
      const method = responseObject.method;
      const callId = responseObject.callId;
      if (has(responseObject, "data.backend_client_version")) {
        this.setVersion({
          type: "backend_client_version",
          version: get(responseObject, "data.backend_client_version", "")
        })
      }
      if (!method) {
        // request callback
        const requestCallback = this.requestCallbackMap[callId];
        if (requestCallback) {
          if (requestCallback.responseFunction) {
              requestCallback.responseFunction(responseObject.data, responseObject.error);
          }
          delete this.requestCallbackMap[callId];
        }
      } else {
          // receive
        const data = responseObject.data;
        console.log(data)
        if (method === 'logout') {
          APIUtils.logOut(data.reason)
          window.location.reload()
        }
        if (method === 'top_bar_menu_dw_notify') {
          this.setNotification({
            type: 'update_notification',
            ...data,
          })
        }
        if (method === "period_result_cancelled" || method === "period_result_updated") {
          this.setResultStatus({
            type: method,
            ...data,
          })
        }
      }
    };

    this.ws.onerror = (e) => {
      console.log('error socket', e);
    };

    this.ws.onclose = (e) => {
      console.log('close socket', e);
    };
  }

  getResultStatus() {
    return this.resultStatus;
  }

  ping() {
    const tm = setTimeout(() => {
       /// ---connection closed ///
       console.log('timeout....')
       this.ws.close()
       this.connect();
    }, 8000);
    this.sendRequest('p', {}, (response, error) => {
      if (!error) {
        clearTimeout(tm);
      }
    })
  }

  sendRequest(method, data, responseFunction) {
    if (this.ws && this.ws.readyState === this.ws.OPEN) {
        let shouldSendRequest = false;
        if (method === 'auth') {
            shouldSendRequest = true;
        }

        if (this.authed) {
            shouldSendRequest = true
        }

        if (!shouldSendRequest) {
            return;
        }

        const fullData = {
            method: method,
            callId: 'callId_' + this.requestIdCounter,
            data: data,
        };
        // const rawData = msgpack.encode(fullData);
        const rawData = JSON.stringify(fullData);
        const strData = rawData;
        this.ws.send(strData);

        const d = new Date();
        const n = d.getTime();
        const callback = {
            method: method,
            startTime: n,
            responseFunction: responseFunction,
        }

        this.requestCallbackMap['callId_' + this.requestIdCounter] = callback;
        this.requestIdCounter++;
    }
  }
}
export default Socket;
