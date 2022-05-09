import axios from 'axios';
import { toast } from 'react-toastify';
import { server, headers, fetchToken } from '../../helpers/constants';
import {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  ADMIN_LOGOUT,
  ADMIN_UPDATE_REQUEST,
  ADMIN_UPDATE_SUCCESS,
  ADMIN_UPDATE_FAIL,
} from './states';

export const register = registerDataSubmit => async dispatch => {
  console.log({ registerDataSubmit });
  try {
    dispatch({ type: ADMIN_REGISTER_REQUEST });
    await axios.post(`${server}/signup`, registerDataSubmit, headers);
    dispatch({ type: ADMIN_REGISTER_SUCCESS });
    toast.info('Registered Successfully');
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN_REGISTER_FAIL,
    });
    toast.error(error?.response?.data?.message);
    return { success: false, error: true };
  }
};

export const login = loginDataSubmit => async dispatch => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST });
    const { data } = await axios.post(
      `${server}/login`,
      loginDataSubmit,
      headers
    );

    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: { authUser: data } });
    toast.success('Logged In Successfully', { autoClose: 3000 });
    localStorage.setItem('authUser', JSON.stringify(data));
    return { success: true, error: false };
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
    });
    toast.error(error?.response?.data?.message);
    return { success: false, error: true };
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('authUser');
  dispatch({ type: ADMIN_LOGOUT });
};

export const editProfile = dataSubmit => async dispatch => {
  let config = fetchToken(headers);
  try {
    dispatch({ type: ADMIN_UPDATE_REQUEST });
    const { data } = await axios.put(
      `${server}/updateprofile`,
      dataSubmit,
      config
    );
    const { updatedUser } = data;

    let previousInfo = localStorage.getItem('authUser')
      ? JSON.parse(localStorage.getItem('authUser'))
      : null;
    previousInfo.user = updatedUser;

    dispatch({ type: ADMIN_UPDATE_SUCCESS, payload: { previousInfo } });
    localStorage.setItem('authUser', JSON.stringify(previousInfo));
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_FAIL,
      payload: {
        error: error?.response?.data?.message,
      },
    });
    toast.error(error?.response?.data?.message);
  }
};
