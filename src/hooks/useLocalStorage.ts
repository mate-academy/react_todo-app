import { Dispatch, useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { Action } from '../types/Action';

const LOCAL_STORAGE_KEY = 'todos';

const intialTodos = () => {
  const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);

  return storedTodos ? JSON.parse(storedTodos) : [];
};

export const useLocalStorage = (
  reducer: React.Reducer<Todo[], Action>,
  intialState: Todo[],
): [Todo[], Dispatch<Action>] => {
  const [state, dispatch] = useReducer(reducer, intialState, intialTodos);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return [state, dispatch];
};
