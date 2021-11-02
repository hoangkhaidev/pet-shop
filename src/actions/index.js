import { BACKEND_CLIENT_VERSION, DELETE_TOKEN, IS_NEW_BACKEND_CLIENT_VERSION, SET_TOKEN, UPDATE_RESULT_STATUS } from "src/constants";

export const setToken = token => ({
  type: SET_TOKEN,
  payload: token,
})
export const deleteToken = token => ({
  type: DELETE_TOKEN,
  payload: token,
})

export const updateResultStatus = status => ({
  type: UPDATE_RESULT_STATUS,
  payload: status
});

export const getBackenClientVersion = payload => ({
  type: BACKEND_CLIENT_VERSION,
  payload
});

export const onReloadPage = (boolean) => ({
  type: IS_NEW_BACKEND_CLIENT_VERSION,
  payload: boolean
});
