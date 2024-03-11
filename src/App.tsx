/* eslint-disable jsx-a11y/control-has-associated-label */
import { Footer } from './components/Todo-Footer/Todo-Footer';
import { TodosProvider } from './TodosContext';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosProvider>
        <TodoApp />
        <header className="header">
          <h1>todos</h1>
        </header>

        <Footer />
      </TodosProvider>
    </div>
  );
};
