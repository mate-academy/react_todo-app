import { createContext, useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

type Action = { type: 'addTodo', payload: Todo }
| { type: 'removeTodo', payload: number }
| { type: 'changeTodo', payload: number }
| { type: 'filterBy', payload: Status }
| { type: 'clearCompleted' }
| { type: 'changeAllCompleted', payload: boolean }
| { type: 'editTodo', payload: Todo };

const initialState = {
  todos: [],
  filterBy: Status.All,
};

type State = {
  todos: Todo[];
  filterBy: Status;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'addTodo':
      return { ...state, todos: [...state.todos, action.payload] };

    case 'removeTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'changeTodo':
      return {
        ...state,
        todos: state.todos.map(todo => (
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )),
      };

    case 'filterBy':
      return { ...state, filterBy: action.payload };

    case 'clearCompleted':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'changeAllCompleted':
      return {
        ...state,
        todos: state.todos.map(
          todo => ({ ...todo, completed: action.payload }),
        ),
      };

    case 'editTodo':
      return {
        ...state,
        todos: state.todos.map(
          todo => (todo.id === action.payload.id ? action.payload : todo),
        ),
      };

    default:
      return state;
  }
};

const getStoredTodos = () => {
  const storedTodos = localStorage.getItem('todos');

  return {
    ...initialState,
    todos: storedTodos ? JSON.parse(storedTodos) : [],
  };
};

export const StateContext = createContext<State>(initialState);
export const DispatchContext
  = createContext<(action: Action) => void>(() => { });

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, getStoredTodos);
  const { todos } = state;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
