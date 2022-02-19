// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { USER_EXPENSES } from './actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  filter: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expenses],
      filter: action.payload.filter,
    };
  default:
    return state;
  }
};

export default wallet;
