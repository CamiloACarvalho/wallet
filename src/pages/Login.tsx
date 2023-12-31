import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Como vamos precisar 'despachar' as informações para outras páginas, vamos importar o useDispatch
import { useDispatch } from 'react-redux';
import { userData } from '../redux/actions';

// Importando o css da página
import style from './login.module.css';

function Login() {
  // Criando o link para navegar para outra página quando fizer o login
  const navigate = useNavigate();

  // Transformando a função useDispacth para uma constante
  const dispacth = useDispatch();

  // Validando o login e senha
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Capturando a informação digitada para efetuar a validação
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Capturando a informação digitada para efetuar a validação
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Criando uma função para validar o login e senha do usuário
  const loginValidation = () => {
    // Criando uma validação para email no regex no formato usuario@provedor.com
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // Fazendo o teste, se passar o valor retornar é true
    const validEmail = emailRegex.test(email);

    // vou fazer a mesma coisa para a senha. O único requisito é que seja maior que 6 caracteres
    const passwordRegex = /^.{6,}$/;
    const validPassword = passwordRegex.test(password);

    // Retorna true, e ai habilita do botão de login
    return (validEmail && validPassword);
  };

  // Criando uma função para submit
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/carteira');
    dispacth(userData(email));
  };

  return (
    <main className={ style.main }>
      <form onSubmit={ handleSubmit }>
        <h2
          className={ style.title }
        >
          Login
        </h2>
        <div className={ style.email }>
          <label
            className={ style.word }
            htmlFor="email"
          >
            E-mail
            <input
              className={ style.input }
              placeholder="usuario@provedor.com"
              type="email"
              data-testid="email-input"
              required
              name="email"
              value={ email }
              onChange={ handleEmailChange }
            />
          </label>
        </div>
        <div className={ style.password }>
          <label
            className={ style.word }
            htmlFor="password"
          >
            Senha
            <input
              className={ style.input }
              placeholder="123456"
              type="password"
              data-testid="password-input"
              required
              name="password"
              value={ password }
              onChange={ handlePasswordChange }
            />
          </label>
        </div>
        <button
          className={ style.button }
          type="submit"
          disabled={ !loginValidation() }
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

export default Login;
