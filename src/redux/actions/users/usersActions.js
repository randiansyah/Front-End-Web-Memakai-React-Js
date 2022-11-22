import axios from "axios";
import { returnInfos } from "../infos/infos";
import { tokenConfig } from "../auth/loginActions";

export const fetchUsersData = () => (dispatch, getState) => {
  dispatch({
    type: "USERS_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4002/users", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCHED_USERS_DATA",
        payload: data.data ? data.data.users : [],
      });
    })
    .catch((err) => {
      dispatch({
        type: "STATE_USERS_IS_NOT_LOADING_OR_ERRORS",
      });
      dispatch(returnInfos("Fetch Error", 400));
    });
};

export const fetchUsersRole = () => (dispatch, getState) => {
  dispatch({
    type: "FETCHING_ROLE",
  });

  axios
    .get("http://141.136.47.177:4013/roles", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_ROLE",
        payload: data.data ? data.data.classroom : [],
      });
    })
    .catch((err) => {
      dispatch({
        type: "STATE_USERS_IS_NOT_LOADING_OR_ERRORS",
      });
      dispatch(returnInfos(err.response.data.message, 400));
    });
};

export const searchFilter = ({ nisornik, email, role, is_deleted }) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "FILTERING_DATA",
  });

  let quote = "?";

  const roleData = role ? `role=${role}` : "";

  const emailData = email
    ? role === ""
      ? `email=${email}`
      : `&email=${email}`
    : "";

  const nisData = nisornik
    ? email === "" && role === ""
      ? `nisornik=${nisornik}`
      : `&nisornik=${nisornik}`
    : "";

  const isDelete = is_deleted
    ? nisornik === "" && email === "" && role === ""
      ? `is_deleted=${is_deleted}`
      : `&is_deleted=${is_deleted}`
    : "";

  if (role === "" && email === "" && nisornik === "" && is_deleted === "")
    quote = "";

  axios
    .get(
      `http://141.136.47.177:4002/users${quote}${roleData}${emailData}${nisData}${isDelete}`,
      tokenConfig(getState)
    )
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCHED_USERS_DATA",
        payload: data.data ? data.data.users : [],
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

export const editUser = ({ ...values }, id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "USERS_REQUESTS",
  });

  const { password, passwordConfirm, is_deleted, fullname, role } = values;

  if (password !== passwordConfirm) {
    dispatch({
      type: "STATE_USERS_IS_NOT_LOADING_OR_ERRORS",
    });

    return onFailure("Password tidak sama");
  } else if (password === "" && passwordConfirm === "") {
    const body = JSON.stringify({ fullname, role, is_deleted });

    axios
      .put(
        `http://141.136.47.177:4002/users/${id}`,
        body,
        tokenConfig(getState)
      )
      .then(({ data }) => {
        dispatch({
          type: "SUCCESS_EDIT_USER_BY_ID",
        });
        onSuccess(data.message);
      })
      .then(() => dispatch(fetchUsersDataByID(id)))
      .catch((err) => {
        onSuccess("Gagal memperbarui data");

        dispatch({
          type: "STATE_USERS_IS_NOT_LOADING_OR_ERRORS",
        });
        dispatch(returnInfos(err.response.data.message, err.response.status));
      });
  } else {
    const body = JSON.stringify({ ...values });

    axios
      .put(
        `http://141.136.47.177:4002/users/${id}`,
        body,
        tokenConfig(getState)
      )
      .then(({ data }) => {
        dispatch({
          type: "SUCCESS_EDIT_USER_BY_ID",
        });
        onSuccess(data.message);
      })
      .then(() => dispatch(fetchUsersDataByID(id)))
      .catch((err) => {
        onSuccess("Gagal memperbarui data");

        dispatch({
          type: "STATE_USERS_IS_NOT_LOADING_OR_ERRORS",
        });
        dispatch(returnInfos(err.response.data.message, err.response.status));
      });
  }
};

export const clearFilteredData = () => (dispatch) => {
  dispatch({
    type: "CLEAR_FILTERED_DATA",
  });
};

export const fetchUsersDataByID = (id) => (dispatch, getState) => {
  dispatch({
    type: "USERS_REQUESTS",
  });

  axios
    .get(`http://141.136.47.177:4002/users/${id}`, tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_USERS_BY_ID",
        payload: data.data ? data.data.users : {},
      });
    })
    .catch((err) => {
      dispatch(
        returnInfos(
          err.response.data.message,
          err.response.status,
          "FETCH_USERS_BY_ID_FAILURE"
        )
      );
      dispatch({
        type: "STATE_USERS_IS_NOT_LOADING_OR_ERRORS",
      });
    });
};

export const postActiveUserByID = (id, onError, onSuccess) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "USERS_REQUESTS",
  });

  axios
    .post(`http://141.136.47.177:4002/users/${id}`, {}, tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "POST_USER_ACTIVE_BY_ID",
      });
      dispatch(returnInfos(data.message, 200, "POST_ACTIVE_SUCCESS"));
      onSuccess(data.message, "Berhasil");
    })
    .then(() => {
      dispatch(fetchUsersData());
    })
    .catch((err) => {
      dispatch({
        type: "STATE_USERS_IS_NOT_LOADING_OR_ERRORS",
      });
      dispatch(
        returnInfos(
          err.response.data.message,
          err.response.status,
          "POST_ACTIVE_FAILURE"
        )
      );
      onError(err.response.data.message, "Gagal");
    });
};

export const deleteUsersByID = (id, onError, onSuccess) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "USERS_REQUESTS",
  });

  axios
    .delete(`http://141.136.47.177:4002/users/${id}`, tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "USERS_NON_ACTIVE_BY_ID",
        payload: id,
      });
      dispatch(returnInfos(data.message, 200, "NONACTIVE_USER_SUCCESS"));
      onSuccess(data.message, "Berhasil");
    })
    .then(() => {
      dispatch(fetchUsersData());
    })
    .catch((err) => {
      dispatch({
        type: "STATE_USERS_IS_NOT_LOADING_OR_ERRORS",
      });
      dispatch(
        returnInfos(
          err.response.data.message,
          err.response.status,
          "DELETE_USER_FAILURE"
        )
      );
      onError(err.response.data.message, "Gagal");
    });
};
