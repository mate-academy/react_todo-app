import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { TodoApiContextValue } from '../../types/contextValues';

const TodosContext = React.createContext<Todo[] | null>(null);
const TodoApiContext = React.createContext<TodoApiContextValue | null>(null);

type Props = React.PropsWithChildren;

const useTodosInLocalStorage = (
  defaultValue: Todo[],
): [Todo[], React.Dispatch<React.SetStateAction<Todo[]>>] => {
  const key = 'todos';
  const storageValue = localStorage.getItem(key);

  const initialValue = storageValue ? JSON.parse(storageValue) : defaultValue;

  const [value, setValue] = useState<Todo[]>(initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export const TodoProvider = ({ children }: Props) => {
  const [todos, setTodos] = useTodosInLocalStorage([]);

  const handleCompletedChange = useCallback(
    (id: number, completed: boolean) =>
      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === id ? { ...todo, completed } : todo)),
      ),
    [setTodos],
  );

  const handleTitleChange = useCallback(
    (id: number, title: string) =>
      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === id ? { ...todo, title } : todo)),
      ),
    [setTodos],
  );

  const handleTodoAdd = useCallback(
    (title: string): boolean => {
      const trimmedTitle = title.trim();

      if (trimmedTitle) {
        setTodos(prevTodos => [
          ...prevTodos,
          {
            id: +new Date(),
            title: trimmedTitle,
            completed: false,
          },
        ]);

        return true;
      }

      return false;
    },
    [setTodos],
  );

  const handleTodoRemove = useCallback(
    (id: number) =>
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id)),
    [setTodos],
  );

  const apiValue = useMemo(
    () => ({
      handleCompletedChange,
      handleTitleChange,
      handleTodoAdd,
      handleTodoRemove,
    }),
    [handleCompletedChange, handleTitleChange, handleTodoAdd, handleTodoRemove],
  );

  return (
    <TodoApiContext.Provider value={apiValue}>
      <TodosContext.Provider value={todos}>{children}</TodosContext.Provider>
    </TodoApiContext.Provider>
  );
};

export const useTodos = () => {
  const value = useContext(TodosContext);

  if (!value) {
    throw new Error('TodoProvider is missing!!!');
  }

  return value;
};

export const useTodoApi = () => {
  const value = useContext(TodoApiContext);

  if (!value) {
    throw new Error('TodoProvider is missing!!!');
  }

  return value;
};
