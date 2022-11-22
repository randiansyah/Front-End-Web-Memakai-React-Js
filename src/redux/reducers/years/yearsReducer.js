const initialState = {
  years: [],
  isLoading: false,
};

export const yearsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "YEARS_REQUESTS":
      return {
        ...state,
        isLoading: true,
      };

    case "SUCCESSFULLY_FETCH_ALL_YEARS":
      return {
        ...state,
        isLoading: false,
        years: action.payload,
      };

    case "SUCCESSFULLY_POST_YEARS":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_UPDATE_YEARS":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_UPDATE_ACTIVE_YEARS":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_DELETE_YEARS":
      return {
        ...state,
        isLoading: false,
        years: state.years.filter((data) => data.id !== action.payload),
      };

    case "YEARS_STATE_IS_NOT_LOADING":
    case "YEARS_REQUESTS_FAILURE":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
