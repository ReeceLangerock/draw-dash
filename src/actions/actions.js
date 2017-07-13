import axios from 'axios'

export var addImagePrompts = prompts => {
  return {
    type: "ADD_IMAGE_PROMPTS",
    prompts
  };
};

export var startGetImagePrompts = () => {
  return (dispatch, getState) => {
    console.log("action");
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
  console.log("get rooms");
  return dispatch => {
    fetch("/api/lobby", { credentials: "include" })
      .then(response => response.json())
      .then(response => {
        return response;
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
    fetch("/api/authCheck", { credentials: "include", mode: "no-cors" })
      .then(response => {
        return response.json();
      })
      .then(response => {
        dispatch(login(response));
      });
  };
};

export var sendSlackAuthenticationRequest = () => {
  return (dispatch, getState) => {
    axios.get('/api/authenticate').then(response => console.log(response));
    // fetch("/api/authenticate", { credentials: "include", mode: "no-cors" })
    //   .then(response => {
    //     console.log(response);
    //     return response.json();
    //   })
    //   .then(response => {
    //     console.log(response);
    //   });
  };
};

export var startLoginProcess = () => {
  return dispatch => {
    dispatch(isAuthenticating(true));
    dispatch(sendSlackAuthenticationRequest());
    //dispatch(sendAuthorizationCheck());
    dispatch(isAuthenticating(false));
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
