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
      bsClass,
    } = this.props;
    return (
      <button
        type={ btnType === 'submit' ? 'submit' : 'button' }
        id={ elementId }
        data-testid={ dataTest }
        className={ bsClass }
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
