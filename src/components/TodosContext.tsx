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

  const reload = () => api.getTodos().then(setTodos);

  useEffect(() => void reload(), []);

  const add = (title: string) => api.addTodo(title).then(reload);
  const remove = (id: string) => api.removeTodo(id).then(reload);
  const update = (todo: Todo) => api.updateTodo(todo).then(reload);

  const getAll = (type = Filter.all) => {
    if (type === Filter.active) return todos.filter(todo => !todo.completed);
    if (type === Filter.completed) return todos.filter(todo => todo.completed);

    return todos;
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
