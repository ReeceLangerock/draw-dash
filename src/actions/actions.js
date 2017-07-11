export var addImagePrompts = prompts => {
  return {
    type: "ADD_IMAGE_PROMPTS",
    prompts
  };
};

export var startGetImagePrompts = () => {
  return (dispatch, getState) => {
    console.log("action");
    /*fetch("/api/image-prompts", { credentials: "include" })
      .then(response => response.json())
      .then(response => {
        var imagePrompts = response["image-prompts"];
        dispatch(addImagePrompts(imagePrompts));
      });*/
    dispatch(addImagePrompts(["test", "test2"]));
  };
};

//AUTHENTICATION
//-------------------------------

export var isAuthenticating= (isAuthenticating) =>{
  return {
    type: "IS_AUTHENTICATING",
    isAuthenticating
  };
}

export var startLogin = () => {
  return (dispatch) => {
    dispatch(isAuthenticating(true));
    dispatch(login({user: 'test'}))
    dispatch(isAuthenticating(false));

    /*fetch("/api/authCheck", { credentials: "include" })
      .then((response) => {
        dispatch(isAuthenticating(false))
          return response.json()})

      .then(response => {
        dispatch(login(response));
      });*/
  };
};

export var login = user => {
  return {
    type: "LOGIN",
    user
  };
};
