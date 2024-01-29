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
  deleteCompletedTodos: () => {},
  changeStatus: () => {},
});

type Props = {
  children: React.ReactNode,
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [status, setStatus] = useState(Status.All);
  const filteredTodos = getFilteredTodos(todos, status);

  const addTodo = useCallback((newTodo: Todo) => {
    if (newTodo.title.trim()) {
      setTodos(currentTodos => [...currentTodos, newTodo]);
    }
  }, [setTodos]);

  const updateTodo = useCallback((upadatedTodo: Todo) => {
    setTodos(currentTodos => currentTodos.map(currentTodo => {
      return currentTodo.id !== upadatedTodo.id
        ? currentTodo
        : upadatedTodo;
    }));
  }, [setTodos]);

  const deleteTodo = useCallback((todoToDeleteID: number) => {
    setTodos(currentTodos => currentTodos.filter(({ id }) => {
      return id !== todoToDeleteID;
    }));
  }, [setTodos]);

  const completeAllTodos = useCallback(() => {
    setTodos(currentTodos => currentTodos.map(currentTodo => {
      const isCompleteAll = currentTodos.some(({ completed }) => !completed);

      return { ...currentTodo, completed: isCompleteAll };
    }));
  }, [setTodos]);

  const deleteCompletedTodos = useCallback(() => {
    setTodos(currentTodos => currentTodos.filter(({ completed }) => {
      return !completed;
    }));
  }, [setTodos]);

  const changeStatus = (newStatus: Status) => {
    setStatus(newStatus);
  };

  const todosValues = useMemo(() => ({
    todos,
    filteredTodos,
    status,
    addTodo,
    deleteTodo,
    updateTodo,
    completeAllTodos,
    deleteCompletedTodos,
    changeStatus,
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
