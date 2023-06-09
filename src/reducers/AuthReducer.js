export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload,
        loading: false,
      };

    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        loading: false,
      };
    default:
      return state;
  }
};
