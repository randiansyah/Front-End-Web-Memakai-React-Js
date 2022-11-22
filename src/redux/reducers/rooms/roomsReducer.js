const initialState = {
  isLoading: false,
  rooms: [],
  rooms_obj: [],
};

export const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ROOMS_REQUESTS":
      return {
        ...state,
        isLoading: true,
      };

    case "SUCCESSFULLY_FETCHING_ALL_ROOMS":
      return {
        ...state,
        isLoading: false,
        rooms: action.payload,
      };

    case "SUCCESSFULLY_POST_ROOMS":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_FETCHING_ROOMS_BY_ID":
      return {
        ...state,
        isLoading: false,
        rooms_obj: action.payload,
      };

    case "SUCCESSFULLY_UPDATE_ROOMS_BY_ID":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_DELETE_ROOMS_BY_ID":
      return {
        ...state,
        isLoading: false,
        rooms: state.rooms.filter((data) => data.id !== action.payload),
      };

    case "ROOMS_REQUESTS_FAILURE":
    case "ROOMS_STATE_IS_NOT_LOADING":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
