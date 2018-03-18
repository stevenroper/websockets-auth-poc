import { combineReducers } from 'redux';
import { LOGIN, LOGOUT } from './constants';

const initialState = {
  token: '',
  isValid: false,
  errors: '',
};

function loginReducer(state = initialState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case LOGIN: {
      if (action.payload.status === 200) {
        newState.isValid = true;
        newState.errors = '';
        newState.token = 'faketoken';
      }
      else {
        newState.errors = action.payload.statusText;
      }

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