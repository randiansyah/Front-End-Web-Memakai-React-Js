const initialState = {
  isLoading: false,
  fetchingRole: false,
  filteringData: false,
  users: [],
  users_data_id: {},
  roles: [],
  data_filter: [],
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case "USERS_REQUESTS":
      return {
        ...state,
        isLoading: true,
      };

    case "FETCHING_ROLE":
      return {
        ...state,
        fetchingRole: true,
      };

    case "FILTERING_DATA":
      return {
        ...state,
        filteringData: true,
      };

    case "SEARCH_FILTER_FOUND":
      return {
        ...state,
        filteringData: false,
        data_filter: action.payload,
      };

    case "SEARCH_FILTER_NOT_FOUND":
      return {
        ...state,
        filteringData: false,
        data_filter: [],
      };

    case "SUCCESS_EDIT_USER_BY_ID":
      return {
        ...state,
        isLoading: false,
      };

    case "CLEAR_FILTERED_DATA":
      return {
        ...state,
        filteringData: false,
        data_filter: [],
      };

    case "SUCCESSFULLY_FETCHED_USERS_DATA":
      return {
        ...state,
        isLoading: false,
        filteringData: false,
        users: action.payload,
      };

    case "SUCCESSFULLY_FETCH_USERS_BY_ID":
      return {
        ...state,
        isLoading: false,
        users_data_id: action.payload,
      };

    case "SUCCESSFULLY_FETCH_ROLE":
      return {
        ...state,
        fetchingRole: false,
        roles: action.payload,
      };

    case "USERS_NON_ACTIVE_BY_ID":
      return {
        ...state,
        isLoading: false,
        users: state.users.filter((data) => data.id !== action.payload),
      };

    case "POST_USER_ACTIVE_BY_ID":
      return {
        ...state,
        isLoading: false,
      };

    case "STATE_USERS_IS_NOT_LOADING_OR_ERRORS":
      return {
        ...state,
        isLoading: false,
      };

    default: {
      return state;
    }
  }
};
