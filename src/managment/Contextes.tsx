import React, {
  useReducer, useEffect, useState, createContext,
} from 'react';
import { State } from '../types/State';
import { Filter } from '../types/Filter';
import { Action, reducer } from './reduser';
import { Todo } from '../types/Todo';

const initialState: State = {
  todos: [],
  filterTp: Filter.all,
};

function useLocalStoreg(
  key: string, initialValue: Todo[],
): [Todo[], (value: Todo[]) => void] {
  const [value, setValue] = useState(() => {
    const sortedValue = localStorage.getItem(key);

    return sortedValue ? JSON.parse(sortedValue) : initialValue;
  });

  const save = (newValue: Todo[]): void => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
}

export const TodoContext = React.createContext(initialState);
export const DispatchContext = createContext((action: Action) => {
  // eslint-disable-next-line no-console
  console.debug(action);
});

type Props = {
  children: React.ReactNode,
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [localTodos, setLocalTodos]
   = useLocalStoreg('todos', initialState.todos);

  const [state, dispatch] = useReducer(reducer, localTodos);

  const { todos } = state;

  useEffect(() => {
    if (todos) {
      setLocalTodos(todos);
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, setLocalTodos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodoContext.Provider value={state}>
        {children}
      </TodoContext.Provider>
    </DispatchContext.Provider>
  );
};
