export const returnInfos = (message, status, id = null) => {
  // redirect to unauthorized page.
  // if (status === 401 || status === 403) {
  //   window.location.href = "/unauthorized";
  // }

  return {
    type: "GET_INFO",
    payload: {
      message,
      status,
      id,
    },
  };
};

export const clearInfos = () => {
  return {
    type: "CLEAR_INFO",
  };
};
