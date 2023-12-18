import { useSelector, useDispatch } from 'react-redux';
import { deleteExpense, isEdit } from '../../redux/actions';
import style from './table.module.css';

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
    <table className={ style.table }>
      {/* Criando o cabeçalho da tabela */}
      <thead>
        <tr className={ style.head }>
          {/* Criando as colunas do cabeçalho */}
          <th className={ style.description }>Descrição</th>
          <th className={ style.tag }>Tag</th>
          <th className={ style.payment }>Forma de pagamento</th>
          <th className={ style.value }>Valor</th>
          <th className={ style.coin }>Moeda</th>
          <th className={ style.exchange }>Câmbio</th>
          <th className={ style.rate }>Valor convertido</th>
          <th className={ style.exchangeRates }>Moeda de conversão</th>
        </tr>
      </thead>
      {/* Criando o corpo da tabela */}
      <tbody className={ style.body }>
        {expenses.map((expense: any) => (
          <tr
            className={
              `${expense.id % 2 === 0 ? style.even : style.odd}`
            }
            key={ expense.id }
          >
            {/* Preenchedo as colunas do corpo */}
            <td
              className={ style.descriptionValue }
              data-testid="description"
            >
              { expense.description }
            </td>
            <td
              data-testid="tag"
              className={ style.tagValue }
            >
              { expense.tag }
            </td>
            <td
              data-testid="method"
              className={ style.paymentValue }
            >
              { expense.method }
            </td>
            <td
              data-testid="value"
              className={ style.valueValue }
            >
              { Number(expense.value).toFixed(2) }
            </td>
            <td
              data-testid="code"
              className={ style.coinValue }
            >
              { expense.exchangeRates[expense.currency].code }
            </td>
            <td
              data-testid="rate"
              className={ style.exchangeValue }
            >
              { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
            </td>
            <td
              data-testid="currency"
              className={ style.rateValue }
            >
              { `R$ ${Number(expense.value * expense.exchangeRates[expense.currency].ask)
                .toFixed(2)}` }
            </td>
            <td
              data-testid="name"
              className={ style.exchangeRatesValue }
            >
              { expense.exchangeRates[expense.currency].name }
            </td>
            <td className={ style.btn }>
              <button
                className={ style.editBtn }
                data-testid="edit-btn"
                type="button"
                onClick={ () => {
                  handleEdit(expense.id);
                } }
              >
                <img
                  className={ style.img }
                  src="../public/editar.png"
                  alt="editar"
                />
              </button>
              <button
                className={ style.delBtn }
                data-testid="delete-btn"
                type="button"
                onClick={ () => handleDel(expense.id) }
              >
                <img
                  src="../public/lixo.png"
                  alt="lixeira"
                  className={ style.img }
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
