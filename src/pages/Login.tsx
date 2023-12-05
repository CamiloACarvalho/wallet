import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  // Criando o link para navegar para outra página quando fizer o login
  const navigate = useNavigate();

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
  };

  return (
    <form onSubmit={ handleSubmit }>
      <h3>Login</h3>
      <label htmlFor="email">
        Insira seu e-mail
        <input
          placeholder="usuario@provedor.com"
          type="email"
          data-testid="email-input"
          required
          name="email"
          value={ email }
          onChange={ handleEmailChange }
        />
      </label>
      <label htmlFor="password">
        Insira sua senha
        <input
          placeholder="123456"
          type="password"
          data-testid="password-input"
          required
          name="password"
          value={ password }
          onChange={ handlePasswordChange }
        />
      </label>
      <button
        type="submit"
        disabled={ !loginValidation() }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
