/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { AddTodo } from './components/AddTodo';
import classNames from 'classnames';
import { DispatchContext, TodosContext } from './context/Store';

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
          {todos.length !== 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                ['active']: isAllCompleted,
              })}
              data-cy="ToggleAllButton"
              onClick={handleToggleAll}
            />
          )}

          <AddTodo />
        </header>

        <TodoList />
        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
