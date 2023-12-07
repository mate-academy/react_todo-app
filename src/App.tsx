import React, { useContext } from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import {
  TodosContext,
} from './components/TodosContext/TodosContext';

import { TodoList } from './components/TodoList/TodoList';

export const App: React.FC = () => {
  const { todos, handleAllCompleted, filteredTodos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <>
        <Header />
      </>
      <section className="main">
        {todos.length > 0 && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={handleAllCompleted}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList todos={filteredTodos} />
          </>
        )}
      </section>
      <>
        <Footer />
      </>
    </div>
  );
};
