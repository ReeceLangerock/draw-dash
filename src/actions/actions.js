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
  console.log('get rooms');
  return dispatch => {
    fetch("/api/lobby", { credentials: "include" })
      .then(response => response.json())
      .then(response => {
        return response
      })
      .catch(error => {
        console.error(error);
      });
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

// export var startLogin = () => {
//   return dispatch => {
//     dispatch(isAuthenticating(true));
//     fetch("/api/authCheck", { credentials: "include", mode: 'no-cors' })
//       .then(response => {
//         return response.json();
//       })
//       .then(response => {
//         dispatch(login(response));
//       })
//       .then(response => {
//         dispatch(isAuthenticating(false));
//       });
//   };
// };

export var startLogin = () => {
  return dispatch => {
    dispatch(isAuthenticating(true));
    fetch("/api/authenticate", { credentials: "include", mode: 'no-cors' })
      .then(response => {
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
