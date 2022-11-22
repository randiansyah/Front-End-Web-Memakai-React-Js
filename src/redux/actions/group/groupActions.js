import axios from "axios";
import { tokenConfig } from "../auth/loginActions";
import { returnInfos } from "../infos/infos";

export const fetchAllGroupData = () => (dispatch, getState) => {
  dispatch({
    type: "GROUP_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4010/groups", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_ALL_GROUP_DATA",
        payload: data.data ? data.data.courses : [],
      });
    })
    .catch((err) => {
      dispatch({
        type: "GROUP_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const postGroup = ({ ...values }, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "GROUP_REQUESTS",
  });

  axios
    .post(
      "http://141.136.47.177:4010/groups",
      { ...values },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_POST_GROUP",
      });

      onSuccess("Berhasil menambahkan data", "Sukses");
    })
    .then(() => dispatch(fetchAllGroupData()))
    .catch((err) => {
      onFailure("Gagal menambahkan data", "Gagal");
      dispatch({
        type: "GROUP_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const updateGroup = ({ ...values }, id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "GROUP_REQUESTS",
  });

  axios
    .put(
      `http://141.136.47.177:4010/groups/${id}`,
      { ...values },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_UPDATED_GROUP",
      });

      onSuccess("Berhasil memperbarui data", "Sukses");
    })
    .then(() => dispatch(fetchAllGroupData()))
    .catch((err) => {
      onFailure("Gagal memperbarui data", "Gagal");
      dispatch({
        type: "GROUP_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const deleteGroup = (id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "GROUP_REQUESTS",
  });

  axios
    .delete(`http://141.136.47.177:4010/groups/${id}`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_DELETED_GROUP",
        payload: id,
      });

      onSuccess("Berhasil menghapus data", "Sukses");
    })
    .catch((err) => {
      onFailure("Gagal menghapus data", "Gagal");
      dispatch({
        type: "GROUP_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};
