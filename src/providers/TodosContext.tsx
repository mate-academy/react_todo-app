import React, { useState } from 'react';
import { Status } from '../utils/status';
import { useLocalStorage } from '../hook/useLocalStorage';
import { Todo } from '../utils/todo';

interface TodosContextProps {
  todos : Todo [];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title: string) => void;
  allCompleted: () => void;
  filteredTodos: Todo[];
  setFilter: (string: Status) => void;
  deleteAllTodos: () => void;
}

export const TodosContext = React.createContext<TodosContextProps>(
  {} as TodosContextProps,
);

type Prop = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Prop> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [newFilter, setNewFilter] = useState<Status>(Status.Active);

  const addTodo = (title: string) => {
    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => (todo.id === id
        ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(
      todos.filter((todo) => todo.id !== id),
    );
  };

  const editTodo = (id: number, title: string) => {
    setTodos((prevTodos: Todo[]) => prevTodos.map((todo) => (todo.id === id
      ? { ...todo, title } : todo)));
  };

  const deleteAllTodos = () => {
    setTodos((prevTodos: Todo[]) => prevTodos.filter(todo => !todo.completed));
  };

  const allCompleted = () => {
    setTodos((prevTodos: Todo[]) => (
      prevTodos.map((todo) => (
        { ...todo, completed: !prevTodos.every((t) => t.completed) }))));
  };

  const setFilter = (filter: Status) => {
    setNewFilter(filter);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (newFilter) {
      case Status.All:
        return true;
      case Status.Active:
        return !todo.completed;
      case Status.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <TodosContext.Provider value={{
      todos,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
      allCompleted,
      filteredTodos,
      setFilter,
      deleteAllTodos,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
