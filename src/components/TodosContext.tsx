import React, { useState, useEffect } from 'react';

import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import { Context } from '../types/Context';
// Context to use it later in other components of App
export const TodosContext = React.createContext<Context>({
  todos: [],
  addTodo: () => { },
  deleteTodo: () => { },
  changeSelectedTodo: () => { },
  toggleSelectedTodo: () => { },
  deleteCompletedTodos: () => { },
  toggleCompletionOfAllTodos: () => { },
  todoCount: 0,
  completedTodos: false,
  filterTodos: () => [],
});

interface Props {
  children: React.ReactNode;
}

// Wrapper with whole functionality
export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Function to add new Todo
  const addTodo = (title: string) => {
    // Creating deffault object where from parameter taking inputed text;
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    // Changinging state with early added todo and adding new one
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    // Filtering the list of todos by their id after what changin` state;
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleSelectedTodo = (id: number) => {
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      return;
    }

    todo.completed = !todo.completed;

    setTodos([...todos]);
  };

  const changeSelectedTodo = (id: number, newTodo: string) => {
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      return;
    }

    todo.title = newTodo;

    setTodos([...todos]);
  };

  const deleteCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const toggleCompletionOfAllTodos = () => {
    const allCompleted = todos.every((todo) => todo.completed);

    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updatedTodos);
  };

  const todoCount = todos.filter(
    (todo) => !todo.completed,
  ).length;

  const completedTodos = todos.some((todo) => todo.completed);

  const filterTodos = (filter: string) => {
    switch (filter) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);

      case Filter.Completed:
        return todos.filter(todo => todo.completed);

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

  const functional = {
    todos,
    addTodo,
    toggleSelectedTodo,
    deleteTodo,
    changeSelectedTodo,
    deleteCompletedTodos,
    toggleCompletionOfAllTodos,
    todoCount,
    completedTodos,
    filterTodos,
  };

  return (
    <TodosContext.Provider value={functional}>
      {children}
    </TodosContext.Provider>
  );
};
