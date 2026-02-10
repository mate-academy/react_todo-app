import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';

type TodosContextValue = {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (todoId: number) => void;
  toggleTodo: (todoId: number, nextCompleted?: boolean) => void;
  renameTodo: (todoId: number, title: string) => void;
  toggleAllTodos: () => void;
  clearCompleted: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

export const TodosContext = React.createContext<TodosContextValue | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const raw = localStorage.getItem('todos');

    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw) as Todo[];

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const normalizedTitle = title.trim();

    if (normalizedTitle === '') {
      focusInput();

      return;
    }

    const newTodo: Todo = {
      id: +Date.now(),
      title: normalizedTitle,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    focusInput();
  };

  const deleteTodo = (todoId: number) => {
    setTodos(prevState => prevState.filter(todo => todo.id !== todoId));
    focusInput();
  };

  const toggleTodo = (todoId: number, nextCompleted?: boolean) => {
    setTodos((prevState: Todo[]) =>
      prevState.map((todo: Todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        const updatedCompleted =
          typeof nextCompleted === 'boolean' ? nextCompleted : !todo.completed;

        return { ...todo, completed: updatedCompleted };
      }),
    );
  };

  const renameTodo = (todoId: number, title: string) => {
    const normalizedTitle = title.trim();

    if (normalizedTitle === '') {
      return deleteTodo(todoId);
    }

    setTodos((prevState: Todo[]) => {
      return prevState.map((todo: Todo) =>
        todo.id === todoId ? { ...todo, title: normalizedTitle } : todo,
      );
    });
  };

  const toggleAllTodos = () => {
    setTodos((prevState: Todo[]) => {
      const nextCompleted = !prevState.every(todo => todo.completed);

      return prevState.map((todo: Todo) =>
        todo.completed === nextCompleted
          ? todo
          : { ...todo, completed: nextCompleted },
      );
    });
  };

  const clearCompleted = () => {
    setTodos(prevState => prevState.filter(todo => !todo.completed));
    focusInput();
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
        renameTodo,
        toggleAllTodos,
        clearCompleted,
        inputRef,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
