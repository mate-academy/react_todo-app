import React, { createContext, useEffect, useRef, useState } from 'react';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';

interface TodoContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  filterStatus: FilterStatus;
  setFilterStatus: React.Dispatch<React.SetStateAction<FilterStatus>>;
  tempTodo: Todo | null;
  setTempTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  processingIds: Todo['id'][];
  setProcessingIds: React.Dispatch<React.SetStateAction<Todo['id'][]>>;
  isAdding: boolean;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  editingTodoId: number | null;
  setEditingTodoId: React.Dispatch<React.SetStateAction<number | null>>;
  editingTitle: string;
  setEditingTitle: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  focusInput: () => void | undefined;
  toggleTodo: (todo: Todo) => Promise<void>;
  saveTitle: (todo: Todo, newTitle: string) => Promise<void>;
  handleToggleAll: () => Promise<void>;
  filteredTodos: Todo[];
  inputRef: React.RefObject<HTMLInputElement>;
}

type Props = {
  children: React.ReactNode;
};

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem('todos') || '[]'),
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState(FilterStatus.All);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [processingIds, setProcessingIds] = useState<Todo['id'][]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => inputRef.current?.focus();

  useEffect(() => {
    setErrorMessage('');
    try {
      const loadedTodos = JSON.parse(localStorage.getItem('todos') || '[]');

      setTodos(loadedTodos);
    } catch {
      setErrorMessage('Unable to load todos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 3000);

      return () => clearTimeout(timer);
    }

    return;
  }, [errorMessage]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = async (todo: Todo) => {
    const updated = { ...todo, completed: !todo.completed };

    setProcessingIds(prev => [...prev, todo.id]);
    try {
      setTodos(ts => ts.map(t => (t.id === todo.id ? updated : t)));
    } catch {
      setErrorMessage('Unable to update a todo');
    } finally {
      setProcessingIds(prev => prev.filter(id => id !== todo.id));
      focusInput();
    }
  };

  const saveTitle = async (todo: Todo, newTitle: string) => {
    const trimmed = newTitle.trim();

    if (trimmed.length === 0) {
      return;
    }

    if (trimmed === todo.title) {
      setEditingTitle('');
      setEditingTodoId(null);
      focusInput();

      return;
    }

    const updated = { ...todo, title: trimmed };

    setProcessingIds(prev => [...prev, todo.id]);
    try {
      setTodos(ts => ts.map(t => (t.id === todo.id ? updated : t)));
      setEditingTitle('');
      setEditingTodoId(null);
    } catch {
      setErrorMessage('Unable to update a todo');
    } finally {
      setProcessingIds(prev => prev.filter(id => id !== todo.id));
      focusInput();
    }
  };

  const handleToggleAll = async () => {
    const hasUncompleted = todos.some(t => !t.completed);

    const todosToUpdate = hasUncompleted
      ? todos.filter(t => !t.completed)
      : todos;

    await Promise.all(todosToUpdate.map(t => toggleTodo(t)));
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isAdding) {
      inputRef.current?.focus();
    }
  }, [isAdding]);

  const filteredTodos = todos.filter(todo => {
    if (filterStatus === FilterStatus.Active) {
      return !todo.completed;
    }

    if (filterStatus === FilterStatus.Completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        errorMessage,
        setErrorMessage,
        title,
        setTitle,
        filterStatus,
        setFilterStatus,
        tempTodo,
        setTempTodo,
        processingIds,
        setProcessingIds,
        isAdding,
        setIsAdding,
        editingTodoId,
        setEditingTodoId,
        editingTitle,
        setEditingTitle,
        isLoading,
        setIsLoading,
        focusInput,
        toggleTodo,
        saveTitle,
        handleToggleAll,
        filteredTodos,
        inputRef,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
