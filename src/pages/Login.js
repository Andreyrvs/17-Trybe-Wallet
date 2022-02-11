import React from 'react';
import Input from '../components/Input';

class Login extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={ () => {} }>
          <fieldset>
            <Input
              elementId="email"
              dataTest="email-input"
              handleChange={ () => {} }
            />
            <Input
              elementId="senha"
              dataTest="password-input"
              handleChange={ () => {} }
            />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Login;
