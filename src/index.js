import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import "./i18n";
import { NotificationProvider } from './context/NotificationContext';

const initialNotification = {
  deposit: 0,
  withdraw: 0,
  needUpdate: false
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'update_notification':
      return {
        ...state,
        has_new_request: action.has_new_request,
        deposit: action.deposit,
        withdraw: action.withdraw,
      };
    case 'reconnect_notification': {
      return {
        ...state,
        needUpdate: !state.needUpdate
      }
    }
    default:
      return state;
  }
};

ReactDOM.render((
  <NotificationProvider initialState={initialNotification} reducer={notificationReducer}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </NotificationProvider>
), document.getElementById('root'));

serviceWorker.unregister();
