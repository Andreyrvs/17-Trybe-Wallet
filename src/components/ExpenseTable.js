import React, { Component } from 'react';

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
          <tr>
            <td>Thurusbango</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default ExpenseTable;
