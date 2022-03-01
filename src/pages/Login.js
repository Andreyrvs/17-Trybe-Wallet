import React from 'react';
import fetchAPI from '../services';

class Login extends React.Component {
  render() {
    fetchAPI();
    return (
      <form onSubmit={ () => {} }>

        <label htmlFor="input-email">
          <input
            data-testid="email-input"
            id="input-email"
          />
        </label>

        <label htmlFor="input-password">
          <input
            data-testid="password-input"
            id="input-password"
          />
        </label>
        <button
          type="submit"
        >
          Entrar
        </button>
      </form>
    );
  }
}

export default Login;
