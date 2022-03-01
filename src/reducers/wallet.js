import {
  CURRENCIES,
  DELETE_EXPENSES,
  EXPENSES,
  EDITED_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editedExpenses: false,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EXPENSES:
    console.log('action', action.payload);
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expenses],
    };
  case CURRENCIES:
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: [...action.payload.expenses],
    };
  case EDITED_EXPENSES:
    return {
      ...state,
      // expenses: [...action.payload],
      editedExpenses: action.payload.editedExpenses,
    };
  default:
    return state;
  }
}

export default wallet;
