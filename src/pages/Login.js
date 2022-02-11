import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../Actions';
import Button from '../components/Button';
import Input from '../components/Input';
import './Css/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      emailValue: '',
      passwordValue: '',
      btnDisable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  onSubmit(event) {
    event.preventDefault(event);
    const { emailValue } = this.state;
    const { history, onSubmitForm } = this.props;
    onSubmitForm({
      email: emailValue,
    });

    history.push('/carteira');
  }

  handleValidation() {
    const { passwordValue } = this.state;
    const PASSWORD_MIN_LIMIT = 6;
    const validatePassword = passwordValue.length <= PASSWORD_MIN_LIMIT;

    this.setState({
      btnDisable: validatePassword,
    });
  }

  handleChange({ target }) {
    const { name, value, type, checked } = target;

    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    }, () => this.handleValidation());
  }

  render() {
    const { emailValue, passwordValue, btnDisable } = this.state;
    return (
      <div className="login">
        <form className="login__form" onSubmit={ (event) => this.onSubmit(event) }>
          <fieldset className="login__form-fieldset">
            <Input
              elementId="email"
              dataTest="email-input"
              onInputChange={ this.handleChange }
              value={ emailValue }
              name="emailValue"
              inputType="email"
            >
              Email
            </Input>
            <Input
              elementId="senha"
              dataTest="password-input"
              onInputChange={ this.handleChange }
              inputType="password"
              value={ passwordValue }
              name="passwordValue"
            >
              Senha
            </Input>
            <Button
              elementId="button"
              btnType="submit"
              isDisable={ btnDisable }
              handleClick={ this.onSubmit }
            >
              Entrar
            </Button>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSubmitForm: (state) => dispatch(login(state)),
});

Login.propTypes = {
  onSubmitForm: PropTypes.func,
}.isRequire;

export default connect(null, mapDispatchToProps)(Login);
