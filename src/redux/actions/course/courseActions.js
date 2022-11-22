import axios from "axios";
import { tokenConfig } from "../auth/loginActions";
import { returnInfos } from "../infos/infos";

export const fetchAllCourse = () => (dispatch, getState) => {
  dispatch({
    type: "COURSE_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4010/courses", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_ALL_COURSE",
        payload: data.data
          ? data.data.courses.filter((data) => data.is_deleted !== 1)
          : [],
      });
    })
    .catch((err) => {
      dispatch({
        type: "COURSE_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const fetchCourseByID = (id) => (dispatch, getState) => {
  dispatch({
    type: "COURSE_REQUESTS",
  });

  axios
    .get(`http://141.136.47.177:4010/courses/${id}`, tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_ALL_COURSE_BY_ID",
        payload: data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "COURSE_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const searchFilterCourse = ({ ...values }) => (dispatch, getState) => {
  dispatch({
    type: "FILTERING_COURSE_DATA",
  });

  const { curriculum_id, stages, course_code, group_id } = values;

  let quote = "?";

  const curriculumData = curriculum_id ? `curriculum_id=${curriculum_id}` : "";

  const stagesData = stages
    ? curriculum_id === ""
      ? `stages=${stages}`
      : `&stages=${stages}`
    : "";

  const courseData = course_code
    ? stages === ""
      ? `course_code=${course_code}`
      : `&course_code=${course_code}`
    : "";

  const groupData = group_id
    ? curriculum_id === "" && stages === ""
      ? `group_id=${group_id}`
      : `&group_id=${group_id}`
    : "";

  if (
    curriculum_id === "" &&
    stages === "" &&
    course_code === "" &&
    group_id === ""
  )
    quote = "";

  axios
    .get(
      `http://141.136.47.177:4010/courses${quote}${curriculumData}${stagesData}${courseData}${groupData}`,
      tokenConfig(getState)
    )
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FILTERING_COURSE_DATA",
        payload: data.data
          ? data.data.courses.filter((data) => data.is_deleted !== 1)
          : [],
      });

      dispatch(returnInfos("Data ditemukan", 200, "SEARCH_FILTER_FOUND"));
    })
    .catch((err) => {
      dispatch({
        type: "SEARCH_FILTER_NOT_FOUND",
      });

      dispatch(
        returnInfos("Data tidak ditemukan", 400, "SEARCH_FILTER_NOT_FOUND")
      );
    });
};

export const postCourse = ({ ...values }, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "COURSE_REQUESTS",
  });

  axios
    .post(
      "http://141.136.47.177:4010/courses",
      { ...values },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_POST_COURSE",
      });

      onSuccess("Berhasil menambahkan data", "Sukses");
    })
    .catch((err) => {
      onFailure("Gagal menambahkan data", "Gagal");

      dispatch({
        type: "COURSE_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const updateCourse = ({ ...values }, id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "COURSE_REQUESTS",
  });

  axios
    .put(
      `http://141.136.47.177:4010/courses/${id}`,
      { ...values },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_UPDATE_COURSE",
      });

      onSuccess("Berhasil memperbarui data", "Sukses");
    })
    .then(() => dispatch(fetchCourseByID(id)))
    .catch((err) => {
      onFailure("Gagal memperbarui data", "Gagal");

      dispatch({
        type: "COURSE_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const deleteCourse = (id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "COURSE_REQUESTS",
  });

  axios
    .delete(`http://141.136.47.177:4010/courses/${id}`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_DELETE_COURSE",
        payload: id,
      });

      onSuccess("Berhasil menghapus data", "Sukses");
    })
    .catch((err) => {
      onFailure("Gagal menghapus data", "Gagal");

      dispatch({
        type: "COURSE_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};
