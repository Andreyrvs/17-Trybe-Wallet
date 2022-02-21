import fetchAPI from './services';

export const USER_EMAIL = 'USER_EMAIL';
export const USER_EXPENSES = 'USER_EXPENSES';
export const DELETE_USER_EXPENSE = 'DELETE_USER_EXPENSE';
export const EDIT_USER_EXPENSE = 'EDIT_USER_EXPENSE';
export const SAVE_EDIT_EXPENSES = 'SAVE_EDIT_EXPENSES';
export function userEmail(payload) {
  return { type: USER_EMAIL, payload };
}

export function userExpenses(payload) {
  return { type: USER_EXPENSES, payload };
}

export function deleteUserExpense(payload) {
  return { type: DELETE_USER_EXPENSE, payload };
}

export function editUserExpense(payload) {
  return { type: EDIT_USER_EXPENSE, payload };
}

export function saveEditExpenses(payload) {
  return { type: SAVE_EDIT_EXPENSES, payload };
}

export function expensesThunk() {
  return async (dispatch) => {
    try {
      const API = await fetchAPI();
      dispatch(userExpenses(API));
    } catch (error) {
      console.log(error);
    }
  };
}

export default userEmail;
