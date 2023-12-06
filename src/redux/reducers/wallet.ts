// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Importar a action da pessoa usuária
import { WALLET_DATA, ADD_EXPENSE } from '../actions';

// Definindo o estado inicial
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica se uma despesa está sendo editada
  idToEdit: 0, // valor numérico que indica o id da despesa que está sendo editada
};

function walletRedux(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case WALLET_DATA:
      return {
        ...state,
        currencies: action.payload,
      };
    case ADD_EXPENSE:
      return {

      };
    default:
      return state;
  }
}

export default walletRedux;
