import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const email = 'email-input';
const password = 'password-input';

describe('Realizando tste para a página de login', () => {
  it('01 - Validando os campos de login', () => {
    // Renderiza o componente
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    // Busca o input de email
    const emailInput = screen.getByTestId(email);
    // Busca o input de senha
    const passwordInput = screen.getByTestId(password);
    // Busca o título da página
    const pageTitle = screen.getByRole('heading', { level: 1 });

    // Verifica se os inputs estão na tela
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  it('02 - Validando se o botão está desabilitado/habilitado', async () => {
    // Renderiza o compoenente e simula o login
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    // Busca o input de email
    const emailInput = screen.getByTestId(email);
    // Busca o input de senha
    const passwordInput = screen.getByTestId(password);
    // Busca o botão de login
    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    // Verifica se o botão está desabilitado
    expect(loginButton).toBeDisabled();

    // Simula o preenchimento dos campos
    await act(async () => {
    // Preenchendo os campos para habilitar o botão
      await userEvent.type(emailInput, 'user@email.com');
      await userEvent.type(passwordInput, '1234567');
    });
    // verifica se o botão está habilitado
    expect(loginButton).not.toBeDisabled();
  });

  it('03 - Validando se ao clilcar no botão de entrar ele redireciona para a página de carteira', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    // Busca o input de email
    const emailInput = screen.getByTestId(email);
    // Busca o input de senha
    const passwordInput = screen.getByTestId(password);
    // Busca o botão de login
    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    // Simula o preenchimento dos campos
    await act(async () => {
      // Preenchendo os campos para habilitar o botão
      await userEvent.type(emailInput, 'user@email.com');
      await userEvent.type(passwordInput, '1234567');
      await userEvent.click(loginButton);
    });

    // Busca o título da página de carteira
    const userName = screen.getByTestId('email-field');

    expect(userName).toBeInTheDocument();
  });
});
