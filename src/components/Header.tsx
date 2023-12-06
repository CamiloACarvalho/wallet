// Para acessar uma informação do estado global, precisamos usar o hook useSelector
import { useSelector } from 'react-redux';

function Header() {
  // Aqui, email é uma propriedade do estado global
  // Fiz a desestruturação para pegar apenas o email
  const { email } = useSelector((state: any) => state.user);

  return (
    <>
      <p data-testid="email-field">
        {`Usuário: ${email}` }
      </p>
      <p data-testid="total-field">
        {`Total: R$ ${0}` }
      </p>
      <p data-testid="header-currency-field">
        BRL
      </p>
    </>
  );
}

export default Header;
