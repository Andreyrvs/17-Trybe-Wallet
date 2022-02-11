import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { elementId, dataTest, handleChange, name, value } = this.props;
    return (
      <div>
        <label htmlFor={ elementId }>
          <input
            id={ elementId }
            data-testid={ dataTest }
            onChange={ handleChange }
            name={ name }
            value={ value }
          />
        </label>
      </div>
    );
  }
}

Input.propTypes = {
  elementId: PropTypes.string,
  dataTest: PropTypes.string,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
}.isRequire;

export default Input;
