import React, { useEffect, useState } from 'react';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

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
  const [todos, setTodos] = useState<Todo[]>(() => {
    const data = window.localStorage.getItem('todos');

    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const getAll = (type = Filter.all) => {
    switch (type) {
      case Filter.active:
        return todos.filter(todo => !todo.completed);

      case Filter.completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const add = (title: string) => {
    const newTodo: Todo = {
      id: `${Date.now()}`,
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const remove = (todoId: string) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const update = (todoData: Todo) => {
    setTodos(
      todos.map(todo => {
        return todo.id === todoData.id ? todoData : todo;
      }),
    );
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
