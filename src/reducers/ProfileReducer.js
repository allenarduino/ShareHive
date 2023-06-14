export const profileReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    case "FETCH_PROFILE_POSTS":
      return {
        ...state,
        profilePosts: action.payload,
      };
    case "FETCH_CURRENT_USER":
      return {
        ...state,
        currentUserDetails: action.payload,
      };

    default:
      return state;
  }
};
