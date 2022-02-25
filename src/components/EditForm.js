import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeForms, editUserExpenses, userExpenses, currenciesArray } from '../actions';
import Input from './Input';
import Button from './Button';
import fetchAPI from '../services';
import METHOD_LIST, { TAG_LIST } from '../data';

class EditForm extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      coin: '',
      exchangeRates: [],
    };
  }

  componentDidMount() {
    this.handleCurrency();
    this.updateState();
  }

  updateState = () => {
    const { formData } = this.props;

    this.setState({
      id: formData.id,
      exchangeRates: formData.exchangeRates,
      value: formData.value,
      description: formData.description,
      currency: formData.currency,
      method: formData.method,
      tag: formData.tag,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  handleEdit(event) {
    event.preventDefault(event);
    const { expenses, changeForm, editUserExpense } = this.props;
    const { id, exchangeRates } = this.state;

    console.log(exchangeRates);
    const p1 = expenses.filter((item) => Number(item.id) < Number(id));
    const p2 = expenses.filter((item) => Number(item.id) > Number(id));
    // console.log('p1', p1);
    // console.log('p2', p2);

    const updatedExpenses = [...p1, this.state, ...p2];
    // console.log(updatedExpenses);
    editUserExpense(updatedExpenses);
    changeForm({ editForm: false });
  }

  async handleCurrency() {
    const { currencie } = this.props;
    const responseAPI = await fetchAPI();
    const arrayCoin = Object.keys(responseAPI);

    const filteredCoin = arrayCoin.filter((coin) => coin !== 'USDT');
    this.setState({
      coin: filteredCoin,
    });

    currencie(filteredCoin);
  }

  render() {
    const { value, description, currency, method, tag, coin } = this.state;
    const { editForm } = this.props;

    return (
      <div>
        {editForm
        && (
          <form
            style={ { backgroundColor: ' green' } }
            id="form-expenses"
            onSubmit={ (event) => this.handleEdit(event) }
          >
            <fieldset>
              <Input
                dataTest="value-input"
                elementId="input-value"
                onInputChange={ this.handleChange }
                name="value"
                value={ value }
              >
                Valor:
                {' '}
              </Input>

              <label htmlFor="select-currency">
                Moeda:
                {' '}
                <select
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

              <label htmlFor="input-method">
                Método de pegamento:
                {' '}
                <select
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

              <label htmlFor="input-tag">
                Tag:
                {' '}
                <select
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
                btnType="submit"
                elementId="add-expenses"
              >
                Editar despesa
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
  expenses: state.wallet.expenses,
  filter: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  editUserExpense: (state) => dispatch(editUserExpenses(state)),
  changeForm: (state) => dispatch(changeForms(state)),
  userExpense: (state) => dispatch(userExpenses(state)),
  currencie: (state) => dispatch(currenciesArray(state)),
});

EditForm.propTypes = {
  expensesForm: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.number,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  }),
}.isRequire;

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
