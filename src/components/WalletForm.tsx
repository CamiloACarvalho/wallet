import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/actions';

function WalletForm() {
  const dispatch = useDispatch();
  const currencies = useSelector((state: any) => state.wallet.currencies);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <form>
      <label htmlFor="value">
        Valor:
        <input
          name="value"
          data-testid="value-input"
          type="number"
          placeholder="Valor"
          // value={ value }
          // onChange={ handleChange }
        />
      </label>
      <label htmlFor="currency">
        Moeda:
        <select
          name="currency"
          data-testid="currency-input"
          // value={ currency }
          // onChange={ handleChange }
        >
          {currencies.map((currency: any, index: any) => (
            <option
              key={ index }
              value={ currency }
            >
              {currency}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="method">
        Método de pagamento:
        <select
          name="method"
          data-testid="method-input"
          // value={ method }
          // onChange={ handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="tag">
        Categoria:
        <select
          name="tag"
          data-testid="tag-input"
          // value={ tag }
          // onChange={ handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
      <label htmlFor="spending">
        Despesas:
        <input
          name="spending"
          data-testid="description-input"
          type="text"
          placeholder="Despesas"
          // value={ spending }
          // onChange={ handleChange }
        />
      </label>
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
