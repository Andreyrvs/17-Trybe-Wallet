import { CURRENCIES, EXPENSES } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expenses],
    };
  case CURRENCIES:
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  default:
    return state;
  }
}

export default wallet;
