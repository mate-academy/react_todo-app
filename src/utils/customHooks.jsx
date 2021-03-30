import { useState, useEffect, useContext } from 'react';
import { getTodos } from './api';
import { userId } from './constants';
import { LoadingErrorConext } from './LoadingErrorContext';

export const useLocalStorage = (initValue) => {
  const [value, setValue] = useState(initValue);
  const { setLoadingError } = useContext(LoadingErrorConext);

  const loadData = async() => {
    setLoadingError(false);
    try {
      const listOfTodos = await getTodos();
      const filteredTodosServer = listOfTodos.filter(
        todo => todo.userId === userId,
      );

      setValue(filteredTodosServer);
    } catch (error) {
      setLoadingError(true);
    }
  };

  const save = (todos) => {
    setValue(todos);
  };

  useEffect(() => {
    loadData();
  }, []);

  return [value, save];
};
