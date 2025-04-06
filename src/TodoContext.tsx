import React, { createContext, useState, useEffect } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoContextProps {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
  updateTodo: (id: number, title: string) => void;
}

const TodoContext = createContext<TodoContextProps>({
  todos: [],
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  clearCompleted: () => {},
  toggleAll: () => {},
  updateTodo: () => {},
});

let uniqueIdCounter = 0;
interface TodoProviderProps {
  children: React.ReactNode; // Add children as a valid prop
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    setTodos([
      ...todos,
      { id: uniqueIdCounter++, title: title.trim(), completed: false },
    ]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(todos.map(todo => ({ ...todo, completed: !allCompleted })));
  };

  const updateTodo = (id: number, title: string) => {
    setTodos(
      todos
        .map(todo => (todo.id === id ? { ...todo, title: title.trim() } : todo))
        .filter(todo => todo.title !== ''), // Delete todos if title is empty
    );
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

export const useTodos = () => React.useContext(TodoContext);
