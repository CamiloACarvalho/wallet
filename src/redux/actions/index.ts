// Importando o Thunkdispatch para que possamos fazer requisições assíncronas
import { ThunkDispatch } from 'redux-thunk';
// Importando o AnyAction para que possamos tipar a action
import { AnyAction } from 'redux';

// Criando as actions
export const USER_DATA = 'USER_DATA';
export const WALLET_DATA = 'WALLET_DATA';
export const API_DATA = 'API_DATA';
export const ERROR = 'ERROR';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const IS_EDIT = 'IS_EDIT';

const URL = 'https://economia.awesomeapi.com.br/json/all';

// Action para salvar os dados da pessoa usuária
export const userData = (payload: any) => {
  return {
    type: USER_DATA,
    payload,
  };
};

// Action para salvar os dados da API
export const walletData = (payload: any) => {
  return {
    type: WALLET_DATA,
    payload,
  };
};

// Criando o tipo do estado global de wallet
type ReduxState = {
  api: {
    code: string,
    codein: string,
    name: string,
    high: string,
    low: string,
    varBid: string,
    pctChange: string,
    bid: string,
    ask: string,
    timestamp: string,
    create_date: string,
  },
};

// Action para fazer a requisição assíncrona da API
export const fetchData = () => {
  return async (dispatch: ThunkDispatch<ReduxState, null, AnyAction>) => {
    dispatch({ type: API_DATA });
    try {
      const response = await fetch(URL);
      let data = await response.json();
      data = Object.keys(data).filter((key) => key !== 'USDT');
      dispatch(walletData(data));
    } catch (error: any) {
      dispatch({ type: ERROR, error });
    }
  };
};

// Action para adicionar uma despesa
export const expenseData = (payload: any) => {
  return {
    type: ADD_EXPENSE,
    payload,
  };
};

// Action para deletar uma despesa
export const deleteExpense = (id: number) => {
  return {
    type: DELETE_EXPENSE,
    payload: id,
  };
};

// Action para editar uma despesa
export const isEdit = (editForm: boolean, id: number) => {
  return {
    // Type é o nome da action
    type: IS_EDIT,
    // Payload é o valor que será passado para o reducer
    payload: {
      editor: editForm,
      idToEdit: id,
    },
  };
};

export const editing = (expense: any) => {
  return {
    // Type é o nome da action
    type: EDIT_EXPENSE,
    // Payload é o valor que será passado para o reducer
    payload: expense,
  };
};
