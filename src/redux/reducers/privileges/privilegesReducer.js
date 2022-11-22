const initialState = {
  isLoading: false,
  functions: [],
  role: [],
  role_by_id: {},
  menu: [],
  privileges: [],
  menuIsEmpty: [],
};

export const privillagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRIVILLAGES_REQUESTS":
      return {
        ...state,
        isLoading: true,
      };

    case "PRIVILLAGES_SUCCESSFULLY_GET_DATA":
      return {
        ...state,
        isLoading: false,
        privileges: action.payload,
      };

    case "GET_MENU_IS_EMPTY":
      return {
        ...state,
        isLoading: false,
        menuIsEmpty: [...state.menuIsEmpty, action.payload],
      };

    case "PRIVILLAGES_SUCCESSFULLY_GET_ROLE":
      return {
        ...state,
        isLoading: false,
        role: action.payload,
      };

    case "PRIVILLAGES_SUCCESSFULLY_GET_ROLE_BY_ID":
      return {
        ...state,
        isLoading: false,
        role_by_id: action.payload,
      };

    case "PRIVILLAGES_SUCCESSFULLY_GET_MENU":
      return {
        ...state,
        isLoading: false,
        menu: action.payload,
      };

    case "PRIVILLAGES_SUCCESSFULLY_GET_FUNCTIONS":
      return {
        ...state,
        isLoading: false,
        functions: action.payload,
      };

    case "PRIVILLAGES_SUCCESSFULLY_POST_DATA":
    case "PRIVILLAGES_SUCCESSFULLY_UPDATE_DATA":
      return {
        ...state,
        isLoading: false,
      };

    case "PRIVILLAGES_REQUESTS_FAILURE":
    case "PRIVILLAGES_STATE_IS_NOT_LOADING":
      return {
        ...state,
        isLoading: false,
      };

    case "RESET_STATE_ROLE_NAME":
      return {
        ...state,
        menuIsEmpty: [],
      };

    default:
      return state;
  }
};
