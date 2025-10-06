import React, { useContext } from 'react';
import { Todo } from '../types/Todo';
import { ErrorMessage } from '../types/ErrorMessage';
import { useTodosContext } from './TodosContext';
import { useErrorContext } from './ErrorContext';
import * as todoService from '../api/todos';

interface AddContextType {
  addTodo: ({ title, completed, userId }: Omit<Todo, 'id'>) => Promise<void>;
}

export const AddContext = React.createContext<AddContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const AddProvider: React.FC<Props> = ({ children }) => {
  const { todos, setTodos } = useTodosContext();
  const { setErrorMessage, setIsHiddenErrorMessage } = useErrorContext();

  function addTodo({
    title,
    completed,
    userId,
  }: Omit<Todo, 'id'>): Promise<void> {
    const tempTodo: Todo = {
      id: Date.now(),
      title: title,
      completed: completed,
      userId: userId,
      isLoading: true,
    };

    setTodos(currTodos => [...currTodos, tempTodo]);

    return todoService
      .createTodo({ title, completed, userId })
      .then(newTodo => {
        setTodos(currentTodos =>
          currentTodos.map(todo =>
            todo.id === tempTodo.id ? { ...newTodo, isLoading: false } : todo,
          ),
        );
      })
      .catch(error => {
        setTodos(todos);
        setErrorMessage(ErrorMessage.addTodoError);
        setIsHiddenErrorMessage(false);
        throw error;
      });
  }

  return (
    <AddContext.Provider value={{ addTodo }}>{children}</AddContext.Provider>
  );
};

export function useAddContext() {
  const ctx = useContext(AddContext);

  if (!ctx) {
    throw new Error('useAddContext must be used within an AddProvider');
  }

  return ctx;
}
