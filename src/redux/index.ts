// Requisito 01 pede para armazenar no estado global, para isso, preciso criar uma store
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

// Usei o applyMiddleware para usar o thunk, que é um middleware que permite que eu faça requisições assíncronas
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

if (window.Cypress) {
  window.store = store;
}

export default store;
