import axios from "axios";
import { tokenConfig } from "../auth/loginActions";
import { returnInfos } from "../infos/infos";

export const fetchAllMajors = () => (dispatch, getState) => {
  dispatch({
    type: "MAJORS_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4011/majors", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_ALL_MAJORS",
        payload: data.data
          ? data.data.classroom.filter((data) => data.is_deleted !== 1)
          : [],
      });
    })
    .catch((err) => {
      dispatch({
        type: "MAJORS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.messsage, err.respones.status));
    });
};

export const postMajors = ({ ...values }, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "MAJORS_REQUESTS",
  });

  axios
    .post(
      "http://141.136.47.177:4011/majors",
      { ...values },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_POST_MAJORS",
      });

      onSuccess("Berhasil menambahkan data", "Sukses");
    })
    .then(() => dispatch(fetchAllMajors()))
    .catch((err) => {
      onFailure("Gagal menambahkan data", "Gagal");

      dispatch({
        type: "MAJORS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.messsage, err.respones.status));
    });
};

export const putActiveMajors = (id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "MAJORS_REQUESTS",
  });

  axios
    .put(
      `http://141.136.47.177:4011/majors/active/${id}`,
      {},
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_UPDATE_ACTIVE_MAJORS",
      });

      onSuccess("Berhasil mengaktifkan jurusan", "Sukses");
    })
    .then(() => dispatch(fetchAllMajors()))
    .catch((err) => {
      onFailure("Gagal mengaktifkan jurusan", "Gagal");

      dispatch({
        type: "MAJORS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.messsage, err.respones.status));
    });
};

export const updateMajors = ({ ...values }, id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "MAJORS_REQUESTS",
  });

  axios
    .put(
      `http://141.136.47.177:4011/majors/${id}`,
      { ...values },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_UPDATE_MAJORS",
      });

      onSuccess("Berhasil memperbarui jurusan", "Sukses");
    })
    .then(() => dispatch(fetchAllMajors()))
    .catch((err) => {
      onFailure("Gagal memperbarui jurusan", "Gagal");

      dispatch({
        type: "MAJORS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.messsage, err.respones.status));
    });
};

export const deleteMajors = (id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "MAJORS_REQUESTS",
  });

  axios
    .delete(`http://141.136.47.177:4011/majors/${id}`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_DELETE_MAJORS",
        payload: id,
      });

      onSuccess("Berhasil menghapus jurusan", "Sukses");
    })
    .catch((err) => {
      onFailure("Gagal menghapus jurusan", "Gagal");

      dispatch({
        type: "MAJORS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.messsage, err.respones.status));
    });
};
