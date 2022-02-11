// Coloque aqui suas actions
const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const SUBMIT_ACTION = 'SUBMIT_ACTION';

export const login = (payload) => ({ type: LOGIN_EMAIL, payload });

export const submit = (payload) => ({ type: SUBMIT_ACTION, payload });

export default LOGIN_EMAIL;
