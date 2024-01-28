import React, { useMemo, useState } from 'react';
import { Todos } from '../types/Todos';
import { Status } from '../types/Status';
import { filterTodoByStatus } from '../services/FilteringByStatus';
import { ContextProps } from '../types/ContextProps';
import { useLocalStorage } from '../hooks/LocalStorage';

export const TodoContext = React.createContext<ContextProps>({
  todos: [],
  addTodo: () => { },
  deleteTodo: () => { },
  setTodos: () => { },
  filterTodoByStatus: () => [],
  setStatus: () => [],
  status: Status.All,
  clearTodo: () => [],
  editTodo: () => [],
  toggleAll: () => {},
});

type Childer = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Childer> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todos[]>('todos', []);
  const [status, setStatus] = useState(Status.All);

  const addTodo = (todo: Todos) => {
    setTodos(prevTodo => [
      ...prevTodo,
      todo,
    ]);
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const clearTodo = () => {
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
  };

  const editTodo = (id: number, editTitle: string) => {
    setTodos(currentTodos => currentTodos
      .map(todo => (todo.id === id
        ? {
          ...todo,
          title: editTitle,
        }
        : todo)));
  };

  const toggleAll = (completed: boolean) => {
    setTodos((prevTodos) => prevTodos.map((todo) => ({
      ...todo,
      completed,
    })));
  };

  const value = useMemo(() => ({
    todos,
    status,
    addTodo,
    deleteTodo,
    setTodos,
    setStatus,
    filterTodoByStatus,
    clearTodo,
    editTodo,
    toggleAll,
  }), [todos, status]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
