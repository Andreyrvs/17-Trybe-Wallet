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
      value,
      inputType,
      autoComplete,
    } = this.props;
    return (
      <label htmlFor={ elementId }>
        {labelName}
        <input
          autoComplete={ autoComplete }
          data-testid={ dataTest }
          id={ elementId }
          name={ name }
          onChange={ onInputChange }
          type={ inputType }
          value={ value }
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
  value: PropTypes.string,
  inputType: PropTypes.string,
}.isRequire;

export default Input;
