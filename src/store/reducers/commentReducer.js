import * as actionTypes from "../actions/actionTypes";

const initialState = {
  posted: false,
  reloaded: false,
  received: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NEW_COMMENT:
      return {
        posted: action.posted,
        reloaded: action.reloaded,
        received: action.received
      };
    default:
      return state;
  }
};

export default reducer;
