import { Dispatch, useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { Actions } from '../types/Actions';

const LOCAL_STORAGE_KEY = 'todos';

const intialTodos = () => {
  const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);

  return storedTodos ? JSON.parse(storedTodos) : [];
};

export const useLocalStorage = (
  reducer: React.Reducer<Todo[], Actions>,
  intialState: Todo[],
): [Todo[], Dispatch<Actions>] => {
  const [todos, updateTodos] = useReducer(reducer, intialState, intialTodos);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  return [todos, updateTodos];
};
