/* eslint-disable */
import React, { ChangeEvent, createContext, useContext, useState } from "react";
import { TodosContextType, Todo, FilterType } from "../types/todoTypes";
import { useFilterContext } from "../context/FilterContext";

const TodosContext = createContext<TodosContextType | undefined>(undefined);

type Props = { children: React.ReactNode };

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const { currentFilter } = useFilterContext();
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

  const completedTodos = todos.filter((todo) => todo.completed);

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

  const removeTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);

    setTodos(updatedTodos);
  };

  const editTodo = (id: number, title: string) => {
    setTodos((prevTodos: Todo[]) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, title } : todo))
    );
  };

  const sortedTodos = todos.filter((todo) => {
    if (currentFilter === FilterType.Completed) {
      return todo.completed;
    } else if (currentFilter === FilterType.Active) {
      return !todo.completed;
    }
    return true;
  });

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
        removeTodo,
        clearCompleted,
        editTodo,
        completedTodos,
        sortedTodos,
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
