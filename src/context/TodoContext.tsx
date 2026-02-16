import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Todo } from '../types/Todo';
import { SavedData } from '../types/constants';

interface TodoContextType {
  todos: Todo[];
  onAddTodo: (title: string) => void;
  onDeleteTodo: (id: number) => void;
  onToggleTodo: (id: number) => void;
  onUpdateTodo: (id: number, title: string) => void;
  onToggleAll: () => void;
  onClearCompleted: () => void;
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  onAddTodo: () => {},
  onDeleteTodo: () => {},
  onToggleTodo: () => {},
  onUpdateTodo: () => {},
  onToggleAll: () => {},
  onClearCompleted: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedData = localStorage.getItem(SavedData.Todos);

    if (!savedData) {
      return [];
    }

    try {
      return JSON.parse(savedData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error reading LocalStorage', error);

      return [];
    }

    return [];
  });

  useEffect(() => {
    const stringifiedTodos = JSON.stringify(todos);

    localStorage.setItem(SavedData.Todos, stringifiedTodos);
  }, [todos]);

  const handleAddTodo = useCallback((title: string) => {
    setTodos(currentTodos => [
      ...currentTodos,
      {
        id: +new Date(),
        title,
        completed: false,
      },
    ]);
  }, []);

  const handleDeleteTodo = useCallback((id: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  }, []);

  const handleToggleTodo = useCallback((id: number) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const handleUpdateTodo = useCallback((id: number, title: string) => {
    setTodos(currentTodos =>
      currentTodos.map(todo => (todo.id === id ? { ...todo, title } : todo)),
    );
  }, []);

  const handleToggleAll = useCallback(() => {
    setTodos(currentTodos => {
      const isAllCompleted = currentTodos.every(({ completed }) => completed);
      const shouldAllBeCompleted = !isAllCompleted;

      return currentTodos.map(todo => ({
        ...todo,
        completed: shouldAllBeCompleted,
      }));
    });
  }, []);

  const handleClearCompleted = useCallback(() => {
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
  }, []);

  const contextValue = useMemo(
    () => ({
      todos,
      onAddTodo: handleAddTodo,
      onDeleteTodo: handleDeleteTodo,
      onToggleTodo: handleToggleTodo,
      onUpdateTodo: handleUpdateTodo,
      onToggleAll: handleToggleAll,
      onClearCompleted: handleClearCompleted,
    }),
    [
      todos,
      handleAddTodo,
      handleDeleteTodo,
      handleToggleTodo,
      handleUpdateTodo,
      handleToggleAll,
      handleClearCompleted,
    ],
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
