import React, { useState } from 'react';
import { TodosContextType } from '../../types/TodosContext';
import { Todo } from '../../types/Todo';

export const TodosContext = React.createContext<TodosContextType | null>(null);

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const updateTodoTitle = (id: number, newTitle: string) => {
    setTodos(prevTodos => prevTodos.map(prevTodo => (prevTodo.id === id
      ? { ...prevTodo, title: newTitle }
      : prevTodo)));
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.map(
      (todo) => (todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo),
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter(
      (todo) => todo.id !== id,
    ));
  };

  return (
    <TodosContext.Provider value={{
      todos,
      addTodo,
      toggleTodo,
      deleteTodo,
      updateTodoTitle,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
