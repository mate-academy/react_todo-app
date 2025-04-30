/* eslint-disable @typescript-eslint/indent */
import React, { createContext, useRef, useState } from 'react';
import { useLocalStorage } from '../hooks/LocalStorage';
import { TodoType } from '../types/Todo';

export const TodoContext = createContext<{
  todos: TodoType[];
  inputRef: React.RefObject<HTMLInputElement>;
  generalTodos: TodoType[];
  selectedTodo: TodoType | null;
  setTodos: (todos: TodoType[]) => void;
  setGeneralTodos: (todos: TodoType[]) => void;
  setSelectedTodo: (todo: null | TodoType) => void;
}>({
  todos: [],
  inputRef: { current: null },
  generalTodos: [],
  selectedTodo: null,
  setTodos: () => {},
  setGeneralTodos: () => {},
  setSelectedTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [generalTodos, setGeneralTodos] = useLocalStorage<TodoType[]>(
    'todos',
    [],
  );
  const [todos, setTodos] = useState<TodoType[]>(generalTodos);
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const valueProps = {
    todos,
    inputRef,
    selectedTodo,
    generalTodos,
    setTodos,
    setGeneralTodos,
    setSelectedTodo,
  };

  return (
    <TodoContext.Provider value={valueProps}>{children}</TodoContext.Provider>
  );
};
