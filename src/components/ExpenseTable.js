import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import {
  deleteExpenses,
  editedExpenses,
  expenses,
  filter,
  updatedExpenses,
} from '../actions';
import Form from './Form';

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
    this.handleEditeButton = this.handleEditeButton.bind(this);
  }

  handleDeleteExpense(itemId) {
    const { expensesState, deleteExpense } = this.props;

    const newExpenses = expensesState.filter((expense) => (
      expense.id !== itemId
    ));

    deleteExpense({
      expenses: newExpenses,
    });
  }

  handleEditeButton(itemId) {
    const { filtered, expensesState, editedExpense } = this.props;

    const filteredExpense = expensesState.find((expense) => expense.id === itemId);

    filtered({
      filter: filteredExpense,
    });
    editedExpense({
      isEditing: true,
    });
  }

  render() {
    const { expensesState, isEditing } = this.props;
    return (
      <>
        <section>
          {isEditing
            ? (<Form />)
            : (<Form isEditing={ !isEditing } />)}
        </section>

        <table>
          <thead>
            <tr>
              {cabeçalho.map((item) => (
                <th key={ item }>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expensesState.map(({
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
                    elementId={ id }
                    dataTest="delete-btn"
                    handleClick={ () => this.handleDeleteExpense(id) }
                  >
                    Excluir
                  </Button>
                </td>
                <td>
                  <Button
                    type="button"
                    elementId={ id }
                    dataTest="edit-btn"
                    handleClick={ () => this.handleEditeButton(id) }
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesState: state.wallet.expenses,
  isEditing: state.wallet.isEditing,

});

const mapDispatchToProps = (dispatch) => ({
  userExpense: (state) => dispatch(expenses(state)),
  deleteExpense: (state) => dispatch(deleteExpenses(state)),
  updatedExpense: (state) => dispatch(updatedExpenses(state)),
  filtered: (state) => dispatch(filter(state)),
  editedExpense: (state) => dispatch(editedExpenses(state)),
});

ExpenseTable.propTypes = {
  expensesState: PropTypes.object,
}.isRequire;
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
