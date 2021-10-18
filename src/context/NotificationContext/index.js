import React, {createContext, useContext, useReducer} from 'react';

const NotificationContext = createContext();
export const NotificationProvider = ({reducer, initialState, children}) =>(
  <NotificationContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </NotificationContext.Provider>
);
export const useNotification = () => useContext(NotificationContext);
