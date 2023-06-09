export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
      };

    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
      };
    default:
      return state;
  }
};
