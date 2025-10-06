import React, { useContext } from 'react';
import { Todo } from '../types/Todo';
import { useTodosContext } from './TodosContext';
import { useErrorContext } from './ErrorContext';
import { ErrorMessage } from '../types/ErrorMessage';
import * as todoService from '../api/todos';

interface UpdateContextType {
  updateTodo: (updatedTodo: Todo) => Promise<void>;
}

export const UpdateContext = React.createContext<UpdateContextType | null>(
  null,
);

interface Props {
  children: React.ReactNode;
}

export const UpdateProvider: React.FC<Props> = ({ children }) => {
  const { setTodos } = useTodosContext();
  const { setErrorMessage, setIsHiddenErrorMessage } = useErrorContext();

  function updateTodo(updatedTodo: Todo): Promise<void> {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === updatedTodo.id ? { ...todo, isLoading: true } : todo,
      ),
    );

    return todoService
      .updateTodo(updatedTodo)
      .then(todoSuccess => {
        setTodos(currentTodos =>
          currentTodos.map(todo =>
            todo.id === updatedTodo.id ? todoSuccess : todo,
          ),
        );
      })
      .catch(error => {
        setTodos(currentTodos =>
          currentTodos.map(todo =>
            todo.id === updatedTodo.id ? { ...todo, isLoading: false } : todo,
          ),
        );
        setErrorMessage(ErrorMessage.updateTodoError);
        setIsHiddenErrorMessage(false);
        throw error;
      });
  }

  return (
    <UpdateContext.Provider value={{ updateTodo }}>
      {children}
    </UpdateContext.Provider>
  );
};

export function useUpdateContext() {
  const ctx = useContext(UpdateContext);

  if (!ctx) {
    throw new Error('useUpdateContext must be used within an UpdateProvider');
  }

  return ctx;
}
