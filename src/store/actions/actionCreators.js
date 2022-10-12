import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  AUTH_API_CALL_START,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  API_CALL_BEGIN,
  TOGGLE_SIDEBAR,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILURE,
  LOAD_USER_FAILURE,
  LOAD_USER_SUCCESS,
  LOAD_ATTENDANCES_SUCCESS,
  LOAD_ATTENDANCES_FAILURE,
  UPDATE_ATTENDANCES_REQUEST,
  UPDATE_ATTENDANCES_SUCCESS,
  UPDATE_ATTENDANCES_FAIL,
  ATTENDANCE_DETAILS_REQUEST,
  ATTENDANCE_DETAILS_SUCCESS,
  ATTENDANCE_DETAILS_FAIL,
} from "./actionTypes";

import axios from "axios";

export const apiCallBegin = () => ({
  type: API_CALL_BEGIN,
});

export const authApiCallStart = () => ({
  type: AUTH_API_CALL_START,
});

export const signupSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginSuccess = (user, data) => ({
  type: LOGIN_SUCCESS,
  payload: { user, data },
});

export const authLogout = () => ({
  type: LOGOUT_SUCCESS,
});

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});

export const loadUsersSuccess = (users) => ({
  type: LOAD_USERS_SUCCESS,
  payload: users,
});

export const loadUsersFailure = (error) => ({
  type: LOAD_USERS_FAILURE,
  payload: error,
});

export const removeUserSuccess = (user) => ({
  type: REMOVE_USER_SUCCESS,
  payload: user,
});

export const removeUserFailure = (error) => ({
  type: REMOVE_USER_FAILURE,
  payload: error,
});

export const loadUserSuccess = (user) => ({
  type: LOAD_USER_SUCCESS,
  payload: user,
});

export const loadUserFailure = (error) => ({
  type: LOAD_USER_FAILURE,
  payload: error,
});

export const loadAttendancesSuccess = (attendances) => ({
  type: LOAD_ATTENDANCES_SUCCESS,
  payload: attendances,
});

export const loadAttendancesFailure = (error) => ({
  type: LOAD_ATTENDANCES_FAILURE,
  payload: error,
});

export const loadAttendanceDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ATTENDANCE_DETAILS_REQUEST });
    const { data } = await axios.get(`getAttendance/${id}`);
    dispatch({
      type: ATTENDANCE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ATTENDANCE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateAttendance = (attendance) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_ATTENDANCES_REQUEST });

    const {
      loggedInUser: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/attedances/${attendance._id}`,
      attendance,
      config
    );
    dispatch({
      type: UPDATE_ATTENDANCES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ATTENDANCES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
