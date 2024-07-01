import { Todo } from '../types/Todo';
import { FilterButtons } from '../types/FilterType';
import { PropsWithChildren, createContext, useEffect, useReducer } from 'react';
import React from 'react';
import { Action } from '../types/Action';

export type ContextType = {
  todos: Todo[];
  toDoTitle: string;
  setTodos: (currentTodos: Todo[]) => void;
  setToDoTitle: (title: string) => void;
  filterButton: FilterButtons;
  setFilterButton: (filterButton: FilterButtons) => void;
  focusOnTodo: boolean;
};

const reducer = (state: ContextType, action: Action): ContextType => {
  switch (action.type) {
    case 'GET TODOS FROM STORAGE':
      return {
        ...state,
        todos: [...action.todos],
      };
    case 'ADD TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            title: state.toDoTitle.trim(),
            completed: false,
            editted: false,
          },
        ],
      };
    case 'ADD NEW TITLE':
      return {
        ...state,
        toDoTitle: action.newTitle,
      };
    case 'DELETE TODO':
      return {
        ...state,
        todos: [...state.todos.filter(todo => todo.id !== action.idNumber)],
      };
    case 'CHANGE TODO STATUS':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id === action.idNumber) {
              return {
                ...todo,
                title: todo.title.trim(),
                completed: !todo.completed,
              };
            }

            return todo;
          }),
        ],
      };
    case 'FOCUS NEW TODO':
      return {
        ...state,
        focusOnTodo: !state.focusOnTodo,
      };
    case 'SET FILTER':
      return {
        ...state,
        filterButton: action.filter,
      };
    case 'TOGGLE TODOS':
      const completedTodos = state.todos.filter(todo => todo.completed);
      const allTodosAreCompleted = state.todos.length === completedTodos.length;

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
    case 'CLEAR COMPLETED':
      return {
        ...state,
        todos: [...state.todos.filter(todo => !todo.completed)],
      };
    case 'UPDATE TITLE':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id === action.idNumber) {
              return {
                ...todo,
                title: action.edittedTitle,
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

const getPresentTodosToStorage = (): Todo[] => {
  const data = localStorage.getItem('todos');

  if (data === null) {
    return [];
  }

  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

const initialStateFromStorage: ContextType = {
  todos: getPresentTodosToStorage(),
  toDoTitle: '',
  setTodos: () => {},
  setToDoTitle: () => {},
  filterButton: FilterButtons.All,
  setFilterButton: () => {},
  focusOnTodo: false,
};

export const StateContext = createContext(initialStateFromStorage);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Dispatch = React.createContext((_action: Action) => {});

export const ToDoProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialStateFromStorage);

  useEffect(() => {
    localStorage.removeItem('todos');
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <Dispatch.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </Dispatch.Provider>
  );
};
