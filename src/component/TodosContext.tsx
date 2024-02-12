/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import {
  AddTodo, EditTodo, RemoveTodo, Status, Todo,
} from '../types/todoTypes';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
  editTodo: () => {},
  setTodos: () => {},
  status: Status.All,
  setStatus: () => {},
  filteredTodos: [],

});

type TodosContextType = {
  todos: Todo[];
  addTodo: AddTodo;
  removeTodo: RemoveTodo;
  editTodo: EditTodo;
  setTodos: (v: Todo[]) => void;
  status: Status,
  setStatus: ((el: Status) => void),
  filteredTodos: Todo[];
};

type Props = {
  children: React.ReactNode
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [status, setStatus] = useState(Status.All);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: newText };
      }

      return todo;
    }));
  };

  const filterTodos = () => {
    switch (status) {
      case Status.Active:
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;
      case Status.Completed:
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  useEffect(() => {
    filterTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, todos]);

  return (
    <TodosContext.Provider value={{
      todos,
      addTodo,
      removeTodo,
      editTodo,
      setTodos,
      status,
      setStatus,
      filteredTodos,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
