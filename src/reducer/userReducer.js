import * as types from "../constants/user.constants";
const initialState = {
  user: null,
  loading: false,
  error: "",
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.REGISTER_USER_REQUEST:
    case types.LOGIN_REQUEST:
      return { ...state, loading: true, user: null, error: "" };
    case types.GOOGLE_LOGIN_SUCCESS:
    case types.LOGIN_SUCCESS: {
      return { ...state, loading: false, user: payload.user, error: "" };
    }
    case types.REGISTER_USER_SUCCESS: {
      return { ...state, loading: false };
    }
    case types.REGISTER_USER_FAIL:
    case types.GOOGLE_LOGIN_FAIL:
    case types.LOGIN_FAIL: {
      return { ...state, loading: false, error: payload };
    }
    case types.LOGOUT: {
      return { ...initialState };
    }
    default:
      return state;
  }
}

export default userReducer;
