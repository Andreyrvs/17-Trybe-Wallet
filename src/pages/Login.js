import React from 'react';
import Input from '../components/Input';
import fetchAPI from '../services';

class Login extends React.Component {
  render() {
    fetchAPI();
    return (
      <form onSubmit={ () => {} }>

        <Input
          labelName="Email"
          dataTest="email-input"
          elementId="input-email"
        />

        <Input
          labelName="Senha"
          dataTest="password-input"
          elementId="input-password"
        />

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
