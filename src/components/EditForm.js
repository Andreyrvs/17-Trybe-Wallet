import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeForms, editUserExpenses, userExpenses } from '../actions';
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
      coins: '',
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
    console.log('exchangeRates', exchangeRates);
    const splitBefore = expenses.filter((item) => Number(item.id) < Number(id));
    const splitLater = expenses.filter((item) => Number(item.id) > Number(id));

    const updatedExpenses = [...splitBefore, this.state, ...splitLater];

    editUserExpense(updatedExpenses);
    changeForm({ editForm: false });
  }

  async handleCurrency() {
    const responseAPI = await fetchAPI();
    const arrayCoin = Object.keys(responseAPI);

    const filteredCoin = arrayCoin.filter((coin) => coin !== 'USDT');
    this.setState({
      coins: filteredCoin,
    });
  }

  render() {
    const { value, description, currency, method, tag, coins } = this.state;
    const { editForm } = this.props;

    return (
      <div>
        {editForm
        && (
          <form
            style={ { backgroundColor: '#156E44' } }
            className="m-2"
            id="form-expenses"
            onSubmit={ (event) => this.handleEdit(event) }
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
                  { coins.length > 0
                && coins.map((currencies) => (
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
                buttonBS="btn btn-danger m-1"
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
