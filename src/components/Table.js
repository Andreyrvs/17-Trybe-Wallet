import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import { userExpenses } from '../actions';

class Table extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      expense: [],
    };
  }

  handleClick(id) {
    const { expenses, userExpense } = this.props;

    const excludeExpense = expenses.filter((expense) => expense.id !== id);
    userExpense({
      expenses: excludeExpense,
    });

    console.log(expenses);
    console.log(excludeExpense);
  }

  // handleClick(id) {
  //   const { expenses } = this.props;
  //   this.setState({
  //     expense: expenses,
  //   });
  //   const excludeExpense = expenses.filter((expense) => expense.id !== id);
  //   this.setState({
  //     expense: excludeExpense,
  //   });

  //   console.log(expenses);
  //   console.log(excludeExpense);
  // }

  render() {
    const { expense } = this.state;
    const { expenses } = this.props;
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
          { expenses.map(({
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
              <td>
                {(exchangeRates[currency].name).split('/')[0]}
              </td>
              <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>
                {(parseFloat(value) * parseFloat(exchangeRates[currency].ask))
                  .toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <Button>Editar</Button>
                <Button
                  dataTest="delete-btn"
                  type="button"
                  elementId={ id }
                  handleClick={ () => this.handleClick(id) }
                >
                  Excluir
                </Button>
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

const mapDispatchToProps = (dispatch) => ({
  userExpense: (state) => dispatch(userExpenses(state)),
});

Table.propTypes = {
  expenses: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.number,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  }),
}.isRequire;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
