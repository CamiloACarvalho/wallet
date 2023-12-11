import { screen } from '@testing-library/dom';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Realizando tste para a página de login', () => {
  it('01 - Validando os campos de login', () => {
    // Renderiza o componente
    renderWithRouterAndRedux(<App />);

    // Busca o input de email
    const emailInput = screen.getByTestId('email-input');
    // Busca o input de senha
    const passwordInput = screen.getByTestId('password-input');
    // Busca o botão de login
    const loginButton = screen.getByTestId('login-submit-btn');

    // Verifica se os inputs estão na tela
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('02 - Validando se o botão está desabilitado/habilitado', () => {
    // Renderiza o compoenente e simula o login
    const { user } = renderWithRouterAndRedux(<App />);

    // Busca o input de email
    const emailInput = screen.getByTestId('email-input');
    // Busca o input de senha
    const passwordInput = screen.getByTestId('password-input');
    // Busca o botão de login
    const loginButton = screen.getByTestId('login-submit-btn');

    // Verifica se o botão está desabilitado
    expect(loginButton).toBeDisabled();

    // Preenchendo os campos para habilitar o botão
    user.type(emailInput, 'user@email.com');
    user.type(passwordInput, '1234567');

    // verifica se o botão está habilitado
    expect(loginButton).not.toBeDisabled();
  });
});
