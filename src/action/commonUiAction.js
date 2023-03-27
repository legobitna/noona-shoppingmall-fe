import * as types from "../constants/commonUI.constants";

const showToastMessage = (message, status) => async (dispatch) => {
  dispatch({ type: types.SET_TOAST_MESSAGE, payload: { message, status } });
};

export const commonUiActions = {
  showToastMessage,
};
