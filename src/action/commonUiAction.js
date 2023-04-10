import * as types from "../constants/commonUI.constants";

const showToastMessage =
  (message, status, callbackError) => async (dispatch) => {
    dispatch({
      type: types.SET_TOAST_MESSAGE,
      payload: { message, status, callbackError },
    });
  };

export const commonUiActions = {
  showToastMessage,
};
