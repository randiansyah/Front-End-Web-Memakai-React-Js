import axios from "axios";
import { tokenConfig } from "../auth/loginActions";
import { returnInfos } from "../infos/infos";

export const fetchAllRooms = () => (dispatch, getState) => {
  dispatch({
    type: "ROOMS_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4008/rooms", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCHING_ALL_ROOMS",
        payload: data.data
          ? data.data.rooms.filter((data) => data.is_deleted !== 1)
          : [],
      });
    })
    .catch((err) => {
      dispatch({
        type: "ROOMS_REQUESTS_FAILURE",
      });
      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const postRooms = ({ ...values }, onSuccess, onError) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "ROOMS_REQUESTS",
  });

  axios
    .post(
      "http://141.136.47.177:4008/rooms",
      { ...values },
      tokenConfig(getState)
    )
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_POST_ROOMS",
      });
      onSuccess("Berhasil menambahkan data", "Sukses");
    })
    .then(() => dispatch(fetchAllRooms()))
    .catch((err) => {
      dispatch({
        type: "ROOMS_REQUESTS_FAILURE",
      });
      onError("Gagal menambahkan data", "Gagal");
    });
};

export const updateRoomsByID = (
  { room_name, capacity, is_active },
  id,
  onSuccess,
  onError
) => (dispatch, getState) => {
  dispatch({
    type: "ROOMS_REQUESTS",
  });

  const isActive = `${is_active}`;

  axios
    .put(
      `http://141.136.47.177:4008/rooms/${id}`,
      { room_name, capacity, is_active: isActive },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_UPDATE_ROOMS_BY_ID",
      });
      onSuccess("Data berhasil diperbarui", "Sukses");
    })
    .then(() => dispatch(fetchAllRooms()))
    .catch((err) => {
      dispatch({
        type: "ROOMS_REQUESTS_FAILURE",
      });
      dispatch(returnInfos(err.response.data.message, err.response.status));
      onError("Gagal memperbarui data", "Gagal");
    });
};

export const getRoomsByID = (id) => (dispatch, getState) => {
  dispatch({
    type: "ROOMS_REQUESTS",
  });

  axios
    .get(`http://141.136.47.177:4008/rooms/${id}`, tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCHING_ROOMS_BY_ID",
        payload: data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "ROOMS_REQUESTS_FAILURE",
      });
      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const deleteRoomsByID = (id, onSuccess, onError) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "ROOMS_REQUESTS",
  });

  axios
    .delete(`http://141.136.47.177:4008/rooms/${id}`, tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_DELETE_ROOMS_BY_ID",
        payload: id,
      });
      onSuccess(data.message, "Sukses");
    })
    .catch((err) => {
      dispatch({
        type: "ROOMS_REQUESTS_FAILURE",
      });
      dispatch(returnInfos(err.response.data.message, err.response.status));
      onError(err.response.data.message, "Gagal");
    });
};
