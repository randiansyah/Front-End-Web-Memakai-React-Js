const initialState = {
  isLoading: false,
  data: [],
  nis: null,
};

export const register = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_REQUESTS":
      return {
        ...state,
        isLoading: true,
      };

    case "CHECK_NIS":
      return {
        ...state,
        isLoading: false,
        nis: action.payload.nis,
        data: action.payload.data,
      };

    case "REGISTER_SUCCESS":
      return {
        ...state,
        isLoading: false,
      };

    case "VERIFICATION_EMAIL_SUCCESS":
      return {
        ...state,
        isLoading: false,
      };

    case "REGISTER_STATE_IS_NOT_LOADING_OR_ERRORS":
      return { ...state, isLoading: false };

    case "CLEAR_REGISTER_DATA":
      return {
        ...state,
        isLoading: false,
        nis: null,
        data: [],
      };

    default: {
      return state;
    }
  }
};
