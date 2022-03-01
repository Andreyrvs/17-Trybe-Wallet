import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import {
  deleteExpenses,
  editedExpenses,
  expenses,
  // filter,
  // updatedExpenses,
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
    this.handleEditButton = this.handleEditButton.bind(this);

    this.state = {
      formData: {
        id: 0,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    };
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

  handleEditButton(itemId) {
    const { expensesState, editedExpense } = this.props;

    const filteredExpense = expensesState.find((expense) => expense.id === itemId);
    this.setState({
      formData: filteredExpense,
    }, () => editedExpense(true));
  }

  render() {
    const { formData } = this.state;
    const { expensesState, isEditing } = this.props;

    return (
      <>
        <section>
          {isEditing
            ? (<Form formData={ formData } isEditing={ isEditing } />)
            : (<Form isEditing={ isEditing } formData={ formData } />)}
        </section>

        <table className="table table-striped table-dark">
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
              <tr key={ `${id}${description}` }>
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
                    elementId={ value }
                    bsClass="btn btn-warning m-1 btn-sm"
                    dataTest="edit-btn"
                    handleClick={ () => this.handleEditButton(id) }
                  >
                    Editar
                  </Button>
                  <Button
                    type="button"
                    elementId={ id }
                    bsClass="btn btn-danger m-1 btn-sm"
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
  // updatedExpense: (state) => dispatch(updatedExpenses(state)),
  // filtered: (state) => dispatch(filter(state)),
  editedExpense: (state) => dispatch(editedExpenses(state)),
});

ExpenseTable.propTypes = {
  expensesState: PropTypes.object,
}.isRequire;
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
