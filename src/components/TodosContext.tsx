import React, { useEffect, useMemo, useState } from 'react';
import * as todosApi from '../api/todos';
import { Filter } from '../types/Filter';

type TodosContextType = {
  getAll: (type?: Filter) => Todo[],
  add: (title: string) => void,
  remove: (todoId: string) => void,
  update: (todoData: Todo) => void,
  toggleAll: (completed: boolean) => void,
  clearCompleted: () => void,
};

export const TodosContext = React.createContext<TodosContextType>({
  getAll: () => [],
  add: () => {},
  remove: () => {},
  update: () => {},
  clearCompleted: () => {},
  toggleAll: () => {},
});

export const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = () => {
    todosApi.getAll().then(setTodos);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const value = useMemo(() => ({
    getAll: (type = Filter.all) => {
      switch (type) {
        case Filter.active:
          return todos.filter(todo => !todo.completed);

        case Filter.completed:
          return todos.filter(todo => todo.completed);

        default:
          return todos;
      }
    },
    add: async (title: string) => {
      todosApi.add(title)
        .then(loadTodos);
    },
    remove: (todoId: string) => {
      todosApi.remove(todoId)
        .then(loadTodos);
    },
    update: (todoData: Todo) => {
      todosApi.update(todoData)
        .then(loadTodos);
    },
    toggleAll: (completed: boolean) => {
      todosApi.updatedAll(
        todos
          .filter(todo => todo.completed !== completed)
          .map(todo => ({ ...todo, completed })),
      )
        .then(loadTodos);
    },
    clearCompleted: () => {
      todosApi.removeAll(
        todos
          .filter(todo => todo.completed)
          .map(todo => todo.id),
      )
        .then(loadTodos);
    },
  }), [todos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
