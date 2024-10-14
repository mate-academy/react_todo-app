import { TodoApp } from './components/TodoApp';
import { GlobalStateProvider } from './store/Store';

export const App: React.FC = () => (
  <GlobalStateProvider>
    <TodoApp />
  </GlobalStateProvider>
);
