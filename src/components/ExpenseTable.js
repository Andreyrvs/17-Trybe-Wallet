import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import { deleteExpenses } from '../actions';

const cabeçalho = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir',
];

class ExpenseTable extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteExpense = this.handleDeleteExpense.bind(this);
  }

  handleDeleteExpense(itemId) {
    const { userExpenses, deleteExpense } = this.props;

    const newExpenses = userExpenses.filter((expense) => (
      expense.id !== itemId
    ));

    deleteExpense({
      expenses: newExpenses,
    });
  }

  render() {
    const { userExpenses } = this.props;

    return (
      <table>
        <thead>
          <tr>
            {cabeçalho.map((item) => (
              <th key={ item }>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userExpenses.map(({
            id,
            currency,
            description,
            method,
            tag,
            value,
            exchangeRates,
          }) => (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{parseFloat(value).toFixed(2)}</td>
              <td>{(exchangeRates[currency].name).split('/')[0]}</td>
              <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>{parseFloat(value * exchangeRates[currency].ask).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <Button
                  type="button"
                  elementId="edit-button"
                  handleClick={ () => {} }
                >
                  Editar
                </Button>
              </td>
              <td>
                <Button
                  type="button"
                  elementId={ id }
                  dataTest="delete-btn"
                  handleClick={ () => this.handleDeleteExpense(id) }
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  userExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (state) => dispatch(deleteExpenses(state)),
});

ExpenseTable.propTypes = {
  userExpenses: PropTypes.object,
}.isRequire;
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
