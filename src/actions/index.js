import fetchAPI from '../services';

export const USER_EMAIL = 'USER_EMAIL';
export const EXPENSES = 'EXPENSES';
export const CURRENCIES = 'CURRENCIES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

export function userEmail(payload) {
  return { type: USER_EMAIL, payload };
}

export function expenses(payload) {
  return { type: EXPENSES, payload };
}

export function currencies(payload) {
  return { type: CURRENCIES, payload };
}

export function deleteExpenses(payload) {
  return { type: DELETE_EXPENSES, payload };
}

function expensesThunk() {
  return async (dispatch) => {
    try {
      const request = await fetchAPI();
      dispatch(expenses(request));
    } catch (error) {
      console.log(error);
    }
  };
}

export default expensesThunk;
