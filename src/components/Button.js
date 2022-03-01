import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const {
      children,
      btnType,
      elementId,
      dataTest,
      handleClick,
      isDisable,
    } = this.props;
    return (
      <button
        type={ btnType === 'button' ? 'button' : 'submit' }
        id={ elementId }
        data-testid={ dataTest }
        onClick={ handleClick }
        disabled={ isDisable }
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  btnType: PropTypes.string,
  elementId: PropTypes.string,
  dataTest: PropTypes.string,
  handleClick: PropTypes.func,
  isDisable: PropTypes.bool,
}.isRequire;

export default Button;
