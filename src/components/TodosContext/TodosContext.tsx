import React, { useEffect, useState } from 'react';
import { TodosContextValue } from '../../types/TodosContextValue';
import { Todo } from '../../types/Todo';

export const TodosContext = React.createContext<TodosContextValue | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = JSON.parse(
      localStorage.getItem('todos') || '[]',
    ) as Todo[];

    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: new Date().getTime(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      }),
    );
  };

  const toggleAllTodos = () => {
    const isAllCompleted = todos.every(todo => todo.completed);

    setTodos(
      todos.map(todo => {
        return { ...todo, completed: !isAllCompleted };
      }),
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const updateTodo = (id: number, newTitle: string) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, title: newTitle };
        }

        return todo;
      }),
    );
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        toggleAllTodos,
        removeTodo,
        clearCompleted,
        updateTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
