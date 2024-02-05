// import { BrowserRouter as Router } from 'react-router-dom';
import { TodoApp } from './components/TodoApp';
import { TodosProvider } from './store/TodosContext';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  );
};
