import React, { useEffect, useState, ReactNode } from 'react';

import { Todo } from '../../types/Todo';

interface ContextProps {
  todos: Todo[];
  addTodo: (newItem: Todo) => void;
  removeTodo: (id: number) => void;
  editTitle: (
    todoId:number,
    value:string,
  ) => void;
  editStatus: (todoId: number) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
  notCompleted: () => number;
  allCompleted: () => boolean;
}

interface Props {
  children: ReactNode;
}

export const Context = React.createContext<ContextProps>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
  editTitle: () => {},
  editStatus: () => {},
  clearCompleted: () => {},
  toggleAll: () => {},
  notCompleted: () => 0,
  allCompleted: () => false,
});

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setTodos(() => {
      const data = localStorage.getItem('todos');

      if (data === null) {
        return [];
      }

      try {
        return JSON.parse(data);
      } catch {
        return [];
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo(newItem: Todo) {
    setTodos(prevTodos => [...prevTodos, newItem]);
  }

  function removeTodo(id: number) {
    setTodos(prevTodos => prevTodos.filter(item => item.id !== id));
  }

  function editTitle(todoId:number, value:string) {
    const updatedTodos = todos.map((item) => (
      item.id === todoId ? { ...item, title: value } : item));

    setTodos(updatedTodos);
  }

  function editStatus(todoId: number) {
    const updatedTodos = todos.map((item) => (
      item.id === todoId ? { ...item, completed: !item.completed } : item));

    setTodos(updatedTodos);
  }

  const clearCompleted = () => {
    const updatedTodos = todos.filter((item) => !item.completed);

    setTodos(updatedTodos);
  };

  const notCompleted = () => {
    return todos.reduce((sum, item) => {
      if (!item.completed) {
        return sum + 1;
      }

      return sum;
    }, 0);
  };

  const allCompleted = (): boolean => {
    return todos.every((item) => item.completed);
  };

  const toggleAll = () => {
    if (allCompleted()) {
      setTodos((prev) => prev.map((item) => ({ ...item, completed: false })));
    } else {
      setTodos((prev) => prev.map((item) => ({ ...item, completed: true })));
    }
  };

  return (
    <Context.Provider value={{
      todos,
      addTodo,
      removeTodo,
      editTitle,
      editStatus,
      clearCompleted,
      toggleAll,
      notCompleted,
      allCompleted,
    }}
    >
      {children}
    </Context.Provider>
  );
};
