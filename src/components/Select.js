import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  render() {
    const {
      dataTest,
      elementId,
      labelName,
      value,
      name,
      onChange,
      children,
    } = this.props;
    return (
      <label htmlFor={ elementId }>
        {labelName}
        <select
          data-testid={ dataTest }
          id={ elementId }
          value={ value }
          name={ name }
          onChange={ onChange }
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
