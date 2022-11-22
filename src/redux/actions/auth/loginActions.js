import API from "../../../http-common";
import cookies from "js-cookie";
import { returnInfos } from "../infos/infos";

export const changeRole = (role) => {
  return (dispatch) => dispatch({ type: "CHANGE_ROLE", userRole: role });
};

export const loginUser = ({ nisornik, password }, alertError) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "REQUEST_IN_PROGRESS",
  });

  const body = JSON.stringify({ nisornik, password });

  API.post("accounts/authenticate", body)
    .then(({ data }) => {
      cookies.set("jwtToken", data.jwtToken);

      dispatch({ type: "LOGIN_WITH_NIS", payload: data });
    })
    .catch((err) => {
      alertError(err.response.data.message);
      dispatch({ type: "LOGIN_ERROR" });
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: "LOGOUT_WITH_NIS",
  });
  cookies.remove("jwtToken", {
    path: "/",
  });
};

export const forgotPassword = ({ email }, sweetAlert) => (dispatch) => {
  dispatch({
    type: "REQUEST_IN_PROGRESS",
  });

  const body = JSON.stringify({ email });

  API.post("accounts/forgot-password", body)
    .then(({ data }) => {
      dispatch(returnInfos(data.message, 200));
      sweetAlert(data.message);
      dispatch({
        type: "EMAIL_SUCCESSFULLY_SENT",
      });
    })
    .catch((err) => {
      dispatch({
        type: "FORGOT_PASSWORD_ERROR",
      });
      sweetAlert(err.response.data.message, false);
      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const redirectToLogin = (isTrue) => (dispatch) => {
  dispatch({
    type: "SESSION_EXPIRED",
  });

  isTrue();
};

export const setLoadingToFalse = () => (dispatch) => {
  dispatch({
    type: "STATE_IS_NOT_LOADING",
  });
};

export const tokenConfig = (getState) => {
  const token = getState().auth.auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};
