import fetchAPI from './services';

export const USER_EMAIL = 'USER_EMAIL';
export const USER_EXPENSES = 'USER_EXPENSES';

export function userEmail(payload) {
  return { type: USER_EMAIL, payload };
}

export function userExpenses(payload) {
  return { type: USER_EXPENSES, payload };
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
