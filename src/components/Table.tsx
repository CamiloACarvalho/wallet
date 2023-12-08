import { useSelector, useDispatch } from 'react-redux';
import { deleteExpense } from '../redux/actions';

function Table() {
  // Obtendo o estado global
  const { expenses } = useSelector((state: any) => state.wallet);
  const dispatch = useDispatch();

  const handleClick = (id: number) => {
    // Criando a função para excluir uma despesa
    dispatch(deleteExpense(id));
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
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ Number(expense.value).toFixed(2) }</td>
            <td>{ expense.exchangeRates[expense.currency].code }</td>
            <td>
              { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
            </td>
            <td>
              { Number(expense.value * expense.exchangeRates[expense.currency].ask)
                .toFixed(2) }
            </td>
            <td>{ expense.exchangeRates[expense.currency].name }</td>
            <td>
              <button
                type="button"
              >
                Editar
              </button>
              <button
                data-testid="delete-btn"
                type="button"
                onClick={ () => handleClick(expense.id) }
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
