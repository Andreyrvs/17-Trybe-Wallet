import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <div>
        <span data-testid="email-field">{user}</span>
      </div>
    );
  }
}

const mapStateToProps = (payload) => {
  console.log(payload);
  return { user: payload.email };
};
Header.protoType = {
  user: PropTypes.object,
}.isRequire;

export default connect(mapStateToProps)(Header);
