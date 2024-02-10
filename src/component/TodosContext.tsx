/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState } from 'react';
import {
  AddTodo, EditTodo, RemoveTodo, Todo,
} from '../types/todoTypes';

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
  editTodo: () => {},
  setTodos: () => {},
});

type TodosContextType = {
  todos: Todo[];
  addTodo: AddTodo;
  removeTodo: RemoveTodo;
  editTodo: EditTodo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

type Props = {
  children: React.ReactNode
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, newText: any) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: newText };
      }

      return todo;
    }));
  };

  return (
    <TodosContext.Provider value={{
      todos, addTodo, removeTodo, editTodo, setTodos,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
