const initialState = {
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  user: {}
};

export var imagePromptReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_IMAGE_PROMPTS":
      return [...state, ...action.prompts];
    default:
      return state;
  }
};

export var authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.user.user, isAuthenticated: true };
    case "IS_AUTHENTICATING":
      return { ...state, isAuthenticating: !action.isAuthenticating };
    default:
      return state;
  }
};
