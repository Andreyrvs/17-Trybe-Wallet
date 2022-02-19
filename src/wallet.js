// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { USER_EXPENSES } from './actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  filter: [],
  sumExpenses: [0],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expenses],
      filter: action.payload.filter,
      sumExpenses: [...state.sumExpenses, action.payload.sumExpenses],
    };
  default:
    return state;
  }
};

export default wallet;
