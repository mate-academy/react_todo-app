import React, { useEffect, useMemo, useState } from 'react';
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
  const [todos, setTodos] = useState<Todo[]>(() => {
    const data = window.localStorage.getItem('todos');

    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const value = useMemo(() => ({
    add: (title: string) => {
      const newTodo: Todo = {
        id: `${Date.now()}`,
        title,
        completed: false,
      };

      setTodos([...todos, newTodo]);
    },

    remove: (todoId: string) => {
      setTodos(todos.filter(todo => todo.id !== todoId));
    },

    update: (todoData: Todo) => {
      setTodos(todos.map((todo) => {
        return (todo.id === todoData.id)
          ? todoData
          : todo;
      }));
    },

    toggleAll: (completed: boolean) => {
      setTodos(todos.map((todo) => {
        return (todo.completed === completed)
          ? todo
          : { ...todo, completed };
      }));
    },

    clearCompleted: () => {
      setTodos(todos.filter(todo => !todo.completed));
    },

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
  }), [todos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
