import React, { createContext, useEffect, useReducer } from 'react';
import { Action } from '../types/Action';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';

type StateContextType = {
  todos: Todo[];
  toDoTitle: string;
  filter: FilterType;
  edittedTitle: string;
};

const reducer = (state: StateContextType, action: Action): StateContextType => {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodo: Todo = {
        id: Date.now(),
        title: state.toDoTitle.trim(),
        completed: false,
        editted: false,
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    case 'WRITE_NEW_TITLE':
      return {
        ...state,
        toDoTitle: action.newTitle,
      };
    case 'CHANGE_STATUS':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id === action.id) {
              return {
                ...todo,
                completed: !todo.completed,
              };
            }

            return todo;
          }),
        ],
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: [...state.todos.filter(todo => todo.id !== action.id)],
      };
    case 'FILTER_TODOS':
      return {
        ...state,
        filter: action.filteredOptions,
      };
    case 'REMOVE_COMPLETED':
      return {
        ...state,
        todos: [...state.todos.filter(todo => !todo.completed)],
      };
    case 'TOGGLE_ALL_TODOS':
      const allTodosAreCompleted =
        state.todos.filter(todo => todo.completed).length ===
        state.todos.length;

      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (allTodosAreCompleted) {
              return {
                ...todo,
                completed: false,
              };
            } else if (!allTodosAreCompleted) {
              return {
                ...todo,
                completed: true,
              };
            }

            return todo;
          }),
        ],
      };
    case 'EDIT_TODO':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id === action.id) {
              return {
                ...todo,
                title: todo.title.trim(),
                editted: !todo.editted,
              };
            }

            return todo;
          }),
        ],
        edittedTitle:
          state.todos.find(todo => todo.id === action.id)?.title || '',
      };
    case 'CHANGE_TITLE':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id === action.id) {
              return {
                ...todo,
                title: action.changedTitle,
              };
            }

            return todo;
          }),
        ],
      };
    case 'HANDLE_ESCAPE':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id === action.id) {
              return {
                ...todo,
                title: state.edittedTitle,
              };
            }

            return todo;
          }),
        ],
      };

    default:
      return state;
  }
};

const visibleTodos = (): Todo[] => {
  const dataFromStorage = localStorage.getItem('todos');

  if (dataFromStorage === null) {
    return [];
  }

  try {
    return JSON.parse(dataFromStorage);
  } catch (e) {
    return [];
  }
};

const InitialState: StateContextType = {
  todos: visibleTodos(),
  toDoTitle: '',
  filter: FilterType.ALL,
  edittedTitle: '',
};

export const StateContext = createContext(InitialState);

type Props = {
  children: React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = createContext((_action: Action) => {});

export const GlobalStateProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  useEffect(() => {
    localStorage.removeItem('todos');
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
