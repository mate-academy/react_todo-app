import React, { useEffect, useState, useCallback } from 'react';
import { Todo } from '../types/todo';

const LOCAL_STORAGE_KEY = 'todos';

export const TodosContext = React.createContext([] as Todo[]);

type TodoUpdateContextValues = {
  addTodo: (todo: Todo) => void,
  updateTodo: (todo: Todo) => void,
  deleteTodo: (todoId: number) => void,
  deleteCompletedTodos: () => void,
  toggleTodosStatus: (status: boolean) => void,
};

export const TodoUpdateContext = React.createContext<TodoUpdateContextValues>({
  addTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
  deleteCompletedTodos: () => {},
  toggleTodosStatus: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect((): void => {
    const valueFromLocaleStorage = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (valueFromLocaleStorage) {
      const parsedTodos = JSON.parse(valueFromLocaleStorage);

      setTodos(parsedTodos);
    }
  }, []);

  useEffect((): void => {
    setTodos(currentTodos => {
      const stringiryValue = JSON.stringify(currentTodos);

      localStorage.setItem(LOCAL_STORAGE_KEY, stringiryValue);

      return currentTodos;
    });
  }, [todos]);

  const addTodo = useCallback((newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  }, []);

  const updateTodo = useCallback((editedTodo: Todo) => {
    setTodos(currentTodos => currentTodos.map(todo => {
      return todo.id === editedTodo.id
        ? editedTodo
        : todo;
    }));
  }, []);

  const deleteTodo = useCallback((todoId: number) => {
    setTodos(currentTodos => currentTodos.filter(
      todo => todo.id !== todoId,
    ));
  }, []);

  const deleteCompletedTodos = useCallback(() => {
    setTodos(currentTodos => currentTodos.filter(
      todo => !todo.completed,
    ));
  }, []);

  const toggleTodosStatus = useCallback((status: boolean) => {
    setTodos(currentTodos => currentTodos.map(todo => ({
      ...todo,
      completed: status,
    })));
  }, []);

  const todosValue = React.useMemo(() => (todos), [todos]);

  const value = React.useMemo(() => ({
    addTodo,
    updateTodo,
    deleteTodo,
    deleteCompletedTodos,
    toggleTodosStatus,
  }), [todos]);

  return (
    <TodoUpdateContext.Provider value={value}>
      <TodosContext.Provider value={todosValue}>
        {children}
      </TodosContext.Provider>
    </TodoUpdateContext.Provider>
  );
};
