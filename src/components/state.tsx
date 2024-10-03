import React, {
  useState,
  createContext,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import { Todo } from '../Types/Todo';
import { Filter } from '../Types/Filter';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MyContext = createContext<any>(null);

interface MyProviderProps {
  children: ReactNode;
}

export const MyProvider = ({ children }: MyProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  const deleteTodo = (id: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  const contextValue = {
    todos,
    setTodos,
    title,
    setTitle,
    filter,
    setFilter,
    editingTodoId,
    setEditingTodoId,
    deleteTodo,
    inputRef,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};
