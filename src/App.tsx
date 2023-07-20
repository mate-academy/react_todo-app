/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import TodoFooter from './components/TodoFooter';
import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';
import { useTodoContext } from './hooks/useTodoContext';

export const App: React.FC = () => {
  const { todos, toggleAllAsCompleted } = useTodoContext();

  return (
    <div className="todoapp">
      <TodoHeader />

      {todos.length > 0
        && (
          <>
            <section className="main">
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                data-cy="toggleAll"
                onChange={toggleAllAsCompleted}
              />
              <label>Mark all as complete</label>
              <TodoList />
            </section>
            <TodoFooter />
          </>
        )}
    </div>
  );
};
