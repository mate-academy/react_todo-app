import React, { useMemo, useState } from 'react';
import { TodosContext } from './TodosContext';
import { ErrorMessages, Filters, Todo } from '../../../types';
import { useLocaleStorage } from '../../../utils/index';

interface Props {
  children: React.ReactNode;
}

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>('todos', []);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<Filters>(Filters.All);

  const handleDeleteTodo = (todoID: number) => {
    try {
      setTodos(todos.filter(todo => todo.id !== todoID));
    } catch {
      setErrorMessage(ErrorMessages.DeleteError);
    }
  };

  const handleDeleteCompletedTodos = () => {
    try {
      const activeTodos = todos.filter(todo => todo.completed === false);

      setTodos(activeTodos);
    } catch {
      setErrorMessage(ErrorMessages.DeleteError);
    }
  };

  const updateTodo = (
    updatedTodo: Todo,
    key: keyof Todo,
    newValue: boolean | string,
  ) => {
    try {
      const newTodo = { ...updatedTodo, [key]: newValue };

      setTodos(todos.map(todo => (todo.id === newTodo.id ? newTodo : todo)));
    } catch {
      setErrorMessage(ErrorMessages.UpdateError);
    }
  };

  const handleToggleTodos = () => {
    const activeTodos = todos.filter(todo => !todo.completed);
    const completedStatus = activeTodos.length > 0;

    try {
      setTodos(
        todos.map(item =>
          item.completed === completedStatus
            ? item
            : { ...item, completed: completedStatus },
        ),
      );
    } catch {
      setErrorMessage(ErrorMessages.UpdateError);
    }
  };

  const handleAddTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const values = useMemo(
    () => ({
      todos,
      errorMessage,
      selectedFilter,
      onChangeFilters: setSelectedFilter,
      onChangeErrorMessage: setErrorMessage,
      onDelete: handleDeleteTodo,
      onDeleteCompletedTodos: handleDeleteCompletedTodos,
      onEdit: updateTodo,
      onToggleTodos: handleToggleTodos,
      onAddTodo: handleAddTodo,
    }),
    [todos, errorMessage, selectedFilter],
  );

  return (
    <TodosContext.Provider value={values}>{children}</TodosContext.Provider>
  );
};
