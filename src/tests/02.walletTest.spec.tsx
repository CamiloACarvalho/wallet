import { act, screen, waitFor } from '@testing-library/react';
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

  it('03 - Validando todo o formulário', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const expense = screen.getByTestId('total-field');
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

    // Verifica se o total é zero antes de iniciar a tabela
    expect(expense).toHaveTextContent('0');

    // Simula o preenchimento dos campos
    await act(async () => {
      // Preenchendo os campos para habilitar o botão
      await userEvent.type(valueInput, '10');
      await userEvent.type(coinInput, 'USD');
      await userEvent.type(paymentInput, 'Dinheiro');
      await userEvent.type(tagInput, 'Lazer');
      await userEvent.type(descriptionInput, 'Cinema');
      await userEvent.click(addExpenseButton);
    });

    // buscando os elementos da tabela após inserir os dados
    const description = await screen.findByTestId('description');
    const tag = await screen.findByTestId('tag');
    const method = await screen.findByTestId('method');
    const value = await screen.findByTestId('value');
    const code = await screen.findByTestId('code');
    const rate = await screen.findByTestId('rate');
    const currency = await screen.findByTestId('currency');
    const name = await screen.findByTestId('name');
    const btnEdit = await screen.findByTestId('edit-btn');
    const btnDelete = await screen.findByTestId('delete-btn');

    // Verifica se os elementos estão na tela
    expect(expense).toBeInTheDocument();
    await waitFor(() => expect(description).toBeInTheDocument());
    await waitFor(() => expect(tag).toBeInTheDocument());
    await waitFor(() => expect(method).toBeInTheDocument());
    await waitFor(() => expect(value).toBeInTheDocument());
    await waitFor(() => expect(code).toBeInTheDocument());
    await waitFor(() => expect(rate).toBeInTheDocument());
    await waitFor(() => expect(currency).toBeInTheDocument());
    await waitFor(() => expect(name).toBeInTheDocument());
    await waitFor(() => expect(btnEdit).toBeInTheDocument());
    await waitFor(() => expect(btnDelete).toBeInTheDocument());

    await act(async () => {
      // Preenchendo os campos para habilitar o botão
      await userEvent.click(btnEdit);
    });

    // Busca o botão de editar despesa
    const changeNameButton = await screen.findByRole('button', { name: /Editar despesa/i });

    // Verifica se o botão está na tela
    await waitFor(() => expect(changeNameButton).toBeInTheDocument());

    // Clica no botão de editar despesa
    await act(async () => {
      await userEvent.click(changeNameButton);
    });

    // Busca o botão original de adicionar despesa
    const addButton = await screen.findByRole('button', { name: /Adicionar despesa/i });

    // Verifica se o botão está na tela
    await waitFor(() => expect(addButton).toBeInTheDocument());

    // Verificando o botão de excluir despesa
    await act(async () => {
      await userEvent.click(btnDelete);
    });

    // espera que não exista nada nada na tabela
    await waitFor(() => expect(description).not.toBeInTheDocument());
  });
});
