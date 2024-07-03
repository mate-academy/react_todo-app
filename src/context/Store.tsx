import { createContext, useReducer } from 'react';
import { getLocalStorageData } from '../services/getLocalStorageData';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

type Action =
  | { type: 'add'; payload: string }
  | { type: 'delete'; payload: number }
  | { type: 'update'; payload: Todo }
  | { type: 'filterList'; payload: Filter }
  | { type: 'setAllComplete'; payload: boolean }
  | { type: 'clearAll' };

function reducer(todos: Todo[], action: Action) {
  let newTodos: Todo[] = [];

  switch (action.type) {
    case 'add':
      newTodos = [
        ...todos,
        { id: +new Date(), title: action.payload.trim(), completed: false },
      ];
      break;

    case 'delete':
      newTodos = todos.filter(t => t.id !== action.payload);
      break;

    case 'update':
      newTodos = todos.map(t =>
        t.id === action.payload.id ? action.payload : t,
      );
      break;

    case 'filterList':
      newTodos = todos.map(t => ({ ...t, filter: action.payload }));
      break;

    case 'setAllComplete':
      newTodos = todos.map(t => ({ ...t, completed: action.payload }));
      break;

    case 'clearAll':
      newTodos = todos.filter(t => !t.completed);
      break;

    default:
      return todos;
  }

  localStorage.setItem('todos', JSON.stringify(newTodos));

  return newTodos;
}

const initialTodos: Todo[] = getLocalStorageData('todos', []);

export const TodosContext = createContext(initialTodos);
// eslint-disable-next-line
export const DispatchContext = createContext((action: Action) => {action});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, initialTodos);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={todos}>{children}</TodosContext.Provider>
    </DispatchContext.Provider>
  );
};
