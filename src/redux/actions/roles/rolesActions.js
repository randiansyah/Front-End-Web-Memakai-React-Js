import axios from "axios";
import { tokenConfig } from "../auth/loginActions";
import { returnInfos } from "../infos/infos";

export const fetchAllRoles = () => (dispatch, getState) => {
  dispatch({
    type: "ROLES_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4013/roles", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_ALL_ROLES",
        payload: data.data
          ? data.data.classroom.filter((data) => data.is_deleted !== 1)
          : [],
      });
    })
    .catch((err) => {
      dispatch({
        type: "ROLES_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const postRoles = ({ ...values }, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "ROLES_REQUESTS",
  });

  axios
    .post(
      "http://141.136.47.177:4013/roles",
      { ...values },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_POST_ROLES",
      });

      onSuccess("Berhasil menambahkan data", "Sukses");
    })
    .then(() => dispatch(fetchAllRoles()))
    .catch((err) => {
      onFailure("Gagal menambahkan data", "Gagal");

      dispatch({
        type: "ROLES_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const putActiveRole = (id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "ROLES_REQUESTS",
  });

  axios
    .put(
      `http://141.136.47.177:4013/roles/active/${id}`,
      {},
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_UPDATE_ACTIVE_ROLES",
      });

      onSuccess("Berhasil mengaktifkan peran", "Sukses");
    })
    .then(() => dispatch(fetchAllRoles()))
    .catch((err) => {
      onFailure("Gagal mengaktifkan peran", "Gagal");

      dispatch({
        type: "ROLES_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const updateRoles = ({ ...values }, id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "ROLES_REQUESTS",
  });

  axios
    .put(
      `http://141.136.47.177:4013/roles/${id}`,
      { ...values },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_UPDATE_ROLES",
      });

      onSuccess("Berhasil memperbarui peran", "Sukses");
    })
    .then(() => dispatch(fetchAllRoles()))
    .catch((err) => {
      onFailure("Gagal memperbarui peran", "Gagal");

      dispatch({
        type: "ROLES_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const deleteRoles = (id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "ROLES_REQUESTS",
  });

  axios
    .delete(`http://141.136.47.177:4013/roles/${id}`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_DELETE_ROLES",
        payload: id,
      });

      onSuccess("Berhasil menghapus peran", "Sukses");
    })
    .catch((err) => {
      onFailure("Gagal menghapus peran", "Gagal");

      dispatch({
        type: "ROLES_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};
