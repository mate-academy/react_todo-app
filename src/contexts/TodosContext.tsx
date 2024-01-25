import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';

import { Todo } from '../types/Todo';
import { ContextProvider } from '../types/ContextProvider';
import { TodosFilterQuery, LocalStorageName } from '../constants';
import { QueryContext } from './QueryContext';
import getLocalStorageItem from '../utils/getLocalStorageItem';
import setLocalStorageItem from '../utils/setLocalStorageItem';

const todosFromStorage: Todo[] = (
  getLocalStorageItem(LocalStorageName.todos)
  || []
);

interface TodosContextType {
  todos: Todo[];
  preparedTodos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodosContext = React.createContext<TodosContextType>({
  todos: todosFromStorage,
  preparedTodos: todosFromStorage,
  setTodos: () => { },
});

export const TodosProvider: React.FC<ContextProvider> = ({ children }) => {
  const [todos, setTodos] = useState(todosFromStorage);
  const { query } = useContext(QueryContext);

  useEffect(() => {
    setLocalStorageItem(LocalStorageName.todos, todos);
  }, [todos]);

  const value: TodosContextType = useMemo(() => {
    const getPreparedTodos = () => {
      switch (query) {
        case TodosFilterQuery.active:
          return todos.filter(todo => !todo.completed);
        case TodosFilterQuery.completed:
          return todos.filter(todo => todo.completed);
        default:
          return todos;
      }
    };

    const preparedTodos = getPreparedTodos();

    return {
      todos,
      preparedTodos,
      setTodos,
    };
  }, [todos, query]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
