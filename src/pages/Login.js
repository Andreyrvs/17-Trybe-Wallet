import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import Button from '../components/Button';
import fetchAPI from '../services';
import userEmail from '../actions';

const PASSWORD_LIMIT = 6;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);

    this.state = {
      email: '',
      isDisable: true,
      password: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.handleValidation());
  }

  handleSubmit(event) {
    event.preventDefault(event);
    const { email } = this.state;
    const { usersEmail, history } = this.props;

    usersEmail({ email });
    history.push('/carteira');

    fetchAPI();
  }

  handleValidation() {
    const { email, password } = this.state;
    const regexEmail = /\w+@+\w+\.com/ig;
    const validateEmail = regexEmail.test(email);
    const validatePassword = password.length >= PASSWORD_LIMIT;

    if (validateEmail && validatePassword) {
      this.setState({
        isDisable: false,
      });
    } else {
      this.setState({ isDisable: true });
    }
  }

  render() {
    const { email, isDisable, password } = this.state;
    return (
      <form onSubmit={ (event) => this.handleSubmit(event) }>

        <Input
          labelName="Email"
          dataTest="email-input"
          elementId="input-email"
          inputType="email"
          name="email"
          value={ email }
          onInputChange={ this.handleChange }
        />

        <Input
          labelName="Senha"
          dataTest="password-input"
          elementId="input-password"
          inputType="password"
          name="password"
          value={ password }
          onInputChange={ this.handleChange }
          autoComplete="off"
        />

        <Button
          type="submit"
          elementId="btn-login"
          isDisable={ isDisable }
        >
          Entrar
        </Button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  usersEmail: (state) => dispatch(userEmail(state)),
});

Login.propTypes = {
  usersEmail: PropTypes.objectOf(PropTypes.string),
}.isRequire;

export default connect(null, mapDispatchToProps)(Login);
