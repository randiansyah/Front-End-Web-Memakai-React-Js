import axios from "axios";
import { tokenConfig } from "../auth/loginActions";
import { returnInfos } from "../infos/infos";

export const fetchAllTeachers = () => (dispatch, getState) => {
  dispatch({
    type: "TEACHERS_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4016/teachers", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_ALL_TEACHERS",
        payload: data.data ? data.data.teachers : [],
      });
    })
    .catch((err) => {
      dispatch({
        type: "TEACHERS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const fetchTeachersByID = (id) => (dispatch, getState) => {
  dispatch({
    type: "TEACHERS_REQUESTS",
  });

  axios
    .get(`http://141.136.47.177:4016/teachers/${id}`, tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_TEACHERS_BY_ID",
        payload: data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "TEACHERS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const teachersFetchGenders = () => (dispatch, getState) => {
  dispatch({
    type: "TEACHERS_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4016/genders", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "TEACHERS_SUCCESSFULLY_FETCH_ALL_GENDERS",
        payload: data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "TEACHERS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const teachersFetchEmployeeStatus = () => (dispatch, getState) => {
  dispatch({
    type: "TEACHERS_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4016/employee-status", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "TEACHERS_SUCCESSFULLY_FETCH_ALL_EMPLOYEE_STATUS",
        payload: data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "TEACHERS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const teachersFetchMaritalStatus = () => (dispatch, getState) => {
  dispatch({
    type: "TEACHERS_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4016/marital-status", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "TEACHERS_SUCCESSFULLY_FETCH_ALL_MARITAL_STATUS",
        payload: data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "TEACHERS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const teachersFetchReligions = () => (dispatch, getState) => {
  dispatch({
    type: "TEACHERS_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4016/religions", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "TEACHERS_SUCCESSFULLY_FETCH_ALL_RELIGIONS",
        payload: data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "TEACHERS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const teachersFetchPtkTypes = () => (dispatch, getState) => {
  dispatch({
    type: "TEACHERS_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4016/ptk-types", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "TEACHERS_SUCCESSFULLY_FETCH_ALL_PTK_TYPES",
        payload: data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "TEACHERS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const createTeachersData = (values, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "TEACHERS_REQUESTS",
  });

  axios
    .post("http://141.136.47.177:4016/teachers", values, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_POST_TEACHERS",
      });

      onSuccess("Berhasil menambahkan data", "Sukses");
    })
    .catch((err) => {
      onFailure("Gagal menambahkan data", "Gagal");
      dispatch({
        type: "TEACHERS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const updateTeachersData = ({ ...values }, id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "TEACHERS_REQUESTS",
  });

  axios
    .put(
      `http://141.136.47.177:4016/teachers/${id}`,
      { ...values },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_UPDATE_TEACHERS",
      });

      onSuccess("Berhasil memperbarui data", "Sukses");
    })
    .then(() => dispatch(fetchTeachersByID(id)))
    .catch((err) => {
      onFailure("Gagal memperbarui data", "Gagal");
      dispatch({
        type: "TEACHERS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const updatePhoto = (values, id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "TEACHERS_REQUESTS",
  });

  axios
    .put(
      `http://141.136.47.177:4016/teachers/photo/${id}`,
      values,
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_UPDATE_PHOTO_TEACHERS",
      });

      onSuccess("Berhasil memperbarui foto profil", "Sukses");
    })
    .then(() => dispatch(fetchTeachersByID(id)))
    .catch((err) => {
      onFailure("Gagal memperbarui foto profil", "Gagal");
      dispatch({
        type: "TEACHERS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const deleteTeacher = (id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "TEACHERS_REQUESTS",
  });

  axios
    .delete(`http://141.136.47.177:4016/teachers/${id}`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_DELETE_TEACHERS",
        payload: id,
      });

      onSuccess("Berhasil menghapus data", "Sukses");
    })
    .catch((err) => {
      onFailure("Gagal menghapus data", "Gagal");

      dispatch({
        type: "TEACHERS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const updateActiveTeacher = (id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "TEACHERS_REQUESTS",
  });

  axios
    .put(
      `http://141.136.47.177:4016/teachers/active/${id}`,
      {},
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_UPDATE_ACTIVE_TEACHERS",
      });

      onSuccess("Berhasil mengaktifkan guru", "Sukses");
    })
    .then(() => dispatch(fetchAllTeachers()))
    .catch((err) => {
      onFailure("Gagal mengaktifkan guru", "Gagal");
      dispatch({
        type: "TEACHERS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const searchFilterTeachers = ({ ...values }) => (dispatch, getState) => {
  dispatch({
    type: "TEACHERS_REQUESTS",
  });

  const { nip, nik, nuptk, ptk_type_id, employe_status_id, is_active } = values;

  let quote = "?";

  const nipData = nip ? `nip=${nip}` : "";

  const nikData = nik ? (nip === "" ? `nik=${nik}` : `&nik=${nik}`) : "";

  const nuptkData = nuptk
    ? nik === ""
      ? `nuptk=${nuptk}`
      : `&nuptk=${nuptk}`
    : "";

  const ptkTypeData = ptk_type_id
    ? nip === "" && nik === "" && nuptk === ""
      ? `ptk_type_id=${ptk_type_id}`
      : `&ptk_type_id=${ptk_type_id}`
    : "";

  const employeStatusData = employe_status_id
    ? nip === "" && nik === "" && ptk_type_id === "" && nuptk === ""
      ? `employe_status_id=${employe_status_id}`
      : `&employe_status_id=${employe_status_id}`
    : "";

  const isActiveData = is_active
    ? nip === "" &&
      nik === "" &&
      ptk_type_id === "" &&
      employe_status_id === "" &&
      nuptk === ""
      ? `is_active=${is_active}`
      : `&is_active=${is_active}`
    : "";

  if (
    nip === "" &&
    nik === "" &&
    nuptk === "" &&
    ptk_type_id === "" &&
    employe_status_id === "" &&
    is_active === ""
  )
    quote = "";

  axios
    .get(
      `http://141.136.47.177:4016/teachers${quote}${nipData}${nikData}${nuptkData}${ptkTypeData}${employeStatusData}${isActiveData}`,
      tokenConfig(getState)
    )
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_ALL_TEACHERS",
        payload: data.data ? data.data.teachers : [],
      });
    })
    .catch((err) => {
      dispatch({
        type: "TEACHERS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};
