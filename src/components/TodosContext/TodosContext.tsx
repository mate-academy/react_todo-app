/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react';
import { TodoStatus } from '../../types/TodoStatus';
import { Todo } from '../../types/Todo';
import { getFiltredTodos } from '../../utils/getFiltredTodos';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface Methods {
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  renameTodo: (id: number, title: string) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
}

export const MethodsContext = React.createContext<Methods>({
  addTodo: () => {},
  deleteTodo: () => {},
  toggleTodo: () => {},
  renameTodo: () => {},
  toggleAll: () => {},
  clearCompleted: () => {},
});

type Context = {
  todos: Todo[];
  filtredTodos: Todo[];
  setTodos: (newTodos: Todo[]) => void;
  activeFilter: TodoStatus;
  setActiveFilter: (newActiveFilter: TodoStatus) => void;
};

export const TodosContext = React.createContext<Context>({
  todos: [],
  filtredTodos: [],
  setTodos: () => {},
  activeFilter: TodoStatus.All,
  setActiveFilter: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [activeFilter, setActiveFilter] = useState<TodoStatus>(TodoStatus.All);

  const methods = useMemo(
    () => ({
      addTodo(title: string) {
        const newTodo: Todo = {
          id: Date.now(),
          title,
          completed: false,
        };

        setTodos([...todos, newTodo]);
      },

      deleteTodo(id: number) {
        setTodos(todos.filter(todo => todo.id !== id));
      },

      toggleTodo(id: number) {
        setTodos(
          todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
          ),
        );
      },

      renameTodo(id: number, title: string) {
        setTodos(
          todos.map(todo => (todo.id === id ? { ...todo, title } : todo)),
        );
      },

      toggleAll() {
        const allCompleted = todos.every(todo => todo.completed);

        setTodos(todos.map(todo => ({ ...todo, completed: !allCompleted })));
      },

      clearCompleted() {
        setTodos(todos.filter(todo => !todo.completed));
      },
    }),
    [todos],
  );

  const filtredTodos = getFiltredTodos(todos, activeFilter);

  const value: Context = useMemo(
    () => ({
      todos,
      filtredTodos,
      setTodos,
      activeFilter,
      setActiveFilter,
    }),
    [todos, filtredTodos, setTodos, activeFilter],
  );

  return (
    <MethodsContext.Provider value={methods}>
      <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
    </MethodsContext.Provider>
  );
};
