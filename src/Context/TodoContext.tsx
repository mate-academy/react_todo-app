import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { StatusFilter, Todos } from '../Types/Task';
import { Props } from '../Types/TodoProvider';
import { TodoContextType } from '../Types/TodoContext';

export const TodoContext = createContext<TodoContextType>({
  todo: '',
  setTodo: () => {},
  tasks: [],
  setTask: () => {},
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
  const [todo, setTodo] = useState<Todos[]>(() => {
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
    localStorage.setItem('todos', JSON.stringify(todo));
  }, [todo]);

  return (
    <TodoContext.Provider
      value={{
        todo: todoTitle,
        setTodo: setTodoTitle,
        tasks: todo,
        setTask: setTodo,
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
