export const postReducer = (state, action) => {
  switch (action.type) {
    case "ADD_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case "FETCH_POSTS":
      return {
        ...state,
        posts: action.payload,
      };

    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.post_id !== action.payload),
      };

    case "POST_SENDING":
      return {
        ...state,
        post_sending: true,
      };

    default:
      return state;
  }
};
