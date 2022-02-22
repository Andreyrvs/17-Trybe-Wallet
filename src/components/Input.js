import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const {
      elementId,
      dataTest,
      onInputChange,
      name,
      value,
      children,
      inputType,
      isCheck,
      classBS,
    } = this.props;
    return (
      <label htmlFor={ elementId } className="form-label m-1">
        { children }
        <input
          id={ elementId }
          data-testid={ dataTest }
          onChange={ onInputChange }
          name={ name }
          value={ value }
          type={ inputType }
          checked={ isCheck }
          autoComplete="off"
          className={ classBS }
        />
      </label>
    );
  }
}

Input.propTypes = {
  elementId: PropTypes.string,
  dataTest: PropTypes.string,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  inputType: PropTypes.string,
  isCheck: PropTypes.bool,
}.isRequire;

export default Input;
