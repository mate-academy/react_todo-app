/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import { Footer } from './components/Todo-Footer/Todo-Footer';
import { TodoList } from './components/Todo-List/TodoList';
import { TodosContext, TodosProvider } from './TodosContext';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  const { handleCompleteAll } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <TodosProvider>
        <TodoApp />
        <header className="header">
          <h1>todos</h1>
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            // checked={completed}
            onClick={() => handleCompleteAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList />
        </section>

        <Footer />
      </TodosProvider>
    </div>
  );
};
