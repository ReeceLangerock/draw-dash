//import axios from 'axios'

export var addImagePrompts = prompts => {
  return {
    type: "ADD_IMAGE_PROMPTS",
    prompts
  };
};

export var startGetImagePrompts = () => {
  return (dispatch, getState) => {
    fetch("/api/image-prompts", { credentials: "include" })
      .then(response => response.json())
      .then(response => {
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
        dispatch(updateAvailableRooms(response));
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export var updateAvailableRooms = (rooms) => {
  return {
    type: "GET_ROOMS",
    rooms
  };
}

export var addUserToRoom = (room, user) => {
  return {
    type: 'ADD_USER_TO_ROOM',
    room,
    user
  }
}

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
        if(response !== false){
        dispatch(login(response));
      } else {
        //temporary error, add action for unauthenticated user later
        console.log('ERROR')
      }
      }).then(()=> {
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
