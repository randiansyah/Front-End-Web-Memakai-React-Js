export const infos = (
  state = { message: "", status: null, id: null },
  action
) => {
  switch (action.type) {
    case "GET_INFO":
      return {
        message: action.payload.message,
        status: action.payload.status,
        id: action.payload.id,
      };

    case "CLEAR_INFO":
      return {
        message: "",
        status: null,
        id: null,
      };

    default: {
      return state;
    }
  }
};
