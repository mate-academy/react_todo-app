import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { StatusFilter, Todos } from '../Types/Task';
import { Props } from '../Types/TodoProvider';
import { TodoContextType } from '../Types/TodoContext';

export const TodoContext = createContext<TodoContextType>({
  todoTitle: '',
  setTodoTitle: () => {},
  todos: [],
  setTodos: () => {},
  statusFilter: '',
  setStatusFilter: () => {},
  focusInput: { current: undefined },
  focusInputFn: () => {},
});

export const TodoProvider: React.FC<Props> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todos, setTodos] = useState<Todos[]>(() => {
    const data = localStorage.getItem('todos');

    if (!data) {
      return [];
    }

    try {
      return JSON.parse(data) as Todos[];
    } catch {
      return [];
    }
  });
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    StatusFilter.All,
  );

  const focusInput = useRef<() => void>();

  const focusInputFn = useCallback((fn: () => void) => {
    focusInput.current = fn;
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{
        todoTitle,
        setTodoTitle,
        todos,
        setTodos,
        statusFilter,
        setStatusFilter,
        focusInput,
        focusInputFn,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
