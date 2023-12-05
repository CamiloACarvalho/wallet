// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Importar a action da pessoa usuária
import { WALLET_DATA } from '../actions';

// Definindo o estado inicial
const INITIAL_STATE = {

};

function walletRedux(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case WALLET_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export default walletRedux;
