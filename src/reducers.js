import { combineReducers } from 'redux';
import { LOGIN } from './constants';

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

    default: {
      return state;
    }
  }
}

export default combineReducers({
  session: loginReducer,
});