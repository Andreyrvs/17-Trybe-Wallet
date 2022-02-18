import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  // constructor() {
  //   super();
  //   this.handleUserExpense = this.handleUserExpense.bind(this);

  //   this.state = {
  //     totalExpense: 0,
  //   };
  // }

  // handleUserExpense() {
  //   const { handleUserExpense } = this.props;
  //   this.setState({
  //     totalExpense: handleUserExpense,
  //   });
  // }

  render() {
    // const { totalExpense } = this.state;
    const { userEmail, dataTest, totalExpense } = this.props;

    return (
      <header className="header">
        <span data-testid={ dataTest }>{userEmail}</span>
        <span
          data-testid="total-field"
        >
          Despesa Total:
          {' '}
          {totalExpense}
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  userExpenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.object,
  dataTest: PropTypes.string,
}.isRequire;

export default connect(mapStateToProps)(Header);
