import API from "../../../http-common";
import { returnInfos } from "../infos/infos";

export const resetPassword = (
  { token, password, confirmPassword },
  onSuccess
) => async (dispatch) => {
  dispatch({
    type: "REQUEST_IN_PROGRESS",
  });

  const body = JSON.stringify({ token, password, confirmPassword });

  try {
    const response = await API.post("accounts/reset-password", body);

    const data = await response.data;

    dispatch({
      type: "RESET_PASSWORD_SUCCESS",
    });

    dispatch(returnInfos("", 200));

    onSuccess(data.message);
  } catch (err) {
    dispatch({
      type: "RESET_PASSWORD_ERROR",
    });
    dispatch(
      returnInfos(
        err.response.data.message,
        err.response.status,
        "RESET_PASSWORD_ERROR"
      )
    );
  }
};
