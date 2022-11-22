const initialState = {
  course: [],
  course_by_id: {},
  isLoading: false,
  isSearching: false,
};

export const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "COURSE_REQUESTS":
      return {
        ...state,
        isLoading: true,
      };

    case "FILTERING_COURSE_DATA":
      return {
        ...state,
        isSearching: true,
      };

    case "SUCCESSFULLY_FETCH_ALL_COURSE_BY_ID":
      return {
        ...state,
        isLoading: false,
        course_by_id: action.payload,
      };

    case "SUCCESSFULLY_FILTERING_COURSE_DATA":
      return {
        ...state,
        isSearching: false,
        course: action.payload,
      };

    case "SUCCESSFULLY_FETCH_ALL_COURSE":
      return {
        ...state,
        isLoading: false,
        course: action.payload,
      };

    case "SUCCESSFULLY_POST_COURSE":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_UPDATE_COURSE":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_UPDATE_ACTIVE_COURSE":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_DELETE_COURSE":
      return {
        ...state,
        isLoading: false,
        course: state.course.filter((data) => data.id !== action.payload),
      };

    case "COURSE_STATE_IS_NOT_LOADING":
    case "COURSE_REQUESTS_FAILURE":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
