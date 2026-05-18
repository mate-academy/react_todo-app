/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useRef, useState } from 'react';

import { NewTodoForm } from './components/NewTodoForm';
import { TodoFooter } from './components/TodoFooter';
import { TodoList } from './components/TodoList';
import { FILTERS, FilterType } from './constants/filters';
import { TodosProvider, useTodos } from './context/TodosContext';

const TodoAppContent: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>(FILTERS.all);
  const newTodoFieldRef = useRef<HTMLInputElement>(null);

  const { todos, toggleAllTodos } = useTodos();
  const hasTodos = todos.length > 0;
  const areAllTodosCompleted = hasTodos && todos.every(todo => todo.completed);

  const focusNewTodoField = () => {
    newTodoFieldRef.current?.focus();
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {hasTodos && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: areAllTodosCompleted,
              })}
              data-cy="ToggleAllButton"
              onClick={toggleAllTodos}
            />
          )}

          <NewTodoForm inputRef={newTodoFieldRef} />
        </header>

        {hasTodos && (
          <>
            <TodoList filter={filter} focusNewTodoField={focusNewTodoField} />

            <TodoFooter
              filter={filter}
              onFilterChange={setFilter}
              focusNewTodoField={focusNewTodoField}
            />
          </>
        )}
      </div>
    </div>
  );
};

export const App: React.FC = () => (
  <TodosProvider>
    <TodoAppContent />
  </TodosProvider>
);
