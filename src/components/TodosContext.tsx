import React, { useState, useEffect } from 'react';

import { Todo } from '../types/Todo';
import { Context } from '../types/Context';
import { Filter } from '../types/Filter';

export const TodosContext = React.createContext<Context>({
  todos: [],
  addTodo: () => {},
  deleteTodo: () => {},
  editingTodo: () => {},
  toggleTodo: () => {},
  deleteCompletedTodos: () => {},
  handleToggleAll: () => {},
  todoCount: 0,
  completedTodos: false,
  filterTodos: () => [],
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editingTodo = (id: number, newTodo: string) => {
    setTodos(
      // eslint-disable-next-line no-confusing-arrow
      todos.map((prevTodo) => prevTodo.id
        === id ? { ...prevTodo, title: newTodo } : prevTodo),
    );
  };

  const toggleTodo = (id: number) => {
    setTodos(
      // eslint-disable-next-line no-confusing-arrow
      todos.map((todo) => todo.id
        === id ? { ...todo, completed: !todo.completed }
        : todo),
    );
  };

  const deleteCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const handleToggleAll = () => {
    const allCompleted = todos.every((todo) => todo.completed);

    const updateTodos = todos.map((todo) => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updateTodos);
  };

  const todoCount = todos.filter((todo) => !todo.completed).length;

  const completedTodos = todos.some((todo) => todo.completed);

  const filterTodos = (filter: string) => {
    switch (filter) {
      case Filter.Active:
        return todos.filter((todo) => !todo.completed);

      case Filter.Completed:
        return todos.filter((todo) => todo.completed);

      case Filter.All:
      default:
        return todos;
    }
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const value = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editingTodo,
    deleteCompletedTodos,
    handleToggleAll,
    todoCount,
    completedTodos,
    filterTodos,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
