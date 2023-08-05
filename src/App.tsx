import React, { useContext } from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';
import { TodoList } from './components/TodoList/TodoList';
import { TodoContext, TodoContextProvider } from './components/TodoContext';
import { TodosFilter } from './components/TodosFilter/TodosFilter';

export const App: React.FC = () => {
  const { dispatch } = useContext(TodoContext);

  const markAllComplete = () => {
    dispatch({ type: 'mark_all_completed' });
  };

  return (
    <TodoContextProvider>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoApp />
        </header>

        <section className="main">
          <input
            onChange={markAllComplete}
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList />

        </section>

        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            3 items left
          </span>
          <TodosFilter />

          <button type="button" className="clear-completed">
            Clear completed
          </button>
        </footer>
      </div>
    </TodoContextProvider>
  );
};
