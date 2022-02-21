import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import { deleteUserExpense, editUserExpense } from '../actions';
// import Form from './Form';
import EditForm from './EditForm';

class Table extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleEditBtn = this.handleEditBtn.bind(this);

    this.state = {
      // isEditing: false,
      formData: {},
    };
  }

  handleClick(id) {
    const { expenses, deleteUserExpenses } = this.props;
    const excludeExpense = expenses.filter((expense) => expense.id !== id);

    deleteUserExpenses({
      expenses: excludeExpense,
    });
  }

  handleEditBtn(id) {
    const { expenses, editUserExpenses } = this.props;

    const filterArray = expenses.find((expense) => expense.id === id);

    this.setState({
      formData: filterArray,
    });

    editUserExpenses({
      handleEditForm: true,
    });
  }

  render() {
    const { expenses, handleEditForm } = this.props;
    const { formData } = this.state;
    return (
      <>
        { handleEditForm
        && <EditForm formData={ formData } />}

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
                  <Button
                    dataTest="edit-btn"
                    handleClick={ () => { this.handleEditBtn(id); } }
                  >
                    Editar
                  </Button>
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
      </>

    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  handleEditForm: state.wallet.handleEditForm,
});

const mapDispatchToProps = (dispatch) => ({
  deleteUserExpenses: (state) => dispatch(deleteUserExpense(state)),
  editUserExpenses: (state) => dispatch(editUserExpense(state)),
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
