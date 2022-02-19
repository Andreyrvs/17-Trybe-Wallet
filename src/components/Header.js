import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();

    this.handleSumExpenses = this.handleSumExpenses.bind(this);
  }

  handleSumExpenses() {
    const { expenses } = this.props;

    return expenses.reduce((acc, expense) => (
      acc + expense.value * expense.exchangeRates[expense.currency].ask
    ), 0);
  }

  render() {
    const { userEmail, dataTest } = this.props;

    return (
      <header className="header">
        <span data-testid={ dataTest }>{userEmail}</span>
        <span
          data-testid="total-field"
        >
          Despesa Total:
          {' '}
          {this.handleSumExpenses()}
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.object,
  dataTest: PropTypes.string,
}.isRequire;

export default connect(mapStateToProps)(Header);
