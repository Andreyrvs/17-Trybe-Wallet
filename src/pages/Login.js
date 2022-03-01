import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <form onSubmit={ () => {} }>

        <label htmlFor="input-email">
          <input
            data-testid="email-input"
            id="input-email"
          />
          <button
            type="submit"
          >
            Entrar
          </button>
        </label>
      </form>
    );
  }
}

export default Login;
