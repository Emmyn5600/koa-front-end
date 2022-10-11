import {
  API_CALL_BEGIN,
  LOAD_ATTENDANCES_SUCCESS,
  LOAD_ATTENDANCES_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const attendances = (state = initialState, action) => {
  switch (action.type) {
    case API_CALL_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOAD_ATTENDANCES_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
        error: null,
      };
    case LOAD_ATTENDANCES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default attendances;
