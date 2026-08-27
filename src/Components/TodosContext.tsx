import React, { useEffect, useState, useRef } from 'react';
// import classNames from 'classnames';
import { Todo } from '../types/Todo';

const STORAGE_KEY = 'todos';

function getInitialTodos(): Todo[] {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [];
  }

  try {
    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

interface TodosContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  toggleAll: () => void;
  editTodo: (id: number, title: string) => void;
  clearCompleted: () => void;
  newTodoFieldRef: React.RefObject<HTMLInputElement>;
}

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  addTodo: () => {},
  deleteTodo: () => {},
  toggleTodo: () => {},
  toggleAll: () => {},
  editTodo: () => {},
  clearCompleted: () => {},
  newTodoFieldRef: { current: null },
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(getInitialTodos);
  const newTodoFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    newTodoFieldRef.current?.focus();
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(prevTodos =>
      prevTodos.map(todo => ({ ...todo, completed: !allCompleted })),
    );
  };

  const editTodo = (id: number, title: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === id ? { ...todo, title } : todo)),
    );
  };

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    newTodoFieldRef.current?.focus();
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
        toggleAll,
        editTodo,
        clearCompleted,
        newTodoFieldRef,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
