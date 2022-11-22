const initialState = {
  teachers: [],
  genders: [],
  employee_status: [],
  marital_status: [],
  religions: [],
  ptk_types: [],
  teachers_by_id: {},
  isLoading: false,
};

export const teachersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TEACHERS_REQUESTS":
      return {
        ...state,
        isLoading: true,
      };

    case "TEACHERS_SUCCESSFULLY_FETCH_ALL_GENDERS":
      return {
        ...state,
        isLoading: false,
        genders: action.payload,
      };

    case "TEACHERS_SUCCESSFULLY_FETCH_ALL_EMPLOYEE_STATUS":
      return {
        ...state,
        isLoading: false,
        employee_status: action.payload,
      };

    case "TEACHERS_SUCCESSFULLY_FETCH_ALL_MARITAL_STATUS":
      return {
        ...state,
        isLoading: false,
        marital_status: action.payload,
      };

    case "TEACHERS_SUCCESSFULLY_FETCH_ALL_RELIGIONS":
      return {
        ...state,
        isLoading: false,
        religions: action.payload,
      };

    case "TEACHERS_SUCCESSFULLY_FETCH_ALL_PTK_TYPES":
      return {
        ...state,
        isLoading: false,
        ptk_types: action.payload,
      };

    case "SUCCESSFULLY_FETCH_ALL_TEACHERS":
      return {
        ...state,
        isLoading: false,
        teachers: action.payload,
      };

    case "SUCCESSFULLY_FETCH_TEACHERS_BY_ID":
      return {
        ...state,
        isLoading: false,
        teachers_by_id: action.payload,
      };

    case "SUCCESSFULLY_POST_TEACHERS":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_UPDATE_TEACHERS":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_UPDATE_PHOTO_TEACHERS":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_UPDATE_ACTIVE_TEACHERS":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_DELETE_TEACHERS":
      return {
        ...state,
        isLoading: false,
        teachers: state.teachers.filter((data) => data.id !== action.payload),
      };

    case "TEACHERS_STATE_IS_NOT_LOADING":
    case "TEACHERS_REQUESTS_FAILURE":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
