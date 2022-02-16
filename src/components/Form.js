import React, { Component } from 'react';
import Input from './Input';
import Button from './Button';

class Form extends Component {
  render() {
    return (
      <form onSubmit={ () => {} }>

        <Input
          dataTest="value-input"
          elementId="input-value"
          onInputChange={ this.handleChange }
        >
          Value:
          {' '}
        </Input>

        <Input
          dataTest="description-input"
          elementId="input-description"
          onInputChange={ this.handleChange }
        >
          Description:
          {' '}
        </Input>

        <Input
          dataTest="currency-input"
          elementId="input-currency"
          onInputChange={ this.handleChange }
        >
          Currency:
          {' '}
        </Input>

        <label htmlFor="input-method">
          Method:
          {' '}
          <select
            data-testid="method-input"
            id="input-method"
          >
            <option value="1">Dinheiro</option>
            <option value="2">Cartão de crédito</option>
            <option value="3">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="input-method">
          tag:
          {' '}
          <select
            data-testid="tag-input"
            id="input-tag"
          >
            <option value="1">Alimentação</option>
            <option value="2">Lazer</option>
            <option value="3">Trabalho</option>
            <option value="3">Transporte</option>
            <option value="3">Saúde</option>
          </select>
        </label>
        <Button
          btnType="submit"
          elementId="add-expenses"
        >
          Adicionar despesa
        </Button>
      </form>
    );
  }
}

export default Form;
