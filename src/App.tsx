// /* eslint-disable jsx-a11y/control-has-associated-label */
import { TodoProvider } from './TodoContext';
import { AppContent } from './AppContent/AppContent';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  );
};
