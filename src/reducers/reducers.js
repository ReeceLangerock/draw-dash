const initialState = {
  displayName: "Guest",
  isAuthenticated: false,
  isAuthenticating: false,
  isGuest: false,
  UID: ""
};

export var imageReducer = (state = { prompt: "" }, action) => {
  switch (action.type) {
    case "SET_IMAGE_PROMPT":
      return { ...state, prompt: action.prompt };
    default:
      return state;
  }
};

export var galleryReducer = (state = { gallery: [] }, action) => {
  switch (action.type) {
    case "SET_GALLERY_IMAGES":
      return { ...state, gallery: action.images };
    default:
      return state;
  }
};

export var leaderboardReducer = (state = { leaderboard: [] }, action) => {
  switch (action.type) {
    case "SET_LEADERBOARD":
      return { ...state, leaderboard: action.leaderboard };
    default:
      return state;
  }
};

export var roomReducer = (state = { rooms: {}, currentUserRoom: -1, canvasSeatNumber: -1, allReady: false }, action) => {
  switch (action.type) {
    // might be needed depending on how users/rooms are managed
    case "ADD_USER_TO_ROOM":
      return { ...state, currentUserRoom: action.room, canvasSeatNumber: action.canvasSeatNumber };
    case "REMOVE_USER_FROM_ROOM":
      return { ...state, currentUserRoom: -1, canvasSeatNumber: -1 };
    case "GET_ROOMS":
      return { ...state, rooms: action.rooms };
    case "UPDATE_ROOMS":
      return { ...state, rooms: action.rooms };
    case "ALL_READY":
      return {...state, allReady: !state.allReady}
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
