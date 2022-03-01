import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import ExpenseTable from '../components/ExpenseTable';
import { filter, editedExpenses } from '../actions';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.handleTotalExpenses = this.handleTotalExpenses.bind(this);
    this.handleEditeButton = this.handleEditeButton.bind(this);
  }

  handleTotalExpenses() {
    const { expensesState } = this.props;
    return expensesState.reduce((acc, expense) => (
      acc + expense.value * expense.exchangeRates[expense.currency].ask
    ), 0);
  }

  handleEditeButton(itemId) {
    const { filtered, expensesState, editedExpense } = this.props;

    const filteredExpense = expensesState.find((expense) => expense.id === itemId);

    filtered({
      filter: filteredExpense,
    });
    editedExpense({
      editedExpenses: true,
    });
  }

  render() {
    const { email, editedExpense } = this.props;
    return (
      <>
        <header>
          <section>
            <span data-testid="email-field">{email}</span>
          </section>
          <section>
            <span data-testid="total-field">
              Despesa Total:
              {' '}
              {(this.handleTotalExpenses()).toFixed(2)}
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </section>
        </header>
        <main>
          <section>
            {editedExpense
              ? (<Form />)
              : (<Form editedExpense={ !editedExpense } />)}
          </section>
          <section>
            <ExpenseTable handleEditeButton={ this.handleEditeButton } />
          </section>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expensesState: state.wallet.expenses,
  // editedExpense: state.wallet.editedExpenses,
});

const mapDispatchToProps = (dispatch) => ({
  filtered: (state) => dispatch(filter(state)),
  editedExpense: (state) => dispatch(editedExpenses(state)),
});

Wallet.propTypes = {
  email: PropTypes.object,
}.isRequire;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
