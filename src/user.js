// Esse reducer será responsável por tratar as informações da pessoa usuária
import LOGIN_EMAIL from './Actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

const loginForm = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_EMAIL:
    return {
      ...state,
      user: {
        email: action.payload.email,
      },
    };
  default:
    return state;
  }
};

export default loginForm;
