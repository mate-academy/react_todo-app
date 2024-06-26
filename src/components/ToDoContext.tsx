import { Todo } from '../types/Todo';
import { FilterButtons } from '../types/FilterType';
import { createContext, useReducer } from 'react';
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

type Props = {
  children: React.ReactNode;
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
    case 'EDIT TODO':
      return {
        ...state,
        todos: [
          ...state.todos
            .map(todo => {
              if (todo.id === action.idNumber) {
                return {
                  ...todo,
                  title: todo.title.trim(),
                  editted: !todo.editted,
                };
              }

              return todo;
            })
            .filter(todo => todo.title),
        ],
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

const defaultDispatch: React.Dispatch<Action> = () => {};

export const ProvideContext: ContextType = {
  todos: [],
  toDoTitle: '',
  setTodos: () => {},
  setToDoTitle: () => {},
  filterButton: FilterButtons.All,
  setFilterButton: () => {},
  focusOnTodo: false,
};

export const StateContext = createContext(ProvideContext);
export const Dispatch = createContext(defaultDispatch);

export const ToDoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, ProvideContext);

  return (
    <Dispatch.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </Dispatch.Provider>
  );
};
