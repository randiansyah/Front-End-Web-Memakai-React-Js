import axios from "axios";
import { tokenConfig } from "../auth/loginActions";
import { returnInfos } from "../infos/infos";

export const fetchAllStages = () => (dispatch, getState) => {
  dispatch({
    type: "STAGES_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4014/stages", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_ALL_STAGES",
        payload: data.data
          ? data.data.stages.filter((data) => data.is_deleted !== 1)
          : [],
      });
    })
    .catch((err) => {
      dispatch({
        type: "STAGES_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const postStages = ({ ...values }, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "STAGES_REQUESTS",
  });

  axios
    .post(
      "http://141.136.47.177:4014/stages",
      { ...values },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_POST_STAGES",
      });

      onSuccess("Berhasil menambahkan data", "Sukses");
    })
    .then(() => dispatch(fetchAllStages()))
    .catch((err) => {
      onFailure("Gagal menambahkan data", "Gagal");

      dispatch({
        type: "STAGES_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const updateStages = ({ ...values }, id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "STAGES_REQUESTS",
  });

  axios
    .put(
      `http://141.136.47.177:4014/stages/${id}`,
      { ...values },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_UPDATE_STAGES",
      });

      onSuccess("Berhasil memperbarui data", "Sukses");
    })
    .then(() => dispatch(fetchAllStages()))
    .catch((err) => {
      onFailure("Gagal mempebarui data", "Gagal");

      dispatch({
        type: "STAGES_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const putActiveStages = (id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "STAGES_REQUESTS",
  });

  axios
    .put(
      `http://141.136.47.177:4014/stages/active/${id}`,
      {},
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_UPDATE_ACTIVE_STAGES",
      });

      onSuccess("Berhasil mengaktifkan data", "Sukses");
    })
    .then(() => dispatch(fetchAllStages()))
    .catch((err) => {
      onFailure("Gagal mengaktifkan data", "Gagal");

      dispatch({
        type: "STAGES_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const deleteStages = (id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "STAGES_REQUESTS",
  });

  axios
    .delete(`http://141.136.47.177:4014/stages/${id}`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_DELETE_STAGES",
        payload: id,
      });

      onSuccess("Berhasil menghapus data", "Sukses");
    })
    .catch((err) => {
      onFailure("Gagal menghapus data", "Gagal");

      dispatch({
        type: "STAGES_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};
