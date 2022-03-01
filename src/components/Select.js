import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  render() {
    const {
      dataTest,
      elementId,
      labelName,
      inputValue,
      name,
      handleChange,
      children,
    } = this.props;
    return (
      <label htmlFor={ elementId } className="m-1">
        {labelName}
        <select
          data-testid={ dataTest }
          className="form-select"
          id={ elementId }
          value={ inputValue }
          name={ name }
          onChange={ handleChange }
        >
          {children}
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  dataTest: PropTypes.string,
  elementId: PropTypes.string,
  labelName: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,

}.isRequire;

export default Select;
