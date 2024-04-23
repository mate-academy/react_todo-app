import React, { useEffect, useReducer } from 'react';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

type Action =
  | { type: 'setTodos'; newTodos: Todo[] }
  | { type: 'setFilterType'; newFilterType: Filter }
  | { type: 'addTodo' }
  | { type: 'setTitle'; text: string }
  | { type: 'checked'; id: number }
  | { type: 'remove'; id: number }
  | { type: 'todos'; payload: Todo[] }
  | { type: 'changeTodo'; id: number; newTodo: Todo };

interface State {
  todos: Todo[];
  filterType: Filter;
  title: string;
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addTodo':
      const newTodo = {
        id: +new Date(),
        title: state.title.trim(),
        completed: false,
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
      };

    case 'setTodos':
      return {
        ...state,
        todos: action.newTodos,
      };

    case 'setTitle':
      return {
        ...state,
        title: action.text,
      };

    case 'setFilterType':
      return {
        ...state,
        filterType: action.newFilterType,
      };

    case 'remove':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };

    case 'changeTodo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id ? action.newTodo : todo,
        ),
      };

    case 'todos':
      return {
        ...state,
        todos: action.payload,
      };

    case 'checked':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id === action.id) {
              return {
                ...todo,
                completed: !todo.completed,
              };
            } else {
              return todo;
            }
          }),
        ],
      };

    default:
      return state;
  }
}

const keyIsPresent = localStorage.getItem('todos');

const initialState: State = {
  title: '',
  todos: keyIsPresent ? JSON.parse(keyIsPresent) : [],
  filterType: Filter.All,
};

const defaultDispatch: React.Dispatch<Action> = () => {};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext(defaultDispatch);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [{ todos, filterType, title }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={{ todos, filterType, title }}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
