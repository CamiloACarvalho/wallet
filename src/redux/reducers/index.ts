// import user from './user';
// import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

// Como são dois reducer, precisaremos de um combineReducers para junta-los em um só
import { combineReducers } from 'redux';

// Importando os reducers que vamos combina-los
import userRedux from './user';
import walletRedux from './wallet';

// Fazendo a combinação deles
export const mainReducer = combineReducers({
  user: userRedux,
  wallet: walletRedux,
});
