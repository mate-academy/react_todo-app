import React, { useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Todo } from './types/Todo';

type TodosContextProps = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
  addTodo: (newTodo: Todo) => void,
  deleteTodo: (todoId: Todo['id']) => void,
  updateTodo: (updatedTodo: Todo) => void,
};

export const TodosContext
  = React.createContext<TodosContextProps>({
    todos: [],
    setTodos: () => { },
    addTodo: () => { },
    deleteTodo: () => { },
    updateTodo: () => { },
  });

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  // #region PROVIDER_INTERFACE
  const addTodo = (newTodo: Todo): void => {
    setTodos(
      [...todos, newTodo],
    );
  };

  const deleteTodo = (todoId: Todo['id']): void => {
    setTodos(
      [...todos].filter(todo => todo.id !== todoId),
    );
  };

  const updateTodo = (updatedTodo: Todo): void => {
    setTodos(
      todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)),
    );
  };
  // #endregion

  const value = useMemo(() => ({
    todos,
    setTodos,
    addTodo,
    deleteTodo,
    updateTodo,
  }), [todos]);

  return (
    <TodosContext.Provider
      value={value}
    >
      {children}
    </TodosContext.Provider>
  );
};
