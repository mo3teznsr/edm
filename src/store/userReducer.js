import * as actionTypes from './actions';
export const initialState = null;

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
     
      return action.user;
    case actionTypes.LOGOUT:
      return null;
 
    default:
      return state;
  }
};

export default userReducer;
