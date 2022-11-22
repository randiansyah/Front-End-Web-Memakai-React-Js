const initialState = {
  stages: [],
  isLoading: false,
};

export const stagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STAGES_REQUESTS":
      return {
        ...state,
        isLoading: true,
      };

    case "SUCCESSFULLY_FETCH_ALL_STAGES":
      return {
        ...state,
        isLoading: false,
        stages: action.payload,
      };

    case "SUCCESSFULLY_POST_STAGES":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_UPDATE_STAGES":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_UPDATE_ACTIVE_STAGES":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_DELETE_STAGES":
      return {
        ...state,
        isLoading: false,
        stages: state.stages.filter((data) => data.id !== action.payload),
      };

    case "STAGES_STATE_IS_NOT_LOADING":
    case "STAGES_REQUESTS_FAILURE":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
