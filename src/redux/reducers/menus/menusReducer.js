const initialState = {
  menus: [],
  isLoading: false,
  navbarData: [],
  options: [],
  tableCollapse: [],
};

export const menusReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MENUS_REQUESTS":
      return {
        ...state,
        isLoading: true,
      };

    case "SUCCESSFULLY_POST_MENUS":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_FETCH_SIDEBAR_ITEMS":
      return {
        ...state,
        isLoading: false,
        navbarData: action.payload,
      };

    case "SUCCESSFULLY_FETCH_TO_TABLE_COLLAPSE":
      return {
        ...state,
        isLoading: false,
        tableCollapse: action.payload,
      };

    case "SUCCESSFULLY_FETCH_ALL_MENUS":
      return {
        ...state,
        isLoading: false,
        menus: action.payload,
      };

    case "SUCCESSFULLY_UPDATE_MENUS":
      return {
        ...state,
        isLoading: false,
      };

    case "SUCCESSFULLY_DELETE_MENU":
      return {
        ...state,
        isLoading: false,
        rooms: state.menus.filter((data) => data.id !== action.payload),
      };

    case "SUCCESSFULLY_FETCH_OPTIONS":
      return {
        ...state,
        isLoading: false,
        options: action.payload,
      };

    case "MENUS_REQUESTS_FAILURE":
    case "MENUS_STATE_IS_NOT_LOADING":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
