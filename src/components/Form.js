import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import { currencies, editedExpenses, expenses, updatedExpenses } from '../actions';
import fetchAPI from '../services';

class Form extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: [],
    };
  }

  componentDidMount() {
    this.handleCurrency();
    // this.updateState();
  }

  componentDidUpdate(prevProps) {
    const { formData } = this.props;
    console.log('formdata', formData);
    if (prevProps.formData.description !== formData.description) {
      this.updateState(formData);
    }
  }

  updateState = (formData) => {
    this.setState({
      id: formData.id,
      value: formData.value,
      description: formData.description,
      currency: formData.currency,
      method: formData.method,
      tag: formData.tag,
      exchangeRates: formData.exchangeRates,
    });
  }

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

  handleEdit(event) {
    event.preventDefault(event);
    const { expense, editedExpense, updatedExpense } = this.props;
    const { id, exchangeRates } = this.state;
    console.log('exchangeRates', exchangeRates);
    const splitBefore = expense.filter((item) => Number(item.id) < Number(id));
    const splitLater = expense.filter((item) => Number(item.id) > Number(id));

    const newExpenses = [...splitBefore, this.state, ...splitLater];

    updatedExpense(newExpenses);
    editedExpense({ isEditing: false });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { selectCurrencies, isEditing, test } = this.props;
    // console.log('value', value);
    // console.log('descriçao', description);
    return (

      <form onSubmit={ (event) => this.handleSubmit(event) }>
        <h1>{test}</h1>
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
          handleChange={ this.handleChange }
          inputValue={ currency }
        >
          {selectCurrencies.map((moeda) => (
            <option
              data-testid={ moeda }
              key={ moeda }
              value={ `${moeda}` }
            >
              {moeda}

            </option>
          ))}
        </Select>

        <Select
          labelName="Metodo"
          dataTest="method-input"
          elementId="input-method"
          name="method"
          handleChange={ this.handleChange }
          inputValue={ method }
        >
          <option value=" Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </Select>

        <Select
          labelName="Tag"
          dataTest="tag-input"
          elementId="input-tag"
          name="tag"
          handleChange={ this.handleChange }
          inputValue={ tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </Select>

        {!isEditing
          ? (
            <Button
              // handleClick={ (event) => this.handleSubmit(event) }
              type="submit"
              bsClass="btn btn-primary"
            >
              Adicionar despesa
            </Button>
          ) : (
            <Button
              handleClick={ () => {} }
              type="button"
              bsClass="btn btn-primary"
            >
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
  expense: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  userExpenses: (state) => dispatch(expenses(state)),
  userCurrencies: (state) => dispatch(currencies(state)),
  updatedExpense: (state) => dispatch(updatedExpenses(state)),
  editedExpense: (state) => dispatch(editedExpenses(state)),
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
