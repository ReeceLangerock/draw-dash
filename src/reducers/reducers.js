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

export var roomReducer = (state = { rooms: {}, currentUserRoom: -1 }, action) => {
  switch (action.type) {
    // might be needed depending on how users/rooms are managed
    case "ADD_USER_TO_ROOM":
      return {...state, currentUserRoom: action.room};
    case "LEAVE_ROOM":
      return state;
    case "GET_ROOMS":
      return {...state, rooms: action.rooms};
      case "UPDATE_ROOMS":
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
