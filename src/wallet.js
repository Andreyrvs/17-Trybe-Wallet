// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  USER_EXPENSES,
  DELETE_USER_EXPENSE,
  EDIT_USER_EXPENSE,
  CHANGE_FORMS,
  CURRENCIES_ARRAY,
} from './actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  filter: [],
  editForm: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expenses],
      filter: action.payload.filter,
    };
  case DELETE_USER_EXPENSE:
    return {
      ...state,
      expenses: [...action.payload.expenses],
      filter: action.payload.filter,
    };
  case CHANGE_FORMS:
    return {
      ...state,
      editForm: action.payload.editForm,
    };
  case EDIT_USER_EXPENSE:

    return {
      ...state,
      expenses: [...action.payload],
    };
  case CURRENCIES_ARRAY:
    console.log('Action currencies', action.payload);
    return {
      ...state,
      currencies: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
