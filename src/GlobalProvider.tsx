import React, { useEffect } from 'react';
import { State } from './types/State';
import { Filter } from './types/Filter';
import { Action } from './types/Action';

const savedData = localStorage.getItem('todos');

const initialState: State = {
  todos: savedData ? JSON.parse(savedData) : [],
  filter: Filter.All,
};

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
    case 'changeTodo':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo =>
            todo.id === action.payload.id ? action.payload : todo,
          ),
        ],
      };
    case 'changeSomeTodos':
      return {
        ...state,
        todos: action.payload,
      };
    case 'setFilter':
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}

const StateContext = React.createContext<State>(initialState);
const DispatchContext = React.createContext<React.Dispatch<Action>>(() => {});

interface Props {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useDispatch = () => React.useContext(DispatchContext);
export const useGlobalState = () => React.useContext(StateContext);
