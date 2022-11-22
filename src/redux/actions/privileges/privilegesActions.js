import axios from "axios";
import { tokenConfig } from "../auth/loginActions";
import { returnInfos } from "../infos/infos";
import { fetchSidebarMenu } from "../menus/menusActions";

export const fetchPrivillagesRole = () => (dispatch, getState) => {
  dispatch({
    type: "PRIVILLAGES_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4013/roles", tokenConfig(getState))
    .then(({ data }) => {
      const fixed = data.data ? data.data.classroom : [];
      dispatch({
        type: "PRIVILLAGES_SUCCESSFULLY_GET_ROLE",
        payload: fixed,
      });

      return fixed;
    })
    .then((data) => {
      data.map((d) => dispatch(fetchPrivilegesData(d.name)));
    })
    .catch((err) => {
      dispatch({
        type: "PRIVILLAGES_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const fetchPrivillagesDataByRole = (id) => (dispatch, getState) => {
  dispatch({
    type: "PRIVILLAGES_REQUESTS",
  });

  axios
    .get(
      `http://141.136.47.177:4005/privilleges/roles/${id}`,
      tokenConfig(getState)
    )
    .then(({ data }) => {
      dispatch({
        type: "PRIVILLAGES_SUCCESSFULLY_GET_ROLE_BY_ID",
        payload: data,
      });

      return data;
    })
    .then((data) => dispatch(fetchPrivilegesData(data.name)))
    .catch((err) => {
      dispatch({
        type: "PRIVILLAGES_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const fetchPrivillagesMenu = () => (dispatch, getState) => {
  dispatch({
    type: "PRIVILLAGES_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4000/menu/function", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "PRIVILLAGES_SUCCESSFULLY_GET_MENU",
        payload: data ? data.data : [],
      });
    })
    .catch((err) => {
      dispatch({
        type: "PRIVILLAGES_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const fetchPrivillagesFunctions = () => (dispatch, getState) => {
  dispatch({
    type: "PRIVILLAGES_REQUESTS",
  });

  axios
    .get(
      "http://141.136.47.177:4005/privilleges/functions",
      tokenConfig(getState)
    )
    .then(({ data }) => {
      dispatch({
        type: "PRIVILLAGES_SUCCESSFULLY_GET_FUNCTIONS",
        payload: data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "PRIVILLAGES_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const fetchPrivilegesData = (params) => (dispatch, getState) => {
  dispatch({
    type: "PRIVILLAGES_REQUESTS",
  });

  axios
    .get(
      `http://141.136.47.177:4005/privilleges?role=${params}`,
      tokenConfig(getState)
    )
    .then(({ data }) => {
      dispatch({
        type: "PRIVILLAGES_SUCCESSFULLY_GET_DATA",
        payload: data.data,
      });

      if (data.data.length > 0) {
        dispatch({
          type: "GET_MENU_IS_EMPTY",
          payload: params,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: "PRIVILLAGES_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const postPrivileges = (
  { ...values },
  onSuccess,
  onFailure,
  redirect
) => (dispatch, getState) => {
  dispatch({
    type: "PRIVILLAGES_REQUESTS",
  });

  axios
    .post(
      "http://141.136.47.177:4005/privilleges",
      { ...values },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "PRIVILLAGES_SUCCESSFULLY_POST_DATA",
      });

      onSuccess("Berhasil menambahkan data", "Sukses");
      redirect();
    })
    .then(() => {
      dispatch(fetchSidebarMenu());
    })
    .catch((err) => {
      onFailure("Gagal menambahkan data", "Gagal");
      dispatch({
        type: "PRIVILLAGES_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const updatePrivillages = ({ ...values }, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "PRIVILLAGES_REQUESTS",
  });

  const { function_id } = values;

  const tempArr = [];

  function_id.map((data) => {
    return tempArr.push(typeof data === "number" ? data.toString() : data);
  });

  axios
    .put(
      `http://141.136.47.177:4005/privilleges/${values.menu_id}`,
      { ...values, function_id: tempArr },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "PRIVILLAGES_SUCCESSFULLY_UPDATE_DATA",
      });
      onSuccess("Berhasil memperbarui data", "Sukses");
    })
    .then(() => {
      dispatch(fetchPrivilegesData(values.role));
      dispatch(fetchSidebarMenu());
    })
    .catch((err) => {
      onFailure("Gagal memperbarui data", "Gagal");
      dispatch({
        type: "PRIVILLAGES_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const resetRoleName = () => {
  return {
    type: "RESET_STATE_ROLE_NAME",
  };
};
