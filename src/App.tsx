/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useMemo, useState } from 'react';
import classNames from 'classnames';
import { TodoContext } from './context/TodosContext';
import { NewTodoForm } from './components/NewTodoForm';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);

  const areAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case FilterStatus.Active:
          return !todo.completed;
        case FilterStatus.Completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }, [todos, filter]);

  const toggleAll = () => {
    setTodos(currentTodos =>
      currentTodos.map(todo => ({
        ...todo,
        completed: !areAllCompleted,
      })),
    );
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: areAllCompleted,
              })}
              data-cy="ToggleAllButton"
              onClick={toggleAll}
            />
          )}

          <NewTodoForm />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <TodoFooter filter={filter} onFilterChange={setFilter} />
          </>
        )}
      </div>
    </div>
  );
};
