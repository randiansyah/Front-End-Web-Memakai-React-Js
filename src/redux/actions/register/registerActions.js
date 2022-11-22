import API from "../../../http-common";
import { returnInfos } from "../infos/infos";

export const checkNis = ({ nis }, onError, onSuccess) => (dispatch) => {
  dispatch({
    type: "REGISTER_REQUESTS",
  });

  const token = `ondevp:Sample123123@`;
  const encodedToken = Buffer.from(token).toString("base64");
  const headers = {
    Authorization: "Basic " + encodedToken,
  };

  API.get(`https://ondevp.com/pesat/users?nisornik=${nis}`, { headers })
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: "CHECK_NIS",
        payload: {
          data: data ? data.data[0] : [],
          nis,
        },
      });
      dispatch(returnInfos(data.message, 200, "DATA_DITEMUKAN"));
      onSuccess(data.message);
    })
    .catch((err) => {
      dispatch({ type: "REGISTER_STATE_IS_NOT_LOADING_OR_ERRORS" });
      dispatch(returnInfos(err.response.data.message, err.response.status));
      onError(err.response.data.message);
    });
};

export const postRegisterUser = ({ ...values }, onSuccess, onError) => (
  dispatch
) => {
  dispatch({
    type: "REGISTER_REQUESTS",
  });

  const body = JSON.stringify({ ...values });

  API.post("accounts/register", body)
    .then(() => {
      dispatch(returnInfos("Pendaftaran berhasil", 200, "REGISTER_SUCCESS"));
      onSuccess("Pendaftaran berhasil, silahkan cek email anda.");
      dispatch({
        type: "REGISTER_SUCCESS",
      });
    })
    .then(() => dispatch(clearRegisterData()))
    .catch((err) => {
      dispatch(returnInfos("Pendaftaran gagal", err.response.status));
      dispatch({ type: "REGISTER_STATE_IS_NOT_LOADING_OR_ERRORS" });
      onError("Pendaftaran gagal");
    });
};

export const clearRegisterData = () => (dispatch) => {
  dispatch({
    type: "CLEAR_REGISTER_DATA",
  });
};
