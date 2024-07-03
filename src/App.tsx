/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { AddTodo } from './components/AddTodo';
import classNames from 'classnames';
import { DispatchContext, TodosContext } from './context/store';

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const todos = useContext(TodosContext);

  const isAllCompleted = todos.every(t => t.completed === true);

  const handleToggleAll = () => {
    dispatch({ type: 'setAllComplete', payload: !isAllCompleted });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              ['active']: isAllCompleted,
            })}
            data-cy="ToggleAllButton"
            onClick={handleToggleAll}
          />

          {/* Add a todo on form submit */}
          <AddTodo />
        </header>

        <TodoList />
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
