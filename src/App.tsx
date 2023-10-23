import React, { useContext } from 'react';
import { Header } from './Components/Header';
import { Todos } from './Components/Todos';
import { Footer } from './Components/Footer';
import { TodosContext } from './TodosContext';

export const App: React.FC = () => {
  const { todos, allComplet, filteredTodos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <Header />
      <>
        <section className="main">
          {todos.length > 0 && (
            <>
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                data-cy="toggleAll"
                onClick={allComplet}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>
              <Todos todos={filteredTodos} />
            </>
          )}
        </section>
      </>
      <Footer />
    </div>
  );
};
