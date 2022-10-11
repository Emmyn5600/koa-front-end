import { toast } from "react-toastify";

import axios from "axios";
import {
  apiCallBegin,
  loadAttendancesSuccess,
  loadAttendancesFailure,
} from "../actions/actionCreators";

const apiEndPoint = process.env.REACT_APP_API_END_POINT;

export const loadAttendancesAsync = () => async (dispatch) => {
  dispatch(apiCallBegin());
  try {
    const response = await axios.get(`${apiEndPoint}getAllAttendances`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("authToken")).token
        }`,
      },
    });
    dispatch(loadAttendancesSuccess(response.data));
  } catch (error) {
    dispatch(
      loadAttendancesFailure(
        error.response
          ? error.response.data.message
          : "Error loading getAllAttendances"
      )
    );
    toast.error(
      error.response
        ? error.response.data.message
        : "Error loading getAllAttendances"
    );
  }
};
