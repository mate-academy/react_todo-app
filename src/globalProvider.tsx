import React, { createContext, useEffect, useReducer } from 'react';
import { Todo } from './types/types';

export enum ActionType {
  Add = 'addTodo',
  Delete = 'deleteTodo',
  Update = 'updateTodo',
  Toggle = 'toggleTodo',
  DeleteCompleted = 'deleteCompleted',
  ToggleAll = 'toggleAll',
}

type Actions =
  | { type: ActionType.Add; payload: Todo }
  | { type: ActionType.Delete; payload: number }
  | { type: ActionType.Update; payload: { id: number; title: string } }
  | { type: ActionType.Toggle; payload: { id: number; status: boolean } }
  | { type: ActionType.DeleteCompleted; payload: number[] }
  | { type: ActionType.ToggleAll; payload: boolean };

const reducer = (state: Todo[], action: Actions): Todo[] => {
  switch (action.type) {
    case ActionType.Add:
      return [...state, action.payload];

    case ActionType.Delete:
      return state.filter(cur => cur.id !== action.payload);

    case ActionType.Update:
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo,
      );

    case ActionType.Toggle:
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: action.payload.status }
          : todo,
      );

    case ActionType.DeleteCompleted:
      return state.filter(todo => !action.payload.includes(todo.id));

    case ActionType.ToggleAll:
      return state.map(todo => ({ ...todo, completed: action.payload }));

    default:
      return state;
  }
};

const initializer = (initialValue: Todo[]): Todo[] => {
  const data = localStorage.getItem('todos');

  if (data === null) {
    return initialValue;
  }

  try {
    return JSON.parse(data);
  } catch {
    return initialValue;
  }
};

const initialState: Todo[] = [];

const StateContext = createContext<Todo[]>(initialState);
const DispatchContext = createContext<React.Dispatch<Actions>>(() => {});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState, initializer);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useGlobalState = () => React.useContext(StateContext);
export const useDispatch = () => React.useContext(DispatchContext);
