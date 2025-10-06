import React, { useContext, useState } from 'react';
import * as todoService from '../api/todos';
import { useTodosContext } from './TodosContext';
import { useErrorContext } from './ErrorContext';
import { ErrorMessage } from '../types/ErrorMessage';

interface DeleteContextType {
  handleDelete: (todoId: number) => Promise<void>;
  beforeDeleteBlur: boolean;
}

export const DeleteContext = React.createContext<DeleteContextType | null>(
  null,
);

interface Props {
  children: React.ReactNode;
}

export const DeleteProvider: React.FC<Props> = ({ children }) => {
  const { setTodos } = useTodosContext();
  const { setErrorMessage, setIsHiddenErrorMessage } = useErrorContext();
  const [beforeDeleteBlur, setBeforeDeleteBlur] = useState(false);

  function deleteTodo(todoId: number): Promise<void> {
    return todoService
      .deleteTodo(todoId)
      .then(() =>
        setTodos(currentTodos =>
          currentTodos.filter(todo => todo.id !== todoId),
        ),
      )
      .catch(() => {
        setErrorMessage(ErrorMessage.deleteTodoError);
        setIsHiddenErrorMessage(false);
      });
  }

  const handleDelete = (todoId: number) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === todoId ? { ...todo, isLoading: true } : todo,
      ),
    );

    setBeforeDeleteBlur(true);

    return deleteTodo(todoId).finally(() => {
      setTodos(currentTodos =>
        currentTodos.map(todo =>
          todo.id === todoId ? { ...todo, isLoading: false } : todo,
        ),
      );
      setBeforeDeleteBlur(false);
    });
  };

  return (
    <DeleteContext.Provider value={{ handleDelete, beforeDeleteBlur }}>
      {children}
    </DeleteContext.Provider>
  );
};

export function useDeleteContext() {
  const ctx = useContext(DeleteContext);

  if (!ctx) {
    throw new Error('useDeleteContext must be used within an DeleteProvider');
  }

  return ctx;
}
