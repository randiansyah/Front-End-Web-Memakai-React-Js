const initialState = {
  majors: [],
  isLoading: false,
};

export const majorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MAJORS_REQUESTS":
      return {
        ...state,
        isLoading: true,
      };

    case "SUCCESSFULLY_FETCH_ALL_MAJORS":
      return {
        ...state,
        isLoading: false,
        majors: action.payload,
      };

    case "SUCCESSFULLY_POST_MAJORS":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_UPDATE_MAJORS":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_UPDATE_ACTIVE_MAJORS":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_DELETE_MAJORS":
      return {
        ...state,
        isLoading: false,
        majors: state.majors.filter((data) => data.id !== action.payload),
      };

    case "MAJORS_STATE_IS_NOT_LOADING":
    case "MAJORS_REQUESTS_FAILURE":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
