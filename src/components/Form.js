import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Input from './Input';
import Select from './Select';
import Button from './Button';

class Form extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  handleSubmit(event) {
    event.preventDefault(event);
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form onSubmit={ (event) => this.handleSubmit(event) }>
        <Input
          labelName="Value"
          dataTest="value-input"
          elementId="input-value"
          name="value"
          onInputChange={ this.handleChange }
          inputType="text"
          value={ value }
        />

        <Input
          labelName="Despesa"
          dataTest="description-input"
          elementId="input-description"
          name="description"
          onInputChange={ this.handleChange }
          inputType="text"
          value={ description }
        />

        <Input
          labelName="Currency"
          dataTest="currency-input"
          elementId="input-currency"
          name="currency"
          onInputChange={ this.handleChange }
          inputType="text"
          value={ currency }
        />

        <Select
          labelName="Method"
          dataTest="method-input"
          elementId="input-method"
          name="method"
          onChange={ this.handleChange }
          value={ method }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </Select>

        <Select
          labelName="Tag"
          dataTest="tag-input"
          elementId="input-tag"
          name="tag"
          onChange={ this.handleChange }
          value={ tag }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </Select>

        <Button
          type="submit"
        >
          Adicionar despesa
        </Button>
      </form>
    );
  }
}

// Form.propType = {
// }.isRequire;

export default Form;
