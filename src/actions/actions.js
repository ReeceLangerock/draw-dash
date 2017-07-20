//import axios from 'axios'

export var addImagePrompts = prompts => {
  return {
    type: "ADD_IMAGE_PROMPTS",
    prompts
  };
};

export var startGetImagePrompts = () => {
  return (dispatch, getState) => {
    fetch("/api/image-prompts", { credentials: "include" }).then(response => response.json()).then(response => {
      var imagePrompts = response["image-prompts"];
      dispatch(addImagePrompts(imagePrompts));
    });
  };
};

//ROOM MANAGEMENT
//-------------------------------
export var getRooms = () => {
  return dispatch => {
    fetch("/api/lobby", { credentials: "include" })
      .then(response => response.json())
      .then(response => {
        console.log("rooms in action", response);
        dispatch(updateAvailableRooms(response));
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export var updateAvailableRooms = rooms => {
  return {
    type: "GET_ROOMS",
    rooms
  };
};

export var updateRooms = rooms => {
  return {
    type: "UPDATE_ROOMS",
    rooms
  };
};

export var addUserToRoom = (room, user, canvasSeatNumber) => {
  return {
    type: "ADD_USER_TO_ROOM",
    room,
    user,
    canvasSeatNumber
  };
};

export var removeUserFromRoom = (room, user) => {
  return {
    type: "REMOVE_USER_FROM_ROOM"
  };
};

//USER MANAGEMENT
//-------------------------------

export var registerGuestAsWatcher = () => {
  var guestId = (Math.random() * 10000).toPrecision(4);
  var displayName = "Guest" + guestId;
  return {
    type: "ADD_GUEST_AS_WATCHER",
    displayName,
    guestId
  };
};

//IMAGE PROMPT MANAGEMENT
//-------------------------------

export var setImagePrompt = prompt => {
  console.log("action", prompt);
  return {
    type: "SET_IMAGE_PROMPT",
    prompt
  };
};

//GALLERY MANAGEMENT
//-------------------------------

export var getGalleryImages = () => {
  return dispatch => {
    fetch("/api/gallery", { credentials: "include" })
      .then(response => response.json())
      .then(response => {
        dispatch(setGalleryImages(response));
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export var setGalleryImages = images => {
  return {
    type: "SET_GALLERY_IMAGES",
    images
  };
};

//LEADERBOARD MANAGEMENT
//-------------------------------

export var getLeaderboard = () => {
  return dispatch => {
    fetch("/api/leaderboard", { credentials: "include" })
      .then(response => response.json())
      .then(response => {
        dispatch(setLeaderboard(response));
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export var setLeaderboard = leaderboard => {
  return {
    type: "SET_LEADERBOARD",
    leaderboard
  };
};

//AUTHENTICATION
//-------------------------------

export var isAuthenticating = isAuthenticating => {
  return {
    type: "IS_AUTHENTICATING",
    isAuthenticating
  };
};

export var sendAuthorizationCheck = () => {
  return dispatch => {
    dispatch(isAuthenticating(true));
    fetch("/api/authCheck", { credentials: "include", mode: "no-cors" })
      .then(response => {
        return response.json();
      })
      .then(response => {
        if (response !== false) {
          dispatch(login(response));
        } else {
          //temporary error, add action for unauthenticated user later
          console.log("ERROR");
        }
      })
      .then(() => {
        dispatch(isAuthenticating(false));
      });
  };
};

export var login = user => {
  return {
    type: "LOGIN",
    user
  };
};

export var logout = user => {
  return (dispatch, getState) => {
    fetch("/api/logout", { credentials: "include", mode: "no-cors" });
    return {
      type: "LOGOUT",
      user
    };
  };
};
