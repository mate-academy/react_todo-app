import React, { useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';

type TodosContext = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  isAddingTodo: boolean,
  setIsAddingTodo: (isLoading: boolean) => void,
  title: string,
  setTitle: (title: string) => void,
};

export const ContextTodos = React.createContext<TodosContext>({
  todos: [],
  setTodos: () => {},
  isAddingTodo: false,
  setIsAddingTodo: () => {},
  title: '',
  setTitle: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ContextTodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAddingTodo, setIsAddingTodo] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  const contextObj = useMemo(() => {
    return {
      todos,
      setTodos,
      isAddingTodo,
      setIsAddingTodo,
      title,
      setTitle,
    };
  }, [todos,
    setTodos,
    isAddingTodo,
    setIsAddingTodo,
    title,
    setTitle]);

  return (
    <ContextTodos.Provider value={contextObj}>
      {children}
    </ContextTodos.Provider>
  );
};
