import { ReactNode, createContext, useState } from 'react';
import { Todo } from '../../types/Todo';

type LoadingProviderProps = {
  children?: ReactNode;
  todos: Todo[];
};

export const LoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isLoading: false,
  setIsLoading: () => {},
});

// eslint-disable-next-line max-len
export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children, todos }) => {
  // eslint-disable-next-line max-len
  const [isLoading, setIsLoading] = useState(() => todos.some(todo => todo.id === 0));

  const loadingValue = {
    isLoading,
    setIsLoading,
  };

  return (
    <LoadingContext.Provider value={loadingValue}>
      {children}
    </LoadingContext.Provider>
  );
};
