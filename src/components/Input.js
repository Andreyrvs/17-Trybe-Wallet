import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const {
      dataTest,
      elementId,
      labelName,
      onInputChange,
      name,
      inputValue,
      inputType,
      autoComplete,
    } = this.props;
    return (
      <label htmlFor={ elementId } className="form-label m-1">
        {labelName}
        <input
          autoComplete={ autoComplete }
          className="form-control"
          data-testid={ dataTest }
          id={ elementId }
          name={ name }
          onChange={ onInputChange }
          type={ inputType }
          value={ inputValue }
        />
      </label>
    );
  }
}

Input.propTypes = {
  dataTest: PropTypes.string,
  elementId: PropTypes.string,
  labelName: PropTypes.string,
  onInputChange: PropTypes.func,
  name: PropTypes.string,
  inputValue: PropTypes.string,
  inputType: PropTypes.string,
}.isRequire;

export default Input;
