import * as actionTypes from "../actions/actionTypes";

const initialState = {
  id: null,
  username: "",
  email: "",
  profile: "",
  accessToken: "",
  refreshToken: "",
  authenticated: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH:
      return {
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        profile: action.payload.profile,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        authenticated: true,
      };
    case actionTypes.RESET_USER:
      return initialState;
    default:
      return state;
  }
};
export default reducer;
