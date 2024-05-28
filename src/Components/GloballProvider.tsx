import React, { useEffect, useReducer } from 'react';
import { findMaxId, getStoredArray } from '../utils/functions';
import { Action } from '../Types/Actions';
import { State } from '../Types/State';

type Props = {
  children: React.ReactNode;
};

const initialState: State = {
  inputValue: '',
  allTodos: getStoredArray(),
  activeButton: 'all',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'submit':
      if (action.payload.trim()) {
        return {
          ...state,
          inputValue: '',
          allTodos: [
            ...getStoredArray(),
            {
              id: findMaxId(state.allTodos),
              title: action.payload.trim(),
              completed: false,
            },
          ],
        };
      } else {
        return { ...state };
      }

    case 'onInputChange':
      return {
        ...state,
        inputValue: action.payload,
      };

    case 'onCheckboxChange':
      return {
        ...state,
        allTodos: state.allTodos.map(todo => {
          if (todo.id === action.payload) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        }),
      };

    case 'onTodoDelete':
      return {
        ...state,
        allTodos: state.allTodos.filter(todo => {
          return todo.id !== action.payload;
        }),
      };

    case 'showFiltered':
      return {
        ...state,
        activeButton: action.payload,
      };

    case 'showAll':
      return {
        ...state,
        activeButton: 'all',
      };

    case 'clearCompleted':
      return {
        ...state,
        allTodos: state.allTodos.filter(todo => {
          return !todo.completed;
        }),
      };

    case 'onToggle':
      return {
        ...state,
        allTodos: state.allTodos.map(todo => {
          return {
            ...todo,
            completed: action.payload,
          };
        }),
      };

    case 'editTodoName':
      return {
        ...state,
        allTodos: state.allTodos.map(todo =>
          todo.id === action.payload.todoId
            ? { ...todo, title: action.payload.newTodoName }
            : todo,
        ),
      };

    default:
      return state;
  }
}

export const StateContext = React.createContext<State>(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.allTodos));
  }, [state.allTodos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
