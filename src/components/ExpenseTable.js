import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const cabeçalho = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir',
];

class ExpenseTable extends Component {
  render() {
    const { userExpenses } = this.props;
    console.log('table', userExpenses);
    return (
      <table>
        <thead>
          <tr>
            {cabeçalho.map((item) => (
              <th key={ item }>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userExpenses.map(({
            id,
            currency,
            description,
            method,
            tag,
            value,
            exchangeRates,
          }) => (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{parseFloat(value).toFixed(2)}</td>
              <td>{(exchangeRates[currency].name).split('/')[0]}</td>
              <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>{parseFloat(value * exchangeRates[currency].ask).toFixed(2)}</td>
              <td>Real</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  userExpenses: state.wallet.expenses,
});

ExpenseTable.propTypes = {
  userExpenses: PropTypes.object,
}.isRequire;
export default connect(mapStateToProps)(ExpenseTable);
