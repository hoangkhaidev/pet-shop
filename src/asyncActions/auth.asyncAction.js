import { createAsyncThunk } from '@reduxjs/toolkit';
import  sessionApi from './../../services/apis/session.api';
//*thunk action

const signIn = createAsyncThunk(
  'session/signIn',
  // eslint-disable-next-line no-unused-vars
  async (data, props) => {
    try {
      const response = await sessionApi.signIn(data);
      const token = response;
      return token;
    } catch (err) {

      const newError = { ...err };
      const payload = { error: newError.response.data };
      return props.rejectWithValue(payload);
    }
  }
);

export { signIn };
