import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.handleTotalExpenses = this.handleTotalExpenses.bind(this);
  }

  componentDidMount() {
    this.handleTotalExpenses();
  }

  handleTotalExpenses() {
    const { expense } = this.props;

    expense.reduce((acc, atualExpense) => (acc + atualExpense.value), 0);
  }

  render() {
    const { email } = this.props;
    return (
      <header
        data-testid="email-field"
      >
        <section>
          <span>{email}</span>
        </section>
        <section>
          <span data-testid="total-field">{this.handleTotalExpenses()}</span>
          <span data-testid="header-currency-field">BRL</span>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expense: state.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequire;

export default connect(mapStateToProps)(Wallet);
