import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userEmail } from '../actions';
import Button from '../components/Button';
import Input from '../components/Input';
import './Css/Login.css';

const PASSWORD_MIN_LIMIT = 6;
class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.hadleSubmit = this.hadleSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);

    this.state = {
      email: '',
      passwordValue: '',
      btnDisable: true,
    };
  }

  hadleSubmit(event) {
    event.preventDefault(event);
    const { email } = this.state;
    const { history, onSubmitForm } = this.props;
    onSubmitForm({
      email,
    });
    history.push('/carteira');
  }

  handleValidation() {
    const { passwordValue, email } = this.state;

    const regexEmail = /\w+@+\w+\.com/ig;
    const validateEmail = regexEmail.test(email);
    const validatePassword = passwordValue.length >= PASSWORD_MIN_LIMIT;

    if (validateEmail && validatePassword) {
      this.setState({
        btnDisable: false,
      });
    } else {
      this.setState({
        btnDisable: true,
      });
    }
  }

  handleChange({ target }) {
    const { name, value, type, checked } = target;

    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    }, () => this.handleValidation());
  }

  render() {
    const { email, passwordValue, btnDisable } = this.state;
    return (
      <div className="login">
        <form className="login__form" onSubmit={ (event) => this.hadleSubmit(event) }>
          <fieldset className="login__form-fieldset">
            <Input
              elementId="email"
              dataTest="email-input"
              onInputChange={ this.handleChange }
              value={ email }
              name="email"
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
              // handleClick={ () => {} }
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
  onSubmitForm: (state) => dispatch(userEmail(state)),
});

Login.propTypes = {
  onSubmitForm: PropTypes.object,
}.isRequire;

export default connect(null, mapDispatchToProps)(Login);
