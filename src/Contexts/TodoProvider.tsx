import { TodoDataProvider } from './TodoDataContext';
import { TodoUIProvider } from './TodoUIContext';

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <TodoUIProvider>
    <TodoDataProvider>{children}</TodoDataProvider>
  </TodoUIProvider>
);
