import React, { createContext, useState, useEffect, useContext } from 'react';
import { Todo } from '../types/Todo';

interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo(title: string) {
    setTodos([...todos, { id: +new Date(), title, completed: false }]);
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function toggleTodo(id: number) {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function updateTodo(id: number, title: string) {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, title } : todo)));
  }

  function toggleAll() {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(todos.map(todo => ({ ...todo, completed: !allCompleted })));
  }

  function clearCompleted() {
    setTodos(todos.filter(todo => !todo.completed));
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
        updateTodo,
        toggleAll,
        clearCompleted,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext) as TodoContextType;
