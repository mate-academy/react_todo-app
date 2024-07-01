import React, { useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Status } from '../types/Status';

interface ContextType {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  status: Status;
  setStatus: (status: Status) => void;
  title: string;
  setTitle: (s: string) => void;
  editingId: number | undefined;
  setEditingId: (n: number | undefined) => void;
}

export const TodoContext = React.createContext<ContextType>({
  todos: [],
  setTodos: () => {},
  status: Status.all,
  setStatus: () => {},
  title: '',
  setTitle: () => {},
  editingId: undefined,
  setEditingId: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [status, setStatus] = useState<Status>(Status.all);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState<number | undefined>(undefined);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      status,
      setStatus,
      title,
      setTitle,
      editingId,
      setEditingId,
    }),
    [todos, status, editingId],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
