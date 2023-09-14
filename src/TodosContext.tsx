import React, { createContext, useState } from 'react';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type TodosContextType = {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

type Props = { children: React.ReactNode };

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    const newTodo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));

    setTodos(updatedTodos);
  };

  return (
    <TodosContext.Provider value={{ todos, addTodo, toggleTodo }}>
      {children}
    </TodosContext.Provider>
  );
};
