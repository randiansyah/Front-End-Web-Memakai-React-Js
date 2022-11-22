const initialState = {
  curriculum: [],
  isLoading: false,
};

export const curriculumReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CURRICULUM_REQUEST":
      return {
        ...state,
        isLoading: true,
      };

    case "SUCCESSFULLY_FETCH_ALL_CURRICULUM_DATA":
      return {
        ...state,
        isLoading: false,
        curriculum: action.payload,
      };

    case "POST_CURRICULUM_SUCCESS":
      return {
        ...state,
        isLoading: false,
      };

    case "PUT_CURRICULUM_SUCCESS":
      return {
        ...state,
        isLoading: false,
      };

    case "PUT_ACTIVE_CURRICULUM_SUCCESS":
      return {
        ...state,
        isLoading: false,
      };

    case "DELETE_CURRICULUM_SUCCESS":
      return {
        ...state,
        isLoading: false,
        curriculum: state.curriculum.filter(
          (data) => data.id !== action.payload
        ),
      };

    case "CURRICULUM_STATE_IS_NOT_LOADING":
    case "CURRICULUM_REQUESTS_FAILURE":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
