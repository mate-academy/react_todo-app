import React, { useEffect, useReducer } from 'react';
import { StatusAction, Todo, TodoAction } from '../types/TodoApp';
import { statusReducer, todoReducer } from './reducers';

interface State {
  todos: Todo[];
  status: string;
}

let initialTodos: Todo[] = [];

try {
  const data = localStorage.getItem('todos');

  if (data !== null) {
    initialTodos = JSON.parse(data);
  }
} catch {
  throw new Error();
}

const initialState: State = {
  todos: initialTodos,
  status: 'all',
};

type ActionTypes = TodoAction | StatusAction;

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<ActionTypes>>(
  () => null,
);

const mainReducer = ({ todos, status }: State, action: ActionTypes) => ({
  todos: todoReducer(todos, action as TodoAction),
  status: statusReducer(status, action as StatusAction),
});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
