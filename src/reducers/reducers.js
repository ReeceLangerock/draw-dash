const initialState = {
  displayName: "Guest",
  isAuthenticated: false,
  isAuthenticating: false,
  isGuest: false,
  UID: ""
};

export var imagePromptReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_IMAGE_PROMPTS":
      return [...state, ...action.prompts];
    default:
      return state;
  }
};

export var roomReducer = (
  state = { rooms: {}, currentUserRoom: -1, canvasSeatNumber: -1 },
  action
) => {
  switch (action.type) {
    // might be needed depending on how users/rooms are managed
    case "ADD_USER_TO_ROOM":
      return { ...state, currentUserRoom: action.room, canvasSeatNumber: action.canvasSeatNumber };
    case "REMOVE_USER_FROM_ROOM":
      return {...state, currentUserRoom: -1, canvasSeatNumber: -1};
    case "GET_ROOMS":
      return { ...state, rooms: action.rooms };
    case "UPDATE_ROOMS":
      return { ...state, rooms: action.rooms };
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
        UID: action.user.user.id,
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
    case "ADD_GUEST_AS_WATCHER":
      return {
        ...state,
        displayName: action.displayName,
        isAuthenticated: false,
        isAuthenticating: false,
        isGuest: true,
        UID: action.guestId
      };
    default:
      return state;
  }
};
