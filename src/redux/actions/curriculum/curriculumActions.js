import axios from "axios";
import { tokenConfig } from "../auth/loginActions";
import { returnInfos } from "../infos/infos";

export const fetchAllCurriculum = () => (dispatch, getState) => {
  dispatch({
    type: "CURRICULUM_REQUEST",
  });

  axios
    .get("http://141.136.47.177:4012/curriculums", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_ALL_CURRICULUM_DATA",
        payload: data.data
          ? data.data.classroom.filter((data) => data.is_deleted !== 1)
          : [],
      });
    })
    .catch((err) => {
      dispatch({
        type: "CURRICULUM_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const postCurriculum = ({ ...values }, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "CURRICULUM_REQUEST",
  });

  axios
    .post(
      "http://141.136.47.177:4012/curriculums",
      { ...values },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "POST_CURRICULUM_SUCCESS",
      });

      onSuccess("Berhasil menambahkan data", "Sukses");
    })
    .catch((err) => {
      onFailure("Gagal menambahkan data", "Error");

      dispatch({
        type: "CURRICULUM_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const updateActiveCurriculum = (id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "CURRICULUM_REQUEST",
  });

  axios
    .put(
      `http://141.136.47.177:4012/curriculums/active/${id}`,
      { is_active: id },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "PUT_ACTIVE_CURRICULUM_SUCCESS",
      });

      onSuccess("Berhasil mengaktifkan kurikulum", "Sukses");
    })
    .then(() => dispatch(fetchAllCurriculum()))
    .catch((err) => {
      onFailure("Gagal mengaktifkan kurikulum", "Error");

      dispatch({
        type: "CURRICULUM_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const updateCurriculum = ({ ...values }, id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "CURRICULUM_REQUEST",
  });

  axios
    .put(
      `http://141.136.47.177:4012/curriculums/${id}`,
      { ...values },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "PUT_CURRICULUM_SUCCESS",
      });

      onSuccess("Berhasil memperbarui kurikulum", "Sukses");
    })
    .then(() => dispatch(fetchAllCurriculum()))
    .catch((err) => {
      onFailure("Gagal memperbarui kurikulum", "Error");

      dispatch({
        type: "CURRICULUM_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const deleteCurriculum = (id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "CURRICULUM_REQUEST",
  });

  axios
    .delete(
      `http://141.136.47.177:4012/curriculums/${id}`,
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "DELETE_CURRICULUM_SUCCESS",
        payload: id,
      });

      onSuccess("Berhasil menghapus kurikulum", "Sukses");
    })
    .catch((err) => {
      onFailure("Gagal menghapus kurikulum", "Error");

      dispatch({
        type: "CURRICULUM_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};
