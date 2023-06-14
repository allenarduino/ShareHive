export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        userID: action.payload,
        loading: false,
      };

    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        //userID: null,
        loading: false,
      };
    default:
      return state;
  }
};
