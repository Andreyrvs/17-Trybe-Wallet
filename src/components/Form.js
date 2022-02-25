import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userExpenses } from '../actions';
import Input from './Input';
import Button from './Button';
import fetchAPI from '../services';
import METHOD_LIST, { TAG_LIST } from '../data';

class Form extends Component {
  constructor() {
    super();

    this.handleExpenses = this.handleExpenses.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCurrency = this.handleCurrency.bind(this);

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      coin: '',
    };
  }

  componentDidMount() {
    this.handleCurrency();
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  async handleExpenses(event) {
    event.preventDefault(event);
    const { expensesForm } = this.props;
    const { id, value, description, currency, method, tag } = this.state;

    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: 0,
      description: '',
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

  async handleCurrency() {
    const responseAPI = await fetchAPI();
    const arrayCoin = Object.keys(responseAPI);

    const filteredCoin = arrayCoin.filter((coin) => coin !== 'USDT');
    this.setState({
      coin: filteredCoin,
    });
  }

  render() {
    const { value, description, currency, method, tag, coin } = this.state;
    const { editForm } = this.props;

    return (
      <div>
        {!editForm
        && (
          <form
            className="m-2"
            id="form-expenses"
            onSubmit={ (event) => this.handleExpenses(event) }
          >
            <fieldset>
              <Input
                classBS="form-control"
                dataTest="value-input"
                elementId="input-value"
                onInputChange={ this.handleChange }
                name="value"
                value={ value }
              >
                Valor:
                {' '}
              </Input>

              <label htmlFor="select-currency" className="m-1">
                Moeda:
                {' '}
                <select
                  className="form-select"
                  data-testid="currency-input"
                  id="select-currency"
                  onChange={ this.handleChange }
                  name="currency"
                  value={ currency }
                >
                  { coin.length > 0
                && coin.map((currencies) => (
                  <option key={ currencies } data-testid={ currencies }>
                    {currencies}
                  </option>
                ))}
                </select>
              </label>

              <label htmlFor="input-method" className="m-1">
                Método de pegamento:
                {' '}
                <select
                  className="form-select"
                  data-testid="method-input"
                  id="input-method"
                  name="method"
                  value={ method }
                  onChange={ this.handleChange }
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

              <label htmlFor="input-tag" className="m-1">
                Tag:
                {' '}
                <select
                  className="form-select"
                  data-testid="tag-input"
                  id="input-tag"
                  onChange={ this.handleChange }
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

              <Input
                classBS="form-control"
                dataTest="description-input"
                elementId="input-description"
                onInputChange={ this.handleChange }
                name="description"
                value={ description }
              >
                Descrição:
                {' '}
              </Input>

              <Button
                buttonBS="btn btn-primary m-1"
                btnType="submit"
                elementId="add-expenses"
              >
                Adicionar despesa
              </Button>

            </fieldset>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filteredCoin: state.wallet.filter,
  editForm: state.wallet.editForm,
});

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

export default connect(mapStateToProps, mapDispatchToProps)(Form);
