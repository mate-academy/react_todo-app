import { memo } from 'react';
import { useTodoController } from '../hooks/useTodoController';
import { TodoContext } from './useTodoContext';

type Props = {
  children: React.ReactNode;
};

// eslint-disable-next-line react/display-name
export const TodoContextProvider: React.FC<Props> = memo(({ children }) => {
  const value = useTodoController();

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
});
