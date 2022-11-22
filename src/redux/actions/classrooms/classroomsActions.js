import axios from "axios";
import { tokenConfig } from "../auth/loginActions";
import { returnInfos } from "../infos/infos";

export const fetchAllClassrooms = () => (dispatch, getState) => {
  dispatch({
    type: "CLASSROOMS_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4007/classroom", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_ALL_CLASSROOMS",
        payload: {
          classrooms: data.data
            ? data.data.classroom.filter((data) => data.is_deleted !== 1)
            : [],
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: "CLASSROOMS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const fetchAllMajorsName = () => (dispatch, getState) => {
  dispatch({
    type: "CLASSROOMS_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4011/majors", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_ALL_MAJORS_NAME",
        payload: data.data
          ? data.data.classroom.filter((data) => data.is_deleted !== 1)
          : [],
      });
    })
    .catch((err) => {
      dispatch({
        type: "CLASSROOMS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const fetchClassroomsByID = (id) => (dispatch, getState) => {
  dispatch({
    type: "CLASSROOMS_REQUESTS",
  });

  axios
    .get(`http://141.136.47.177:4007/classroom/${id}`, tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_CLASSROOMS_BY_ID",
        payload: data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "CLASSROOMS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const searchFilterClassrooms = ({ class_code, room_id, nik, name }) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "CLASSROOMS_REQUESTS",
  });

  let quote = "?";

  const classCode = class_code ? `class_code=${class_code}` : "";

  const roomData = room_id
    ? class_code === ""
      ? `room_id=${room_id}`
      : `&room_id=${room_id}`
    : "";

  const nikData = nik
    ? room_id === "" && class_code === ""
      ? `nik=${nik}`
      : `&nik=${nik}`
    : "";

  const nameData = name
    ? nik === "" && room_id && class_code === ""
      ? `name=${name}`
      : `&name=${name}`
    : "";

  const isEmpty =
    class_code === "" && room_id === "" && nik === "" && name === "";

  if (isEmpty) quote = "";

  axios
    .get(
      `http://141.136.47.177:4007/classroom${quote}${classCode}${roomData}${nikData}${nameData}`,
      tokenConfig(getState)
    )
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_ALL_CLASSROOMS",
        payload: {
          classrooms: data.data
            ? data.data.classroom.filter((data) => data.is_deleted !== 1)
            : [],
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: "CLASSROOMS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const postClassrooms = ({ ...values }, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "CLASSROOMS_REQUESTS",
  });

  axios
    .post(
      "http://141.136.47.177:4007/classroom",
      { ...values },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_POST_CLASSROOMS",
      });

      onSuccess("Berhasil menambahkan kelas", "Sukses");
    })
    .then(() => dispatch(fetchAllClassrooms()))
    .catch((err) => {
      onFailure("Gagal menambahkan kelas", "Gagal");

      dispatch({
        type: "CLASSROOMS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const updateClassrooms = ({ ...values }, id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "CLASSROOMS_REQUESTS",
  });

  const { nik } = values;
  const nikFix = `${nik}`;

  axios
    .put(
      `http://141.136.47.177:4007/classroom/${id}`,
      { ...values, nik: nikFix },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_UPDATE_CLASSROOMS",
      });

      onSuccess("Berhasil memperbarui data kelas", "Sukses");
    })
    .then(() => dispatch(fetchAllClassrooms()))
    .catch((err) => {
      onFailure("Gagal memperbarui data kelas", "Gagal");

      dispatch({
        type: "CLASSROOMS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const deleteClassrooms = (id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "CLASSROOMS_REQUESTS",
  });

  axios
    .delete(`http://141.136.47.177:4007/classroom/${id}`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_DELETE_CLASSROOMS",
      });
      onSuccess("Berhasil menghapus kelas", "Sukses");
    })
    .then(() => dispatch(fetchAllClassrooms()))
    .catch((err) => {
      onFailure("Gagal menghapus kelas", "Gagal");

      dispatch({
        type: "CLASSROOMS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};
