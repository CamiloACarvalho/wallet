import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Realizando testes para a oágina de carteira', () => {
  it('01 - Validando se existem todos os elementos na tela', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    // Busca o usuário
    const userLogin = screen.getByTestId('email-field');
    // Busca o total de gastos
    const expense = screen.getByTestId('total-field');
    // Busca a moeda local
    const coin = screen.getByTestId('header-currency-field');
    // Busca o input do valor
    const valueInput = screen.getByTestId('value-input');
    // Busca o input das moedas
    const coinInput = screen.getByTestId('currency-input');
    // Busca a forma de pagamento
    const paymentInput = screen.getByTestId('method-input');
    // Busca a tag de descrição
    const tagInput = screen.getByTestId('tag-input');
    // Busca o input da descrição
    const descriptionInput = screen.getByTestId('description-input');
    // Busca o botão de adicionar despesa
    const addExpenseButton = screen.getByTestId('button-submit');

    // Verifica se os elementos estão na tela
    expect(userLogin).toBeInTheDocument();
    expect(expense).toBeInTheDocument();
    expect(coin).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(coinInput).toBeInTheDocument();
    expect(paymentInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(addExpenseButton).toBeInTheDocument();
  });

  it('02 - Validando se o e-mail do usuário estará na tela', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    // Busca o input de email
    const emailInput = screen.getByTestId('email-input');
    // Busca o input de senha
    const passwordInput = screen.getByTestId('password-input');
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

    expect(userName).toHaveTextContent('user@email.com');
  });
});
