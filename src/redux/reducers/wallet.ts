// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Importar a action da pessoa usuária
import { WALLET_DATA,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  IS_EDIT,
  EDIT_EXPENSE,
} from '../actions';

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
        // Aqui estamos salvando as moedas no estado global
        currencies: action.payload,
      };
    case ADD_EXPENSE:
      return {
        ...state,
        // Aqui estamos adicionando um novo objeto ao array de despesas, com o id sendo o tamanho do array de despesas, e o resto das informações sendo o payload
        expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }],
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        // Aqui estamos filtrando o array de despesas, removendo o objeto que tenha o id igual ao payload
        expenses: state.expenses.filter((expense: any) => expense.id !== action.payload),
      };
    case IS_EDIT:
      return {
        ...state,
        // Aqui estamos salvando o valor do payload no editor
        editor: action.payload.editor,
        // Aqui estamos salvando o valor do id no idToEdit
        idToEdit: action.payload.idToEdit,
      };
    case EDIT_EXPENSE:
      return {
        ...state,
        editor: false,
        // Aqui estamos mapeando o array de despesas, e para cada objeto, verificamos se o id é igual ao id que está sendo editado.
        // Se for, retornamos o objeto com as informações do payload. Se não for, retornamos o objeto sem alterações
        expenses: state.expenses.map((expense: any) => {
          if (expense.id === state.idToEdit) {
            console.log(action.payload);
            return {
              ...expense,
              ...action.payload,
            };
          }
          return expense;
        }),
      };
    default:
      return state;
  }
}

export default walletRedux;
