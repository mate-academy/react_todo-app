import React, { useEffect, useReducer } from 'react';
import { getTodos } from './services/services';
import { Status } from './types/Status';
import { Todo } from './types/Todo';

type State = {
  todos: Todo[];
  status: Status;
  filterBy: Status;
  newTodoTitle: string;
};

const initialTodos: Todo[] = getTodos();

const initialState: State = {
  todos: initialTodos,
  status: Status.All,
  filterBy: Status.All,
  newTodoTitle: '',
};

type Action =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'updateTodo'; payload: Todo }
  | { type: 'setTodoTitle'; payload: string }
  | { type: 'setStatus'; payload: Status }
  | { type: 'setNewStatus'; payload: Todo }
  | { type: 'setAllCompleted'; payload: boolean }
  | { type: 'setFilterByStatus'; payload: Status }
  | { type: 'ClearAllCompleted' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'deleteTodo':
      return {
        ...state,
        todos: [...state.todos.filter(todo => todo.id !== action.payload)],
      };

    case 'updateTodo':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo =>
            todo.id === action.payload.id
              ? { ...todo, title: action.payload.title }
              : todo,
          ),
        ],
      };

    case 'setTodoTitle':
      return {
        ...state,
        newTodoTitle: action.payload,
      };

    case 'ClearAllCompleted':
      return {
        ...state,
        todos: [...state.todos.filter(todo => !todo.completed)],
      };

    case 'setAllCompleted':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            return { ...todo, completed: action.payload };
          }),
        ],
      };

    case 'setStatus':
      return {
        ...state,
        status: action.payload,
      };

    case 'setFilterByStatus':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => ({ ...todo, filterBy: action.payload })),
        ],
        filterBy: action.payload,
      };

    case 'setNewStatus':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo =>
            todo.id === action.payload.id
              ? { ...todo, completed: !todo.completed }
              : todo,
          ),
        ],
      };

    default:
      return state;
  }
}

export const StateContext = React.createContext<State>(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  });

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
