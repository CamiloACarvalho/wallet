import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, expenseData, editing } from '../../redux/actions';
import style from './walletForm.module.css';

const URL = 'https://economia.awesomeapi.com.br/json/all';

const initialState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

function WalletForm() {
  // Criei um estado para o formulário
  const [form, setForm] = useState(initialState);

  // Tipei o estado do Redux
  type ReduxState = {
    api: {
      code: string,
      codein: string,
      name: string,
      high: string,
      low: string,
      varBid: string,
      pctChange: string,
      bid: string,
      ask: string,
      timestamp: string,
      create_date: string,
    },
  };

  // O useDispatch é para disparar a action que vai fazer a requisição
  const dispatch: ThunkDispatch<ReduxState, null, AnyAction> = useDispatch();
  // O useSelector é para pegar o estado que vai ser atualizado com os dados da requisição
  const currencies = useSelector((state: any) => state.wallet.currencies);
  // O useSelector é para pegar o estado que vai ser atualizado com os dados da requisição
  const editor = useSelector((state: any) => state.wallet.editor);

  // O useEffect vai fazer a requisição da API quando o componente for montado
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Fiz a desestruturação do estado do formulário
  const { value, currency, method, tag, description } = form;

  // Essa função é para atualizar o estado do formulário a medida que vão sendo feitas as alterações
  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    // Renomeando a propriedade name do target para targetName
    const { name: targetName } = target;
    setForm({ ...form, [targetName]: target.value });
  };

  // Criando uma função para enviar as informações para a localStorage
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(URL);
    const data = await response.json();

    const expensive = {
      ...form,
      exchangeRates: data,
    };

    if (editor) {
      dispatch(editing(expensive));
    } else {
      dispatch(expenseData(expensive));
    }
    setForm(initialState);
  };

  return (
    <form
      className={ style.form }
      onSubmit={ handleSubmit }
    >

      {/* O formulário vai ter um input para cada informação que vai ser enviada para a API */}
      {/* Esse input vai capturar o valor da despesa */}
      <label
        className={ style.label }
        htmlFor="value"
      >
        Valor
        <input
          className={ style.inputValue }
          name="value"
          data-testid="value-input"
          type="number"
          placeholder="Valor"
          value={ value }
          onChange={ handleChange }
        />
      </label>
      {/* Esse input vai capturar a moeda da despesa. Observe que criamos um array com as moedas para conversão */}
      <label
        className={ style.label }
        htmlFor="currency"
      >
        Moeda
        <select
          className={ style.selectCoin }
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
      </label>
      {/* Esse input vai capturar o método de pagamento da despesa */}
      <label
        htmlFor="method"
        className={ style.label }
      >
        Forma de pagamento
        <select
          className={ style.selectMethod }
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
      <label
        htmlFor="tag"
        className={ style.label }
      >
        Categoria
        <select
          className={ style.selectTag }
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
      <label
        htmlFor="spending"
        className={ style.label }
      >
        Despesas
        <input
          className={ style.inputDescription }
          name="description"
          data-testid="description-input"
          type="text"
          placeholder="Despesas"
          value={ description }
          onChange={ handleChange }
        />
      </label>
      {/* O botão vai enviar os dados para localStore */}
      <button
        className={ style.buttonSubmit }
        type="submit"
        data-testid="button-submit"
      >
        { editor ? 'Editar despesa' : 'Adicionar despesa'}
      </button>
    </form>
  );
}

export default WalletForm;
