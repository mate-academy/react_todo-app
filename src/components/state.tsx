/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  createContext,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import { Todo } from '../Types/Todo';
import { Filter } from '../Types/Filter';

export const MyContext = createContext<any>(null);

interface MyProviderProps {
  children: ReactNode;
}

export const MyProvider = ({ children }: MyProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  function deleteTodo(id: number) {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  }

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <MyContext.Provider
      value={{
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
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
