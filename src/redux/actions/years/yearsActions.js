import axios from "axios";
import { tokenConfig } from "../auth/loginActions";
import { returnInfos } from "../infos/infos";

export const fetchAllYears = () => (dispatch, getState) => {
  dispatch({
    type: "YEARS_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4015/years", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_ALL_YEARS",
        payload: data.data
          ? data.data.years.filter((data) => data.is_deleted !== 1)
          : [],
      });
    })
    .catch((err) => {
      dispatch({
        type: "YEARS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const postYears = ({ ...values }, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "YEARS_REQUESTS",
  });

  axios
    .post(
      "http://141.136.47.177:4015/years",
      { ...values },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_POST_YEARS",
      });

      onSuccess("Berhasil menambahkan data", "Sukses");
    })
    .then(() => dispatch(fetchAllYears()))
    .catch((err) => {
      onFailure("Gagal menambahkan data", "Gagal");

      dispatch({
        type: "YEARS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const updateYears = ({ ...values }, id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "YEARS_REQUESTS",
  });

  axios
    .put(
      `http://141.136.47.177:4015/years/${id}`,
      { ...values },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_UPDATE_YEARS",
      });

      onSuccess("Berhasil memperbarui data", "Sukses");
    })
    .then(() => dispatch(fetchAllYears()))
    .catch((err) => {
      onFailure("Gagal memperbarui data", "Gagal");

      dispatch({
        type: "YEARS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const updateActiveYears = (id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "YEARS_REQUESTS",
  });

  axios
    .put(
      `http://141.136.47.177:4015/years/active/${id}`,
      {},
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_UPDATE_ACTIVE_YEARS",
      });

      onSuccess("Berhasil mengaktifkan data", "Sukses");
    })
    .then(() => dispatch(fetchAllYears()))
    .catch((err) => {
      onFailure("Gagal mengaktifkan data", "Gagal");

      dispatch({
        type: "YEARS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const deleteYears = (id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "YEARS_REQUESTS",
  });

  axios
    .delete(`http://141.136.47.177:4015/years/${id}`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_DELETE_YEARS",
        payload: id,
      });

      onSuccess("Berhasil menghapus data", "Sukses");
    })
    .catch((err) => {
      onFailure("Gagal menghapus data", "Gagal");

      dispatch({
        type: "YEARS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};
