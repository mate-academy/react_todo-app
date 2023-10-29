import React, { ReactElement, useState } from 'react';
import { Todo } from './types/Todo';
import { ErrorStatus } from './types/Error';

type ContextProps = {
  todos:[] | Todo[],
  isMouseEnter: boolean,
  error: ErrorStatus,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setIsMouseEnter: (condition: boolean) => void,
  setError: (text: ErrorStatus) => void,
  tempTodo: null | Todo,
  setTempTodo: (todo: null | Todo) => void,
  selectedTodo: null | Todo,
  setSelectedTodo: (todo: null | Todo) => void,
  todosToDelete: number[],
  setTodosToDelete: (ids: number[]) => void,
  toggleAll: string,
  setTogglingAll: (message: string) => void,
};

export const TodosContext = React.createContext<ContextProps>({
  todos: [],
  isMouseEnter: false,
  error: ErrorStatus.none,
  tempTodo: null,
  selectedTodo: null,
  setTodos: () => {},
  setIsMouseEnter: () => {},
  setError: () => {},
  setTempTodo: () => {},
  setSelectedTodo: () => {},
  todosToDelete: [],
  setTodosToDelete: () => {},
  toggleAll: '',
  setTogglingAll: () => {},
});

type ProviderProps = {
  children: ReactElement;
};

export const TodosProvider: React.FC<ProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [error, setError] = useState(ErrorStatus.none);
  const [tempTodo, setTempTodo] = useState<null | Todo>(null);
  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);
  const [todosToDelete, setTodosToDelete] = useState<number[]>([]);
  const [toggleAll, setTogglingAll] = useState<string>('');

  const contextValue = {
    todos,
    setTodos,
    isMouseEnter,
    setIsMouseEnter,
    error,
    setError,
    tempTodo,
    setTempTodo,
    selectedTodo,
    setSelectedTodo,
    todosToDelete,
    setTodosToDelete,
    toggleAll,
    setTogglingAll,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodo = (): ContextProps => React.useContext(TodosContext);
