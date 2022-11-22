const initialState = {
  isLoading: false,
  group: [],
};

export const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GROUP_REQUESTS":
      return {
        ...state,
        isLoading: true,
      };

    case "SUCCESSFULLY_FETCH_ALL_GROUP_DATA":
      return {
        ...state,
        isLoading: false,
        group: action.payload,
      };

    case "SUCCESSFULLY_POST_GROUP":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_UPDATED_GROUP":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_DELETED_GROUP":
      return {
        ...state,
        isLoading: false,
        group: state.group.filter((data) => data.id !== action.payload),
      };

    case "GROUP_STATE_IS_NOT_LOADING":
    case "GROUP_REQUESTS_FAILURE":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
