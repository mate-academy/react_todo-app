/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useTodos } from './context/TodoContext';
import classNames from 'classnames';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  const { todos, toggleAll } = useTodos();

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const isAllCompleted = todos.length > 0 && activeTodosCount === 0;

  const handleToggleAll = () => {
    toggleAll(!isAllCompleted);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              data-cy="ToggleAllButton"
              onClick={handleToggleAll}
              className={classNames('todoapp__toggle-all', {
                active: isAllCompleted,
              })}
            />
          )}

          <NewTodo />
        </header>

        {todos.length > 0 && <TodoList />}

        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
