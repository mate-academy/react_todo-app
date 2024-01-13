import React, { useReducer } from 'react';
import { Todo } from '../types/Todo';
import todos from '../api/todos.json';
import { deleteTodo, switchCompleted, switchToggleAll } from '../services/todo';

type State = {
  todos: Todo[];
};

type Action
  = { type: 'addTodo', payload: string }
  | { type: 'toggle', payload: { id: number, status: boolean } }
  | { type: 'delete', payload: number }
  | { type: 'toggleAll', payload: boolean }
  | { type: 'loadFromStorage' };

type Props = {
  children: React.ReactNode;
};

export const initialState: State = {
  todos: [...todos],
};

const reducer = (state: State, action: Action): State => {
  let newState: State = { ...state };
  let stateFromStorage: string | null = null;

  switch (action.type) {
    case 'addTodo':
      newState = {
        ...state,
        todos: [
          ...state.todos,
          { id: +new Date(), title: action.payload, completed: false },
        ],
      };
      localStorage.setItem('todos', JSON.stringify(newState));

      return newState;

    case 'toggle':
      newState = {
        ...state,
        todos: switchCompleted(
          action.payload.id,
          action.payload.status,
          state.todos,
        ),
      };
      localStorage.setItem('todos', JSON.stringify(newState));

      return newState;

    case 'delete':
      newState = {
        ...state,
        todos: deleteTodo(action.payload, state.todos),
      };
      localStorage.setItem('todos', JSON.stringify(newState));

      return newState;

    case 'toggleAll':
      newState = {
        ...state,
        todos: switchToggleAll(action.payload, state.todos),
      };
      localStorage.setItem('todos', JSON.stringify(newState));

      return newState;

    case 'loadFromStorage':
      stateFromStorage = localStorage.getItem('todos');
      if (stateFromStorage) {
        newState = JSON.parse(stateFromStorage);
      }

      return newState;

    default:
      return state;
  }
};

export const TodosContext = React.createContext(initialState);
export const DispatchContext
  = React.createContext((() => { }) as React.Dispatch<Action>);

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={state}>
        {children}
      </TodosContext.Provider>
    </DispatchContext.Provider>
  );
};
