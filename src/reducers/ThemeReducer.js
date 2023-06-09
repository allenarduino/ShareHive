export const themeReducer = (state, action) => {
  switch (action.type) {
    case "DARK_MODE":
      return {
        ...state,
        is_dark: true,
        mainColor: "#1DA1F2",
        secondaryColor: " #E3405F",
        background: "#15202B",
        error: "#E0245E",
        foreground: "#192734",
        color: "#ffffff",
        typoSecondary: "#8899A6",
        mobileNavIcon: "#333",
        border: "#333"
      };
    case "LIGHT_MODE":
      return {
        ...state,
        is_dark: false,
        mainColor: "#1DA1F2",
        secondaryColor: "#E3405F",
        background: "#ffffff",
        error: "#E0245E",
        foreground: "#F5F8FA",
        color: "#14171A",
        typoSecondary: "#657786",
        border: "#3333"
      };
    default:
      return state;
  }
};
