// Importando o Thunkdispatch para que possamos fazer requisições assíncronas
import { ThunkDispatch } from 'redux-thunk';
// Importando o AnyAction para que possamos tipar a action
import { AnyAction } from 'redux';

// Coloque aqui suas actions
export const USER_DATA = 'USER_DATA';
export const WALLET_DATA = 'WALLET_DATA';
export const API_DATA = 'API_DATA';
export const ERROR = 'ERROR';

const URL = 'https://economia.awesomeapi.com.br/json/all';

export const userData = (payload: any) => {
  return {
    type: USER_DATA,
    payload,
  };
};

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

export const fetchData = () => {
  return async (dispatch: ThunkDispatch<ReduxState, null, AnyAction>) => {
    dispatch({ type: API_DATA });
    try {
      const response = await fetch(URL);
      const data = await response.json();
      dispatch(userData(data));
    } catch (error: any) {
      dispatch({ type: ERROR, error });
    }
  };
};
