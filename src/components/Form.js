import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import { currencies, expenses } from '../actions';
import fetchAPI from '../services';

class Form extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.fromTableToForm = this.fromTableToForm.bind(this);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    this.handleCurrency();
  }

  // fromTableToForm() {
  //   const { filtered, editedExpense } = this.props;
  //   // console.log(filtered);

  //   this.setState({
  //     id: filtered.id,
  //     value: filtered.value,
  //     description: filtered.description,
  //     currency: filtered.currency,
  //     method: filtered.method,
  //     tag: filtered.tag,
  //   });
  // }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault(event);
    const { id, value, description, currency, method, tag } = this.state;
    const { userExpenses } = this.props;

    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: 0,
      description: '',
    }));

    const exchangeRates = await fetchAPI();
    userExpenses({
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

  async handleCurrency() {
    const { userCurrencies } = this.props;
    const response = await fetchAPI();
    const exchangeRates = Object.keys(response);

    const filteredCoins = exchangeRates.filter((coins) => (
      coins !== 'USDT'
    ));

    userCurrencies({
      currencies: filteredCoins,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { selectCurrencies, isEditing } = this.props;
    return (

      <form onSubmit={ (event) => this.handleSubmit(event) }>
        <Input
          labelName="Valor"
          dataTest="value-input"
          elementId="input-value"
          name="value"
          onInputChange={ this.handleChange }
          inputType="number"
          inputValue={ value }
        />

        <Input
          labelName="Despesa"
          dataTest="description-input"
          elementId="input-description"
          name="description"
          onInputChange={ this.handleChange }
          inputType="text"
          inputValue={ description }
        />

        <Select
          labelName="Moedas"
          dataTest="currency-input"
          elementId="input-currency"
          name="currency"
          onChange={ this.handleChange }
          inputValue={ currency }
        >
          {selectCurrencies.map((moeda) => (
            <option data-testid={ moeda } key={ moeda }>{moeda}</option>
          ))}
        </Select>

        <Select
          labelName="Metodo"
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
        {isEditing
          ? (
            <Button type="submit">
              Adicionar despesa
            </Button>
          ) : (
            <Button type="submit">
              Editar despesa
            </Button>
          )}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  selectCurrencies: state.wallet.currencies,
  filtered: state.wallet.filter,

});

const mapDispatchToProps = (dispatch) => ({
  userExpenses: (state) => dispatch(expenses(state)),
  userCurrencies: (state) => dispatch(currencies(state)),
});

Form.propTypes = {
  userExpenses: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.number,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  }),
}.isRequire;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
