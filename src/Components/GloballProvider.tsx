import React, { useEffect, useReducer } from 'react';
import { findMaxId } from '../utils/functions';
import { Action } from '../Types/Actions';
import { State } from '../Types/State';

type Props = {
  children: React.ReactNode;
};

const initialState: State = {
  inputValue: '',
  allTodos: [],
  activeButton: 'all',
  isToggled: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'submit':
      return {
        ...state,
        inputValue: '',
        allTodos: [
          ...state.allTodos,
          {
            id: findMaxId(state.allTodos),
            title: action.payload,
            completed: false,
          },
        ],
      };

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
            return { ...todo, isCompleted: !todo.completed };
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
        isToggled: !state.isToggled,
        allTodos: state.allTodos.map(todo => {
          return {
            ...todo,
            isCompleted: !state.isToggled,
          };
        }),
      };

    case 'editTodoName':
      return {
        ...state,
        allTodos: state.allTodos.map(todo =>
          todo.id === action.payload.todoId
            ? { ...todo, todoName: action.payload.newTodoName }
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
