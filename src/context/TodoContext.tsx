import { createContext, useContext, useEffect, useState } from 'react';

import { Todo } from '../types/Todo';

interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
  updateTodo: (id: number, title: string) => void;
}

const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: number, title: string) => {
    setTodos(currentTodos =>
      currentTodos.map(todo => (todo.id === id ? { ...todo, title } : todo)),
    );
  };

  const clearCompleted = () => {
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
  };

  const toggleAll = () => {
    setTodos(currentTodos => {
      const allCompleted = currentTodos.every(todo => todo.completed);

      return currentTodos.map(todo => ({
        ...todo,
        completed: !allCompleted,
      }));
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        clearCompleted,
        toggleAll,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos must be used inside TodoProvider');
  }

  return context;
};
