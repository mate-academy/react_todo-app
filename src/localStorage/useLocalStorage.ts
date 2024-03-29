import React, { Dispatch, useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { Action } from '../types/Action';

const STORAGE_KEY = 'todos';

const initialValue = () => {
  const storedTodos = localStorage.getItem(STORAGE_KEY);

  return storedTodos ? JSON.parse(storedTodos) : [];
};

export const useLocalStorage = (
  reducer: React.Reducer<Todo[], Action>,
  startValue: Todo[],
): [Todo[], Dispatch<Action>] => {
  const [todos, dispatch] = useReducer(reducer, startValue, initialValue);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  return [todos, dispatch];
};

