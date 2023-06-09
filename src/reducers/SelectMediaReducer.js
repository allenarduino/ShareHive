export const selectmediaReducer = (state, action) => {
  switch (action.type) {
    case "SELECTED":
      return {
        ...state,
        mediaPreview: action.payload1,
        post_media: action.payload2
      };
    case "CANCELLED":
      return {
        ...state,
        mediaPreview: null,
        post_media: null
      };

    default:
      return state;
  }
};
