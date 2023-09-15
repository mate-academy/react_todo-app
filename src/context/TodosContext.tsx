import React, { ChangeEvent, createContext, useContext, useState } from "react";
import { TodosContextType, Todo } from "../types/todoTypes";

const TodosContext = createContext<TodosContextType | undefined>(undefined);

type Props = { children: React.ReactNode };

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const addTodo = (title: string) => {
    if (title.trim() === "") {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(title);
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const toggleAll = () => {
    const allCompleted = todos.every((todo) => todo.completed);

    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updatedTodos);
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        handleSubmit,
        handleInputChange,
        title,
        toggleAll,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => {
  const context = useContext(TodosContext);
  if (context === undefined) {
    throw new Error("useTodosContext must be used with a context");
  }
  return context;
};
