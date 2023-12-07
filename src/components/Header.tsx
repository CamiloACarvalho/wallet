// Para acessar uma informação do estado global, precisamos usar o hook useSelector
import { useSelector } from 'react-redux';

function Header() {
  // Aqui, email é uma propriedade do estado global
  // Fiz a desestruturação para pegar apenas o email
  const { email } = useSelector((state: any) => state.user);
  const { expenses } = useSelector((state: any) => state.wallet);

  const totalValue = expenses
    .reduce((sum: number, { value, currency, exchangeRates }: any) => {
      sum += value * exchangeRates[currency].ask;
      return sum;
    }, 0);

  return (
    <>
      <p data-testid="email-field">
        {`Usuário: ${email}` }
      </p>
      <p>
        Total: R$
        <span data-testid="total-field">{`${totalValue.toFixed(2)}`}</span>
      </p>
      <p data-testid="header-currency-field">
        BRL
      </p>
    </>
  );
}

export default Header;
