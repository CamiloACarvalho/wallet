// Para acessar uma informação do estado global, precisamos usar o hook useSelector
import { useSelector } from 'react-redux';
import style from './header.module.css';

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
    <header className={ style.header }>
      <div
        className={ style.div }
        data-testid="header-currency-field"
      >
        <img
          src="../public/cambio-monetario.png"
          alt="moeda"
          className={ style.exchange }
        />
        <p className={ style.user }>
          BRL
        </p>
      </div>
      <div className={ style.div }>
        <p className={ style.value }>Valor total: R$ </p>
        <span
          className={ style.money }
          data-testid="total-field"
        >
          {`${totalValue.toFixed(2)}`}
        </span>
      </div>
      <div
        className={ style.div }
        data-testid="email-field"
      >
        <img src="../public/perfil.png" alt="perfil" className={ style.perfil } />
        <p className={ style.user }>
          { email }
        </p>
      </div>
    </header>
  );
}

export default Header;
