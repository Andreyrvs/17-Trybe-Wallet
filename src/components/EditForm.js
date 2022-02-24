import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeForms, editUserExpenses } from '../actions';
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
    };
  }

  componentDidMount() {
    this.handleCurrency();
    this.updateState();
  }

  updateState = () => {
    const { formData } = this.props;
    // console.log(formData);
    this.setState({
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
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const updatedExpenses = expenses;

    updatedExpenses[id] = {
      id,
      value,
      description,
      currency,
      method,
      tag };

    editUserExpense(updatedExpenses);
    changeForm({ handleEditForm: false });
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
    const { handleEditForm } = this.props;

    return (
      <div>
        {handleEditForm
        && (
          <form
            style={ { backgroundColor: ' green' } }
            id="form-expenses"
            onSubmit={ this.handleEdit }
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
  handleEditForm: state.wallet.handleEditForm,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  editUserExpense: (state) => dispatch(editUserExpenses(state)),
  changeForm: (state) => dispatch(changeForms(state)),
  // userExpense: (state) => dispatch(userExpenses(state)),
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
