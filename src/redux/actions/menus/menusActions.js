import axios from "axios";
import { tokenConfig } from "../auth/loginActions";
import { returnInfos } from "../infos/infos";

export const postMenus = ({ ...values }, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "MENUS_REQUESTS",
  });

  axios
    .post(
      "http://141.136.47.177:4000/menu",
      { ...values },
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_POST_MENUS",
      });
      onSuccess("Berhasil menambahkan menu", "Sukses");
    })
    .then(() => {
      dispatch(fetchAllMenus());
      dispatch(fetchOptions());
      dispatch(fetchToTableCollapse());
    })
    .catch((err) => {
      onFailure("Gagal menambahkan menu", "Gagal");
      dispatch({
        type: "MENUS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const fetchSidebarMenu = () => (dispatch, getState) => {
  dispatch({
    type: "MENUS_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4000/menu/sidebar", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_SIDEBAR_ITEMS",
        payload: data.filter((data) => data.is_deleted !== 1),
      });
    })
    .catch((err) => {
      dispatch({
        type: "MENUS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const fetchAllMenus = () => (dispatch, getState) => {
  dispatch({
    type: "MENUS_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4000/menu", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_ALL_MENUS",
        payload: data.filter((data) => data.is_deleted !== 1),
      });
    })
    .catch((err) => {
      dispatch({
        type: "MENUS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const fetchToTableCollapse = () => (dispatch, getState) => {
  dispatch({
    type: "MENUS_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4000/menu/children", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_TO_TABLE_COLLAPSE",
        payload: data.filter((data) => data.is_deleted !== 1),
      });
    })
    .catch((err) => {
      dispatch({
        type: "MENUS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const updateMenu = (id, { ...values }, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "MENUS_REQUESTS",
  });

  axios
    .put(
      `http://141.136.47.177:4000/menu/${id}`,
      { ...values },
      tokenConfig(getState)
    )
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_UPDATE_MENUS",
      });
      onSuccess("Berhasil memperbarui menu", "Sukses");
    })
    .then(() => {
      dispatch(fetchAllMenus());
      dispatch(fetchSidebarMenu());
      dispatch(fetchOptions());
      dispatch(fetchToTableCollapse());
    })
    .catch((err) => {
      onFailure("Gagal memperbarui menu", "Gagal");

      dispatch({
        type: "MENUS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const deleteMenu = (id, onSuccess, onFailure) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "MENUS_REQUESTS",
  });

  axios
    .delete(`http://141.136.47.177:4000/menu/${id}`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: "SUCCESSFULLY_DELETE_MENU",
        payload: id,
      });

      onSuccess("Berhasil menghapus menu", "Sukses");
    })
    .then(() => {
      dispatch(fetchAllMenus());
      dispatch(fetchSidebarMenu());
      dispatch(fetchOptions());
      dispatch(fetchToTableCollapse());
    })
    .catch((err) => {
      onFailure("Gagal menghapus menu", "Gagal");

      dispatch({
        type: "MENUS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};

export const fetchOptions = () => (dispatch, getState) => {
  dispatch({
    type: "MENUS_REQUESTS",
  });

  axios
    .get("http://141.136.47.177:4000/selectOption", tokenConfig(getState))
    .then(({ data }) => {
      dispatch({
        type: "SUCCESSFULLY_FETCH_OPTIONS",
        payload: data.data ? data.data.menu : [],
      });
    })
    .catch((err) => {
      dispatch({
        type: "MENUS_REQUESTS_FAILURE",
      });

      dispatch(returnInfos(err.response.data.message, err.response.status));
    });
};
