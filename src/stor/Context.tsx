import React, { useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const PropsContext = React.createContext();

type Props = {
  children: React.ReactNode;
};

export const PropsProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const [filterField, setFilterField] = useState(FilerType.FILTER_TODO_ALL);

  const addTodo = useCallback(
    (newTodo: Todo) => {
      setTodos([...todos, newTodo]);
    },
    [setTodos, todos],
  );

  const updateTodo = useCallback(
    (newTodo: Todo) => {
      const newTodos = [...todos];
      const index = newTodos.findIndex(todo => todo.id === newTodo.id);

      newTodos.splice(index, 1, newTodo);

      setTodos(newTodos);
    },
    [setTodos, todos],
  );

  const deleteTodo = useCallback(
    (deletedTodo: Todo) => {
      const newTodos = todos.filter(todo => todo.id !== deletedTodo.id);

      setTodos(newTodos);
    },
    [setTodos, todos],
  );

  const clearCompleted = useCallback(() => {
    const deleteTodos = todos.filter(todo => todo.completed !== true);

    setTodos(deleteTodos);
  }, [setTodos, todos]);

  const toggleAll = useCallback(() => {
    const newTodos = [...todos];

    const result = newTodos.every(todo => todo.completed);

    if (result) {
      const changeTodos = newTodos.map(todo => {
        return { ...todo, completed: !todo.completed };
      });

      setTodos(changeTodos);
    } else {
      const changeTodos = newTodos.map(todo => {
        if (todo.completed === false) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      });

      setTodos(changeTodos);
    }
  }, [setTodos, todos]);

  const value = useMemo(() => {
    todos,
    setTodos,
  }, []);

  return (
    <PropsContext.Provider value={value}>{children}</PropsContext.Provider>
  );
};
