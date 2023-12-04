import { Link } from 'react-router-dom';

function Login() {
  return (
    <>
      <h3> Login </h3>
      <label
        htmlFor="e-mail"
      >
        Insira seu e-mail
        <input
          placeholder="usuario@provedor.com"
          type="e-mail"
          data-testid="email-input"
          required
          name="email"
          // value={ email }
          // onChange={ handleChange }
        />
      </label>
      <label
        htmlFor="password"
      >
        Insira sua senha
        <input
          placeholder="123456"
          type="password"
          data-testid="password-input"
          required
          name="password"
          // value={ password }
          // onChange={ handleChange }
        />
      </label>
      <Link
        to="/carteira"
      >
        <button
          disabled
        >
          Entrar
        </button>
      </Link>
    </>
  );
}

export default Login;
