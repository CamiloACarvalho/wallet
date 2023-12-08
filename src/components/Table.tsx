import { useSelector } from 'react-redux';

function Table() {
  // Obtendo o estado global
  const wallet = useSelector((state: any) => state.wallet);

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
        {wallet.map((expense: any) => (
          <tr key={ expense.id }>
            {/* Criando as colunas do corpo */}
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ expense.value.toFixed(2) }</td>
            <td>{ expense.exchangeRates[expense.currency].name }</td>
            <td>
              { expense.exchangeRates[expense.currency].ask.toFixed(2) }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
