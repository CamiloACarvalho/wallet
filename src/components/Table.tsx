import { useSelector, useDispatch } from 'react-redux';
import { deleteExpense, isEdit } from '../redux/actions';

function Table() {
  // Obtendo o estado global
  const { expenses } = useSelector((state: any) => state.wallet);
  const dispatch = useDispatch();

  const handleDel = (id: number) => {
  // "Dispachando" a ação de deletar uma despesa
    dispatch(deleteExpense(id));
  };

  const handleEdit = (id: number) => {
  // Dispachando a ação de editar uma despesa
    console.log(id);
    dispatch(isEdit(true, id));
  };

  return (
    // Criando a tabela
    <table>
      {/* Criando o cabeçalho da tabela */}
      <thead>
        <tr>
          {/* Criando as colunas do cabeçalho */}
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
      {/* Criando o corpo da tabela */}
      <tbody>
        {expenses.map((expense: any) => (
          <tr key={ expense.id }>
            {/* Preenchedo as colunas do corpo */}
            <td data-testid="description">{ expense.description }</td>
            <td data-testid="tag">{ expense.tag }</td>
            <td data-testid="method">{ expense.method }</td>
            <td data-testid="value">{ Number(expense.value).toFixed(2) }</td>
            <td data-testid="code">
              { expense.exchangeRates[expense.currency].code }
            </td>
            <td data-testid="rate">
              { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
            </td>
            <td data-testid="currency">
              { Number(expense.value * expense.exchangeRates[expense.currency].ask)
                .toFixed(2) }
            </td>
            <td data-testid="name">{ expense.exchangeRates[expense.currency].name }</td>
            <td>
              <button
                data-testid="edit-btn"
                type="button"
                onClick={ () => {
                  handleEdit(expense.id);
                } }
              >
                Editar
              </button>
              <button
                data-testid="delete-btn"
                type="button"
                onClick={ () => handleDel(expense.id) }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
