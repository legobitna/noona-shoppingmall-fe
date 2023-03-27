import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";
const loginWithToken = () => async (dispatch) => {
  try {
    const response = await api.get("/user/me");
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: response.data,
    });
    dispatch({
      type: commonTypes.INITIALIZE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: commonTypes.INITIALIZE_FAIL,
    });
    dispatch({ type: types.LOGIN_FAIL, payload: error });
    dispatch(logout());
  }
};
const loginWithEmail = (payload) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST });
    sessionStorage.removeItem("token");
    const response = await api.post(`/auth/login`, payload);

    if (response.status !== 200) throw new Error(response.error);
    sessionStorage.setItem("token", response.data.token);
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.LOGIN_FAIL, payload: error.error });
  }
};
const logout = () => async (dispatch) => {
  sessionStorage.removeItem("token");

  dispatch({ type: types.LOGOUT });
};

const loginWithGoogle = (token) => async (dispatch) => {
  try {
    dispatch({ type: types.GOOGLE_LOGIN_REQUEST });
    const response = await api.post("/auth/google", { token });

    if (response.status !== 200) throw new Error(response.error);

    sessionStorage.setItem("token", response.data.token);

    dispatch({
      type: types.GOOGLE_LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.GOOGLE_LOGIN_FAIL, payload: error });
  }
};

const registerUser =
  ({ email, name, password }, navigate) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.REGISTER_USER_REQUEST });
      const response = await api.post("/user", { email, name, password });
      if (response.status !== 200) throw new Error(response.error);
      dispatch({ type: types.REGISTER_USER_SUCCESS });
      dispatch(
        commonUiActions.showToastMessage("회원가입을 완료했습니다!", "success")
      );
      navigate("/login");
    } catch (error) {
      dispatch({ type: types.REGISTER_USER_FAIL, payload: error.error });
    }
  };
export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
};
