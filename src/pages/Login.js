import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import Button from '../components/Button';
import fetchAPI from '../services';
import userEmail from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault(event);
    const { email } = this.state;
    const { usersEmail } = this.props;

    usersEmail({ email });
    fetchAPI();
  }

  render() {
    const { email } = this.state;
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
          autoComplete="off"
        />

        <Button
          type="submit"
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
