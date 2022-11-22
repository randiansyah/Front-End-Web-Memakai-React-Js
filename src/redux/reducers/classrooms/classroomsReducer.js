const initialState = {
  isLoading: false,
  classrooms: [],
  majors_data: [],
  classrooms_by_id: {},
};

export const classroomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLASSROOMS_REQUESTS":
      return {
        ...state,
        isLoading: true,
      };

    case "SUCCESSFULLY_FETCH_ALL_CLASSROOMS":
      return {
        ...state,
        isLoading: false,
        classrooms: action.payload.classrooms,
      };

    case "SUCCESSFULLY_FETCH_ALL_MAJORS_NAME":
      return {
        ...state,
        isLoading: false,
        majors_data: action.payload,
      };

    case "SUCCESSFULLY_FETCH_CLASSROOMS_BY_ID":
      return {
        ...state,
        isLoading: false,
        classrooms_by_id: action.payload,
      };

    case "SUCCESSFULLY_POST_CLASSROOMS":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_UPDATE_CLASSROOMS":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_DELETE_CLASSROOMS":
      return {
        ...state,
        isLoading: false,
      };

    case "CLASSROOMS_REQUESTS_FAILURE":
    case "CLASSROOMS_STATE_IS_NOT_LOADING":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
