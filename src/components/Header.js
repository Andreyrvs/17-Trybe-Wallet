import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  // constructor() {
  //   super();
  //   this.handleTotalField = this.handleTotalField.bind(this);

  //   this.state = {
  //     totalExpense: 0,
  //   };
  // }

  render() {
    const { userEmail, dataTest } = this.props;
    // const { totalExpense } = this.state;
    // const { exchangeRates } = totalField;
    // console.log(totalField);
    // console.log(exchangeRates);

    return (
      <header className="header">
        <span data-testid={ dataTest }>{userEmail}</span>
        <span
          data-testid="total-field"
        >
          Despesa Total: 0
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  totalField: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.object,
  dataTest: PropTypes.string,
}.isRequire;

export default connect(mapStateToProps)(Header);
