import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userEmail, dataTest } = this.props;
    return (
      <div>
        <span data-testid={ dataTest }>{userEmail}</span>
        <span
          data-testid="total-field"
        >
          Despesa Total: 0
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Header.propTypes = {
  userEmail: PropTypes.object,
  dataTest: PropTypes.string,
}.isRequire;

export default connect(mapStateToProps)(Header);
