import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();

    this.handleSumExpenses = this.handleSumExpenses.bind(this);

    this.state = {
      totalExpenses: 0,
    };
  }

  handleSumExpenses() {
    const { expenses } = this.props;

    const total = expenses.reduce((acc, expense) => (
      acc + expense.value * expense.exchangeRates[expense.currency].ask
    ), 0);

    this.setState({
      totalExpenses: total,
    });
  }

  render() {
    const { userEmail, dataTest } = this.props;
    const { totalExpenses } = this.state;

    return (
      <header className="header">
        <span data-testid={ dataTest }>{userEmail}</span>
        <span
          data-testid="total-field"
        >
          Despesa Total:
          {' '}
          {parseFloat(totalExpenses).toFixed(2)}
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
