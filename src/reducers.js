import { combineReducers } from 'redux';
import { LOGIN, LOGOUT } from './constants';

const initialState = {
  token: '',
  isValid: false,
};

function loginReducer(state = initialState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case LOGIN: {
      newState.isValid = true;
      return newState;
    }

    case LOGOUT: {
      newState.token = '';
      newState.isValid = false;
      return newState;
    }

    default: {
      return state;
    }
  }
}

export default combineReducers({
  session: loginReducer,
});