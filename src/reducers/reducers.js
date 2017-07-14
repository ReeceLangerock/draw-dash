const initialState = {
  displayName: "Guest",
  isAuthenticated: false,
  isAuthenticating: false,
  slackUID: ""
};

export var imagePromptReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_IMAGE_PROMPTS":
      return [...state, ...action.prompts];
    default:
      return state;
  }
};

export var roomReducer = (state = { rooms: {} }, action) => {
  switch (action.type) {
    case "ADD_USER_TO_ROOM":
      return {...state, rooms: action.user.displayName};
    case "LEAVE_ROOM":
      return state;
    case "GET_ROOMS":
      console.log(action)
      return {...state, rooms: action.rooms};
    default:
      return state;
  }
};

export var authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        displayName: action.user.displayName,
        slackUID: action.user.user.id,
        isAuthenticated: true
      };
      case "LOGOUT":
        return {
          ...state,
          displayName: "Guest",
          //slackUID: action.user.user.id,
          isAuthenticated: false
        };
    case "IS_AUTHENTICATING":
      return { ...state, isAuthenticating: action.isAuthenticating };
    default:
      return state;
  }
};
