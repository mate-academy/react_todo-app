import React, {
  createContext,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { Todo } from '../types/Todo';
import { filterTodo } from '../Services/Todo';
import { useTodoUI } from '../hooks/useTodoUI';
import { todoStorage } from '../Services/todoStorage';

type TodoDataContextType = {
  todos: Todo[];
  filteredTodos: Todo[];
  selectedTodoId: number | null;
  isTodoListVisible: boolean;
  isTodoFooterVisible: boolean;
  setSelectedTodoId: (todoId: number | null) => void;
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (
    id: number,
    data: Partial<Pick<Todo, 'title' | 'completed'>>,
  ) => void;
};

export const TodoDataContext = createContext<TodoDataContextType | null>(null);

export const TodoDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const { filter, addErrorMessage, clearErrorMessage, inputRef } = useTodoUI();

  const addTodo = useCallback(
    (title: string) => {
      try {
        clearErrorMessage();

        const created = todoStorage.addTodo({
          title,
          completed: false,
        });

        setTodos(prev => [...prev, created]);
      } catch {
        addErrorMessage('Unable to add a todo', true);
        inputRef.current?.focus();
        throw new Error();
      }
    },
    [addErrorMessage, clearErrorMessage, inputRef],
  );

  const deleteTodo = useCallback(
    (id: number) => {
      try {
        todoStorage.deleteTodo(id);
        setTodos(prev => prev.filter(todo => todo.id !== id));
      } catch {
        addErrorMessage('Unable to delete a todo', true);
        throw new Error();
      } finally {
        inputRef.current?.focus();
      }
    },
    [addErrorMessage, inputRef],
  );

  const updateTodo = useCallback(
    (id: number, data: Partial<Pick<Todo, 'title' | 'completed'>>) => {
      try {
        const updatedTodo = todoStorage.updateTodo(id, data);

        setTodos(prev =>
          prev.map(todo => (todo.id === id ? updatedTodo : todo)),
        );
      } catch {
        addErrorMessage('Unable to update a todo', true);
        throw new Error();
      }
    },
    [addErrorMessage],
  );

  useEffect(() => {
    const storedTodos = todoStorage.getTodos();

    setTodos(storedTodos);
  }, []);

  const filteredTodos = useMemo(
    () => filterTodo(todos, filter),
    [todos, filter],
  );

  const isTodoListVisible = useMemo(
    () => filteredTodos.length > 0,
    [filteredTodos.length],
  );

  const isTodoFooterVisible = useMemo(() => todos.length > 0, [todos.length]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos.length, inputRef]);

  const value = useMemo(
    () => ({
      todos,
      filteredTodos,
      selectedTodoId,
      isTodoFooterVisible,
      isTodoListVisible,
      setSelectedTodoId,
      addTodo,
      deleteTodo,
      updateTodo,
    }),
    [
      todos,
      filteredTodos,
      selectedTodoId,
      isTodoFooterVisible,
      isTodoListVisible,
      addTodo,
      deleteTodo,
      updateTodo,
    ],
  );

  return (
    <TodoDataContext.Provider value={value}>
      {children}
    </TodoDataContext.Provider>
  );
};
