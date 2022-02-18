import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from './Input';
import Button from './Button';
import { userExpenses } from '../actions';
import fetchAPI from '../services';

const METHOD_LIST = [
  { id: 1, name: 'Dinheiro' },
  { id: 2, name: 'Cartão de crédito' },
  { id: 3, name: 'Cartão de débito' },
];

const TAG_LIST = [
  { id: 1, name: 'Alimentação' },
  { id: 2, name: 'Lazer' },
  { id: 3, name: 'Trabalho' },
  { id: 4, name: 'Transporte' },
  { id: 5, name: 'Saúde' },
];

class Form extends Component {
  constructor() {
    super();

    this.handleExpenses = this.handleExpenses.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMethod = this.handleMethod.bind(this);
    this.handleTag = this.handleTag.bind(this);

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: '',
      method: 'Dinheiro',
      tag: 'Alimentação',

    };
  }

  handleChange({ target }) {
    const { name, value, type, checked } = target;

    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    });
  }

  handleMethod(event) {
    this.setState({ method: event });
  }

  handleTag(event) {
    this.setState({ tag: event });
  }

  async handleExpenses(event) {
    event.preventDefault(event);
    const { expensesForm } = this.props;
    const { id, value, description, currency, method, tag } = this.state;

    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));

    const exchangeRates = await fetchAPI();

    expensesForm({
      expenses: {
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      },
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form id="form-expenses" onSubmit={ (event) => this.handleExpenses(event) }>
        <fieldset>
          <Input
            dataTest="value-input"
            elementId="input-value"
            onInputChange={ this.handleChange }
            name="value"
            value={ value }
          >
            Value:
            {' '}
          </Input>

          <Input
            dataTest="description-input"
            elementId="input-description"
            onInputChange={ this.handleChange }
            name="description"
            value={ description }
          >
            Description:
            {' '}
          </Input>

          <Input
            dataTest="currency-input"
            elementId="input-currency"
            onInputChange={ this.handleChange }
            name="currency"
            value={ currency }
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
              name="method"
              value={ method }
              onChange={ (event) => this.handleMethod(event.target.value) }
            >
              {METHOD_LIST.map((methods) => (
                <option
                  key={ methods.id }
                  value={ methods.name }
                >
                  {methods.name}

                </option>
              ))}
            </select>
          </label>

          <label htmlFor="input-method">
            tag:
            {' '}
            <select
              data-testid="tag-input"
              id="input-tag"
              onChange={ (event) => this.handleTag(event.target.value) }
              value={ tag }
              name="tag"
            >
              {TAG_LIST.map((tags) => (
                <option
                  key={ tags.id }
                  value={ tags.name }
                >
                  {tags.name}

                </option>
              ))}
            </select>
          </label>
          <Button
            btnType="submit"
            elementId="add-expenses"
          >
            Adicionar despesa
          </Button>
        </fieldset>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  expensesForm: (state) => dispatch(userExpenses(state)),
});

Form.propTypes = {
  expensesForm: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.number,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  }),
}.isRequire;

export default connect(null, mapDispatchToProps)(Form);
