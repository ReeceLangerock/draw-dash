import 'whatwg-fetch';
var voteTimer = null;
var seconds = 5;

//'GAME' MANAGEMENT
//-------------------------------
export var setRoundCompleted = roundCompleted => {
  return {
    type: "SET_ROUND_COMPLETED",
    roundCompleted
  };
};

export var setRoundStarted = roundStarted => {
  return {
    type: "SET_ROUND_STARTED",
    roundStarted
  };
};

export var setVoteInProgress = voteInProgress => {
  if (voteInProgress === true) {
    startVoteTimer();
  }

  return {
    type: "SET_VOTE_IN_PROGRESS",
    voteInProgress
  };
};

//VOTE MANAGEMENT
//-------------------------------

export var startVoteTimer = () => {
  return dispatch => {
    dispatch(setVoteCompleted(false));
    clearInterval(voteTimer);
    seconds = 10;
    voteTimer = setInterval(() => {
      seconds--;
      dispatch({ type: "TICK", seconds });
      if (seconds <= 0) {
        clearInterval(voteTimer);
        dispatch(setVoteInProgress(false));
        dispatch(setVoteCompleted(true));
        dispatch(setRoundCompleted(false));
        dispatch(startVoteDisplay());
      }
    }, 1000);
  };
};

export var startVoteDisplay = () => {
  return dispatch => {
    dispatch(setVoteResult(true));
    clearInterval(voteTimer);
    seconds = 5;
    voteTimer = setInterval(() => {
      seconds--;
      dispatch({ type: "TICK", seconds });
      if (seconds <= 0) {
        clearInterval(voteTimer);
        dispatch(setVoteResult(false));
        dispatch(setVoteWinner(undefined))
      }
    }, 1000);
  };
};

export var setVoteCompleted = voteCompleted => {
  return { type: "VOTE_COMPLETED", voteCompleted };
};

export var setVoteResult = voteResult => {
  return { type: "SET_VOTE_RESULT", voteResult };
};

export var setVoteWinner = winner => {
  return {
    type: "SET_WINNER",
    winner
  };
};

//ROOM MANAGEMENT
//-------------------------------
export var getRooms = () => {
  return dispatch => {
    fetch("/api/lobby", { credentials: "include" })
      .then(response => response.json())
      .then(response => {
        dispatch(updateAvailableRooms(response));
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export var setAllUsersReady = allReady => {
  return {
    type: "ALL_READY",
    allReady
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
  return {
    type: "SET_IMAGE_PROMPT",
    prompt
  };
};
export var setImagePromptToSave = imagePromptToSave => {
  return {
    type: "SET_IMAGE_PROMPT_TO_SAVE",
    imagePromptToSave
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

export var saveCanvas = image => {
  return dispatch => {
    fetch("/api/gallery", {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(image)
    })
      .then(response => response.json())
      .then(response => {
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export var setCanvasToSave = canvasToSave => {

  return {
    type: "SET_CANVAS_TO_SAVE",
    canvasToSave
  };
};

export var setCanvasShouldClear = canvasShouldClear => {

  return {
    type: "SET_CANVAS_SHOULD_CLEAR",
    canvasShouldClear
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

export var updateLeaderboard = (user, points) => {
  return dispatch => {
    fetch("/api/leaderboard", {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: user, points: points })
    })
      .then(response => response.json())
      .then(response => {
        //if (response === "UPDATED") console.log(updated);
      })
      .catch(error => {
        console.error(error);
      });
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
