import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ExpenseTable from '../components/ExpenseTable';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.handleTotalExpenses = this.handleTotalExpenses.bind(this);
  }

  handleTotalExpenses() {
    const { expensesState } = this.props;

    return expensesState.reduce((acc, expense) => (
      acc + expense.value * expense.exchangeRates[expense.currency].ask
    ), 0);
  }

  render() {
    const { email } = this.props;
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
            <ExpenseTable />
          </section>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expensesState: state.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.object,
}.isRequire;

export default connect(mapStateToProps)(Wallet);
