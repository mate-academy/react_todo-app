/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useRef, useState } from 'react';
import { NewTodoForm, NewTodoFormRef } from './components/NewTodoForm';
import { ActionType, useTodos } from './context/TodoContext';
import { TodoItem } from './components/TodoItem';
import classNames from 'classnames';
import { Filter, FILTER_STATUSES } from './types/Filter';

export const App: React.FC = () => {
  const { todos, filter, dispatch } = useTodos();

  const [editingId, setEditingId] = useState<number | null>(null);

  const hasTodos = !!todos.length;
  const allCompleted = todos.every(todo => todo.completed);

  const activeTodosCount = todos.filter(todo => !todo.completed);
  const completedTodosCount = todos.length - activeTodosCount.length;
  const isClearDisabled = completedTodosCount === 0;

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      case 'all':
      default:
        return true;
    }
  });

  const newTodoFormRef = useRef<NewTodoFormRef>(null);

  const focusNewTodoField = () => {
    newTodoFormRef.current?.focusInput();
  };

  const handleClearCompleted = () => {
    dispatch({ type: ActionType.ClearCompleted });
    focusNewTodoField();
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {hasTodos && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: allCompleted,
              })}
              data-cy="ToggleAllButton"
              onClick={() => dispatch({ type: ActionType.ToggleAll })}
            />
          )}

          {/* Add a todo on form submit */}
          <NewTodoForm ref={newTodoFormRef} />
        </header>

        {hasTodos && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isEditing={editingId === todo.id}
                  setEditingId={setEditingId}
                  onDelete={focusNewTodoField}
                />
              ))}
            </section>

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {activeTodosCount.length} item
                {activeTodosCount.length !== 1 ? 's' : ''} left
              </span>

              {/* Active link should have the 'selected' class */}
              <nav className="filter" data-cy="Filter">
                {FILTER_STATUSES.map(status => (
                  <a
                    key={status}
                    href={`#/${status === 'all' ? '' : status}`}
                    onClick={() =>
                      dispatch({
                        type: ActionType.SetFilter,
                        payload: {
                          filter: status as Filter,
                        },
                      })
                    }
                    className={classNames('filter__link', {
                      selected: filter === status,
                    })}
                    data-cy={`FilterLink${status.charAt(0).toUpperCase() + status.slice(1)}`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </a>
                ))}
              </nav>

              {/* this button should be disabled if there are no completed todos */}
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={isClearDisabled}
                onClick={handleClearCompleted}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
};
