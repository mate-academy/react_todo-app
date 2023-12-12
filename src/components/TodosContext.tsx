import React, { useCallback, useMemo } from 'react';
import { Todo, Todos } from '../types/Todo';
import { useLocalStorage } from './hooks/useLocalStorage';

export const TodosContext = React.createContext<Todos>({
  todos: [],
  setTodos: () => {},
  onDeleteTodo: () => {},
  onUpdateTodos: () => {},
  completedTodos: [],
  uncompletedTodos: [],
  onToggleAll: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const completedTodos = todos.filter(todo => todo.completed);
  const uncompletedTodos = todos.filter(todo => !todo.completed);

  const onDeleteTodo = useCallback((id: number) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);

    setTodos(filteredTodos);
  }, [setTodos, todos]);

  const onUpdateTodos = useCallback((updatedTodo: Todo) => {
    const updatedTodos = [...todos];
    const index = updatedTodos.findIndex(todo => todo.id === updatedTodo.id);

    updatedTodos.splice(index, 1, updatedTodo);

    setTodos(updatedTodos);
  }, [setTodos, todos]);

  const onToggleAll = useCallback(() => {
    const toggledTodos = todos.map(todo => ({
      ...todo,
      completed: completedTodos.length !== todos.length,
    }));

    setTodos(toggledTodos);
  }, [todos, setTodos, completedTodos.length]);

  const value = useMemo(() => ({
    todos,
    setTodos,
    onDeleteTodo,
    onUpdateTodos,
    completedTodos,
    uncompletedTodos,
    onToggleAll,
  }), [
    todos,
    onDeleteTodo,
    onUpdateTodos,
    completedTodos,
    uncompletedTodos,
    onToggleAll,
    setTodos,
  ]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
