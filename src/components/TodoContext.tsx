import React, { useReducer } from 'react';
import { Filter } from '../types/Filter';
import { State } from '../types/State';
import { Action, reducer } from './reducer';

const initialState: State = {
  todos: [],
  filterBy: Filter.all,
  addTodo: () => {},
  setTodos: () => {},
};

type Props = {
  children: React.ReactNode;
};

export const StateContext = React.createContext<State>(initialState);

export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

export const TodoProvider: React.FC<Props> = ({ children }) => {
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  // const { todos } = state;

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
