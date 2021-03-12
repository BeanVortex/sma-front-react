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
      return { ...action.payload };
    case actionTypes.UPDATE_AUTH:
      return {
        ...state,
        accessToken: action.accessToken,
      };
    default:
      return state;
  }
};
export default reducer;