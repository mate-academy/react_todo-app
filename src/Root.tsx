import { App } from './App';
import { TodosProvider } from './store/TodosContext';

export const Root = () => (
  <TodosProvider>
    <App />
  </TodosProvider>
);
