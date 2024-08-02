import React, { createContext, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

const TODOS_STORAGE_KEY = 'todos';

function saveTodosToLocalStorage(todos: Todo[] = []) {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
}

if (!localStorage.getItem(TODOS_STORAGE_KEY)) {
  saveTodosToLocalStorage();
}

interface State {
  todos: Todo[];
  filterBy: Filter;
}

type Action =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'filterBy'; payload: Filter }
  | { type: 'clearCompleted' }
  | { type: 'toggleAll' }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'toggleStatus'; payload: number }
  | { type: 'updateTodo'; payload: Omit<Todo, 'completed'> };

const reducer = (state: State, action: Action): State => {
  let todos = state.todos;

  switch (action.type) {
    case 'addTodo':
      todos = [...state.todos, action.payload];
      break;

    case 'filterBy':
      return {
        ...state,
        filterBy: action.payload,
      };

    case 'clearCompleted':
      todos = state.todos.filter(todo => !todo.completed);
      break;

    case 'toggleAll':
      const shouldBe = state.todos.some(todo => !todo.completed);

      todos = state.todos.map(todo => {
        return { ...todo, completed: shouldBe };
      });
      break;

    case 'deleteTodo':
      todos = state.todos.filter(todo => todo.id !== action.payload);
      break;

    case 'toggleStatus':
      todos = state.todos.map(todo => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });
      break;

    case 'updateTodo':
      todos = state.todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, title: action.payload.title };
        }

        return todo;
      });
      break;

    default:
      return state;
  }

  saveTodosToLocalStorage(todos);

  return {
    ...state,
    todos: todos,
  };
};

const initialState: State = {
  todos: JSON.parse(localStorage.getItem(TODOS_STORAGE_KEY) as string),
  filterBy: Filter.all,
};

export const StateContext = createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
