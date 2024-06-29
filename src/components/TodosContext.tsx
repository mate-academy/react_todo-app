import React, { useEffect, useState } from 'react';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';
import * as api from '../api';

type TodosContextType = {
  getAll: (type?: Filter) => Todo[];
  add: (title: string) => void;
  remove: (todoId: string) => void;
  update: (todoData: Todo) => void;
  toggleAll: (completed: boolean) => void;
  clearCompleted: () => void;
};

const TodosContext = React.createContext<TodosContextType>({
  getAll: () => [],
  add: () => {},
  remove: () => {},
  update: () => {},
  clearCompleted: () => {},
  toggleAll: () => {},
});

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    api.getTodos().then(setTodos);
  }, []);

  const getAll = (type = Filter.all) => {
    if (type === Filter.active) return todos.filter(todo => !todo.completed);
    if (type === Filter.completed) return todos.filter(todo => todo.completed);

    return todos;
  };

  const add = async (title: string) => {
    const newTodo = await api.addTodo(title);

    setTodos([...todos, newTodo]);
  };

  const remove = async (todoId: string) => {
    await api.removeTodo(todoId);
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const update = async ({ id, title, completed }: Todo) => {
    const updatedTodo = await api.updateTodo({ id, title, completed });
    const newTodos = todos.map(todo => (todo.id === id ? updatedTodo : todo));

    setTodos(newTodos);
  };

  const toggleAll = (completed: boolean) => {
    setTodos(
      todos.map(todo => {
        return todo.completed === completed ? todo : { ...todo, completed };
      }),
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <TodosContext.Provider
      value={{ getAll, add, remove, update, clearCompleted, toggleAll }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  return React.useContext(TodosContext);
};
