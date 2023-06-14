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
    case "DELETE_POST":
      return {
        ...state,
        profilePosts: state.profilePosts.filter(
          (post) => post.p_id !== action.payload
        ),
      };

    default:
      return state;
  }
};
