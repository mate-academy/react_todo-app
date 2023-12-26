import { GlobalContextProvider } from './components/GlobalContextProvider';
import { TodoApp } from './components/TodoApp';

export const App = () => {
  return (
    <GlobalContextProvider>
      <TodoApp />
    </GlobalContextProvider>
  );
};
