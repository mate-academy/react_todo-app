import React, { createContext, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  children: React.ReactNode;
};

type TodosContextType = {
  deleteTodo: (todo: Todo) => void;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodosContext = createContext<TodosContextType | undefined>(
  undefined,
);

function loadTodos() {
  const savedTodos = localStorage.getItem('todos');

  return savedTodos ? JSON.parse(savedTodos) : [];
}

function saveTodos(todoS: Todo[]) {
  localStorage.setItem('todos', JSON.stringify(todoS));
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[] | []>(loadTodos);

  function deleteTodo(todo: Todo) {
    const result = [...todos].filter(item => item.id !== todo.id);

    setTodos(result);
  }

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <TodosContext.Provider value={{ todos, setTodos, deleteTodo }}>
      {children}
    </TodosContext.Provider>
  );
};
