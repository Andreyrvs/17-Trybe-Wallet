import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../components/Form';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.handleUserExpense = this.handleUserExpense.bind(this);

    this.state = {
      totalExpense: 0,
    };
  }

  handleUserExpense() {
    const { handleUserExpenses } = this.props;
    this.setState({
      totalExpense: handleUserExpenses,
    });
  }

  render() {
    const { totalExpense } = this.state;

    return (
      <div>
        <Header
          dataTest="email-field"
          handleUserExpense={ this.handleUserExpense }
          totalExpense={ totalExpense }
        />
        <Form />
        <Table />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userExpenses: state.wallet.expenses,
});

Wallet.propTypes = {
  expensesForm: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.number,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  }) }.isRequire;

export default connect(mapStateToProps)(Wallet);
// export default Wallet;
