import React, { useEffect, useMemo, useState } from 'react';
import { ToDo } from '../types/ToDo';
import { TodosContextType } from '../types/TodosContextType';
import { Status } from '../types/Status';

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  addTodo: () => {},
  updateTodo: () => {},
  removeTodo: () => {},
  markOneComplete: () => {},
  markAllComplete: () => {},
  clearCompleted: () => {},
  filterTodos: () => [],
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<ToDo[]>([]);

  const addTodo = (title: string) => {
    const todo: ToDo = {
      id: +new Date(),
      completed: false,
      title,
    };

    setTodos(currentTodos => [...currentTodos, todo]);
  };

  const updateTodo = (id: number, newTitle: string) => {
    setTodos(todos.map(prevTodo => (prevTodo.id === id
      ? { ...prevTodo, title: newTitle }
      : prevTodo)));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(el => el.id !== id));
  };

  const markOneComplete = (id: number) => {
    setTodos(todos.map(
      (todo) => (todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo),
    ));
  };

  const markAllComplete = () => {
    const hasAllCompleted = todos.every((todo) => todo.completed);

    const updateTodos = todos.map((todo) => ({
      ...todo, completed: !hasAllCompleted,
    }));

    setTodos(updateTodos);
  };

  const clearCompleted = () => {
    setTodos(todos.filter(el => !el.completed));
  };

  const filterTodos = (status: Status) => {
    switch (status) {
      case Status.Completed:
        return todos.filter(el => el.completed);
      case Status.Active:
        return todos.filter(el => !el.completed);
      case Status.All:
      default:
        return todos;
    }
  };

  useEffect(() => {
    const data = localStorage.getItem('todos');

    if (data) {
      setTodos(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const value = useMemo(() => ({
    todos,
    addTodo,
    updateTodo,
    removeTodo,
    markOneComplete,
    markAllComplete,
    clearCompleted,
    filterTodos,
  }), [todos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
