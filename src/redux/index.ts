// Requisito 01 pede para armazenar no estado global, para isso, preciso criar uma store
import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { mainReducer } from './reducers';

const store = createStore(mainReducer, composeWithDevTools());

export default store;
