import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

type TodoContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  editTitle: string;
  setEditTitle: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  editTodoId: number | null;
  setEditTodoId: React.Dispatch<React.SetStateAction<number | null>>;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
  title: '',
  setTitle: () => {},
  editTitle: '',
  setEditTitle: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
  editTodoId: null,
  setEditTodoId: () => {},
  filter: Filter.All,
  setFilter: () => {},
  inputRef: { current: null },
});

export const useTodo = () => {
  return useContext(TodoContext);
};

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [title, setTitle] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [filter, setFilter] = useState(Filter.All);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));

    inputRef.current?.focus();
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        title,
        setTitle,
        editTitle,
        setEditTitle,
        errorMessage,
        setErrorMessage,
        editTodoId,
        setEditTodoId,
        filter,
        setFilter,
        inputRef,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
