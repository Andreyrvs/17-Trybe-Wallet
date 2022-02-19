import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';

class Table extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     expense: '',
  //   };
  // }

  // handleExpense = () => {
  //   const { expenses } = this.props;

  //   const el =

  //   this.setState({
  //     expense: el,
  //   });
  // }

  render() {
    const { expenses } = this.props;
    // expenses.map(({ id, currency, description, method, tag, value }) => console.log({ currency }));
    console.log(expenses);
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map(({ id, currency, description, method, tag, value }) => (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{parseFloat(value).toFixed(2)}</td>
              <td>{currency}</td>
              <td>Cambio</td>
              <td>valor Convertido</td>
              <td>BRL</td>
              <td>
                <Button>Editar</Button>
                <Button>Excluir</Button>
              </td>
            </tr>
          )) }
        </tbody>

      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
//   expensesForm: PropTypes.shape({
//     id: PropTypes.number,
//     value: PropTypes.number,
  description: PropTypes.string,
//     currency: PropTypes.string,
//     method: PropTypes.string,
//     tag: PropTypes.string,
//   }),
}.isRequire;

export default connect(mapStateToProps)(Table);
