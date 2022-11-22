const initialState = {
  roles: [],
  isLoading: false,
};

export const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ROLES_REQUESTS":
      return {
        ...state,
        isLoading: true,
      };

    case "SUCCESSFULLY_FETCH_ALL_ROLES":
      return {
        ...state,
        isLoading: false,
        roles: action.payload,
      };

    case "SUCCESSFULLY_POST_ROLES":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_UPDATE_ROLES":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_UPDATE_ACTIVE_ROLES":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_DELETE_ROLES":
      return {
        ...state,
        isLoading: false,
        roles: state.roles.filter((data) => data.id !== action.payload),
      };

    case "ROLES_STATE_IS_NOT_LOADING":
    case "ROLES_REQUESTS_FAILURE":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
