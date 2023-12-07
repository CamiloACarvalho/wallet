import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/actions';
import walletRedux from '../redux/reducers/wallet';

function WalletForm() {
  // Criei um estado para o formulário
  const [form, setForm] = useState({
    value: '',
    currency: '',
    method: '',
    tag: '',
    spending: '',
  });

  // O useDispatch é para disparar a action que vai fazer a requisição
  const dispatch = useDispatch();
  // O useSelector é para pegar o estado que vai ser atualizado com os dados da requisição
  const currencies = useSelector((state: any) => state.wallet.currencies);

  // O useEffect vai fazer a requisição da API quando o componente for montado
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Fiz a desestruturação do estado do formulário
  const { value, currency, method, tag, spending } = form;

  // Essa função é para atualizar o estado do formulário a medida que vão sendo feitas as alterações
  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name: targetName } = target;
    setForm({ ...form, [targetName]: value });
  };

  // Criando uma função para enviar as informações para a localStorage
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(walletRedux(form));
  };

  return (
    <form onSubmit={ handleSubmit }>

      {/* O formulário vai ter um input para cada informação que vai ser enviada para a API */}
      {/* Esse input vai capturar o valor da despesa */}
      <label htmlFor="value">
        Valor:
        <input
          name="value"
          data-testid="value-input"
          type="number"
          placeholder="Valor"
          value={ value }
          onChange={ handleChange }
        />
      </label>
      {/* Esse input vai capturar a moeda da despesa. Observe que criamos um array com as moedas para conversão */}
      <label htmlFor="currency">
        Moeda:
        <select
          name="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ handleChange }
        >
          {/* O option foi feito com um map para que cada moeda seja uma opção do select */}
          {currencies.map((coin: any, index: any) => (
            <option
              key={ index }
              value={ coin }
            >
              {coin}
            </option>
          ))}
        </select>
        {/* Esse input vai capturar o método de pagamento da despesa */}
      </label>
      <label htmlFor="method">
        Método de pagamento:
        <select
          name="method"
          data-testid="method-input"
          value={ method }
          onChange={ handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
      {/* Esse input vai capturar a categoria da despesa */}
      <label htmlFor="tag">
        Categoria:
        <select
          name="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
      {/* Esse input vai capturar a descrição da despesa */}
      <label htmlFor="spending">
        Despesas:
        <input
          name="spending"
          data-testid="description-input"
          type="text"
          placeholder="Despesas"
          value={ spending }
          onChange={ handleChange }
        />
      </label>
      {/* O botão vai enviar os dados para localStore */}
      <button
        type="submit"
        data-testid="button-submit"
      >
        Adicionar despesa
      </button>
    </form>
  );
}

export default WalletForm;
