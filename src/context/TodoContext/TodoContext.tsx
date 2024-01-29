import React, { useCallback, useMemo, useState } from 'react';
import { TodoContextType } from '../../types/TodoContextType';
import { useLocalStorage } from '../../hooks/useLocaleStorage';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { getFilteredTodos } from '../../services/getFilteredTodos';

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  filteredTodos: [],
  status: Status.All,
  addTodo: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},
  completeAllTodos: () => {},
  changheStatus: () => {},
  deleteCompletedTodos: () => {},
});

type Props = {
  children: React.ReactNode
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [status, setStatus] = useState<Status>(Status.All);
  const filteredTodos = getFilteredTodos(todos, status);

  const addTodo = useCallback((newTodo: Todo) => {
    if (newTodo.title.trim()) {
      setTodos(currentTodos => [...currentTodos, newTodo]);
    }
  }, [setTodos]);

  const deleteTodo = useCallback((todoIdToDelete: number) => {
    setTodos(currentTodos => currentTodos.filter(
      ({ id }) => id !== todoIdToDelete,
    ));
  }, [setTodos]);

  const updateTodo = useCallback((updatedTodo: Todo) => {
    setTodos(currentTodos => currentTodos.map(currentTodo => {
      return currentTodo.id !== updatedTodo.id
        ? currentTodo
        : updatedTodo;
    }));
  }, [setTodos]);

  const completeAllTodos = useCallback(() => {
    setTodos(currentTodos => currentTodos.map(currentTodo => {
      const isCompleteAll = currentTodos.some(({ completed }) => !completed);

      return { ...currentTodo, completed: isCompleteAll };
    }));
  }, [setTodos]);

  const changheStatus = (newStatus: Status) => {
    setStatus(newStatus);
  };

  const deleteCompletedTodos = useCallback(() => {
    setTodos(currentTodos => currentTodos.filter(({ completed }) => {
      return !completed;
    }));
  }, [setTodos]);

  const todosValues = useMemo(() => ({
    todos,
    filteredTodos,
    status,
    addTodo,
    deleteTodo,
    updateTodo,
    completeAllTodos,
    changheStatus,
    deleteCompletedTodos,
  }), [
    todos,
    filteredTodos,
    status,
    addTodo,
    deleteTodo,
    updateTodo,
    completeAllTodos,
    deleteCompletedTodos,
  ]);

  return (
    <TodoContext.Provider value={todosValues}>
      {children}
    </TodoContext.Provider>
  );
};
