import React, { Dispatch, useEffect, useReducer } from 'react';
import { Action } from '../type/Action';
import { Todo } from '../type/Todo';

const STORAGE_KEY = 'todos';

const initialTodos = () => {
  const storedTodos = localStorage.getItem(STORAGE_KEY);

  return storedTodos ? JSON.parse(storedTodos) : [];
};

export const useLocalStorage = (
  reducer: React.Reducer<Todo[], Action>,
  startValue: Todo[],
): [Todo[], Dispatch<Action>] => {
  const [todos, dispatch] = useReducer(reducer, startValue, initialTodos);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  return [todos, dispatch];
};
