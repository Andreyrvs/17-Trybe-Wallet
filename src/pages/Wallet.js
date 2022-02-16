import React from 'react';
import Form from '../components/Form';
import Header from '../components/Header';

class Wallet extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value, type, checked } = target;

    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    }, () => this.handleValidation());
  }

  render() {
    return (
      <div>
        <Header
          dataTest="email-field"
        />
        <Form />
      </div>
    );
  }
}

export default Wallet;
