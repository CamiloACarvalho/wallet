// Esse reducer será responsável por tratar as informações da pessoa usuária
// Importar a action da pessoa usuária
import { USER_DATA } from '../actions';

// Definindo o estado inicial
const INITIAL_STATE = {
  email: '',
};

function userRedux(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export default userRedux;
