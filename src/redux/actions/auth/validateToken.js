import API from "../../../http-common";
import { returnInfos } from "../infos/infos";
import cookies from "js-cookie";

export const validateToken = (token, onSuccess, onError, flag = "") => async (
  dispatch,
  getState
) => {
  dispatch({
    type: "REQUEST_IN_PROGRESS",
  });

  const body = JSON.stringify({ token });

  try {
    await API.post("accounts/validate-reset-token", body);

    dispatch({ type: "VALIDATE_SUCCESS" });

    onSuccess();

    dispatch(
      returnInfos("Silahkan Reset Password Anda", 200, "VALIDATE_SUCCESS")
    );
  } catch (err) {
    switch (flag) {
      case "VALIDATE_ERROR_ON_RESET_PAGE":
        cookies.remove("tokenResetPassword", { path: "/" });
        dispatch({ type: "STATE_IS_NOT_LOADING" });
        dispatch({
          type: "VALIDATE_ERROR",
        });
        return onError();

      default:
        dispatch({ type: "STATE_IS_NOT_LOADING" });
        return dispatch(
          returnInfos(
            err.response.data.message,
            err.response.status,
            "VALIDATE_ERROR_WHILE_VALIDATIN"
          )
        );
    }
  }
};

export const validateRegisterToken = (token, onSuccess, onError) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "REGISTER_REQUESTS",
  });

  const body = JSON.stringify({ token });

  API.post("accounts/verify-email", body)
    .then(({ data }) => {
      dispatch(returnInfos(data.message, 200, "REGISTER_TOKEN_VALID"));
      dispatch({ type: "VERIFICATION_EMAIL_SUCCESS" });
      onSuccess(data.message);
    })
    .catch((err) => {
      dispatch(
        returnInfos(
          err.response.data.message,
          err.response.status,
          "REGISTER_TOKEN_IS_NOT_VALID"
        )
      );
      dispatch({ type: "REGISTER_STATE_IS_NOT_LOADING_OR_ERRORS" });
      setTimeout(() => onError(), 3000);
    });
};
