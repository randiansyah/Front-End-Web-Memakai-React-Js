export const auth = (
  state = {
    userRole: "admin",
    token: null,
    users: [],
    onRequest: false,
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_IN_PROGRESS":
      return {
        ...state,
        onRequest: true,
      };

    case "LOGIN_WITH_NIS": {
      return {
        ...state,
        onRequest: false,
        token: action.payload ? action.payload.jwtToken : null,
        users: action.payload,
      };
    }

    case "LOGIN_WITH_EMAIL": {
      return { ...state, values: action.payload };
    }
    case "LOGIN_WITH_FB": {
      return { ...state, values: action.payload };
    }
    case "LOGIN_WITH_TWITTER": {
      return { ...state, values: action.payload };
    }
    case "LOGIN_WITH_GOOGLE": {
      return { ...state, values: action.payload };
    }
    case "LOGIN_WITH_GITHUB": {
      return { ...state, values: action.payload };
    }
    case "LOGIN_WITH_JWT": {
      return { ...state, values: action.payload };
    }
    case "LOGOUT_WITH_JWT": {
      return { ...state, values: action.payload };
    }
    case "LOGOUT_WITH_NIS": {
      return { ...state, token: null, users: [] };
    }
    case "LOGOUT_WITH_FIREBASE": {
      return { ...state, values: action.payload };
    }
    case "CHANGE_ROLE": {
      return { ...state, userRole: action.userRole };
    }

    case "RESET_PASSWORD_SUCCESS":
    case "EMAIL_SUCCESSFULLY_SENT":
    case "RESET_PASSWORD_ERROR":
    case "VALIDATE_SUCCESS":
    case "VALIDATE_ERROR":
      return {
        ...state,
        onRequest: false,
      };

    case "SESSION_EXPIRED":
    case "FORGOT_PASSWORD_ERROR":
    case "LOGIN_ERROR":
      return {
        ...state,
        token: null,
        users: [],
        onRequest: false,
      };

    case "STATE_IS_NOT_LOADING":
      return {
        ...state,
        onRequest: false,
      };

    default: {
      return state;
    }
  }
};
