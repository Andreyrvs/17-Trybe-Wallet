import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BsTrash } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import Button from './Button';
import { deleteUserExpense, changeForms } from '../actions';
import EditForm from './EditForm';

class Table extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleEditBtn = this.handleEditBtn.bind(this);

    this.state = {
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
    const { expenses, changeForm } = this.props;

    const filterArray = expenses.find((expense) => expense.id === id);

    this.setState({
      formData: filterArray,
    });

    changeForm({
      editForm: true,
    });
  }

  render() {
    const { expenses, editForm } = this.props;
    const { formData } = this.state;
    console.log('expenses', expenses);
    return (
      <div className="table-responsive-md">
        { editForm
        && <EditForm formData={ formData } />}

        <table className="table table-dark table-striped">
          <thead>
            <tr className="text-center">
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
                    buttonBS="btn btn-warning m-1"
                    dataTest="edit-btn"
                    handleClick={ () => { this.handleEditBtn(id); } }
                  >
                    <AiOutlineEdit style={ { fontSize: '20px' } } />
                  </Button>
                  <Button
                    buttonBS="btn btn-danger m1"
                    dataTest="delete-btn"
                    type="button"
                    elementId={ id }
                    handleClick={ () => this.handleClick(id) }
                  >
                    <BsTrash style={ { fontSize: '19px' } } />
                  </Button>
                </td>
              </tr>
            )) }
          </tbody>

        </table>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editForm: state.wallet.editForm,
});

const mapDispatchToProps = (dispatch) => ({
  deleteUserExpenses: (state) => dispatch(deleteUserExpense(state)),
  changeForm: (state) => dispatch(changeForms(state)),
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
