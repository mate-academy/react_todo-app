import React, { ReactElement, useState } from 'react';
import { Todo } from './types/Todo';

type ContextProps = {
  todos:[] | Todo[],
  isMouseEnter: boolean,
  isDeleteError: boolean,
  isAddError: boolean,
  isUpdateError: boolean,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setIsMouseEnter: (condition: boolean) => void,
  setIsDeleteError: (condition: boolean) => void,
  setIsAddError: (condition: boolean) => void,
  setIsUpdateError: (condition: boolean) => void,
  tempTodo: null | Todo,
  setTempTodo: (todo: null | Todo) => void,
  selectedTodo: null | Todo,
  setSelectedTodo: (todo: null | Todo) => void,
};

export const TodosContext = React.createContext<ContextProps>({
  todos: [],
  isMouseEnter: false,
  isDeleteError: false,
  isAddError: false,
  isUpdateError: false,
  tempTodo: null,
  selectedTodo: null,
  setTodos: () => {},
  setIsMouseEnter: () => {},
  setIsDeleteError: () => {},
  setIsAddError: () => {},
  setIsUpdateError: () => {},
  setTempTodo: () => {},
  setSelectedTodo: () => {},
});

type ProviderProps = {
  children: ReactElement;
};

export const TodosProvider: React.FC<ProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);
  const [isAddError, setIsAddError] = useState(false);
  const [isUpdateError, setIsUpdateError] = useState(false);
  const [tempTodo, setTempTodo] = useState<null | Todo>(null);
  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);

  const contextValue = {
    todos,
    setTodos,
    isMouseEnter,
    setIsMouseEnter,
    isDeleteError,
    setIsDeleteError,
    isAddError,
    setIsAddError,
    isUpdateError,
    setIsUpdateError,
    tempTodo,
    setTempTodo,
    selectedTodo,
    setSelectedTodo,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
