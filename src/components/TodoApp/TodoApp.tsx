import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import './TodoApp.scss';
import { Filter } from '../Filter';
import { TodoList } from '../TodoList';
import { useTodos } from '../../providers/TodosProvider/hooks/useTodos';
import { FilterType } from '../../types/FilterType';
import { ActionType } from '../../types/ActionType';
import { filterTodos } from './services/filterTodos';
import { createTodo } from './services/createTodo';
import { useTodoForm } from './hooks/useTodoForm';

export const TodoApp: React.FC = () => {
  const { todos, setTodos } = useTodos();
  const { title, setTitle, handleSubmit } = useTodoForm(normalizedTitle =>
    setTodos({
      type: ActionType.AddTodo,
      payload: createTodo(normalizedTitle),
    }),
  );
  const [filter, setFilter] = useState(FilterType.All);
  const activeElement = useRef<HTMLInputElement>(null);

  useEffect(() => activeElement.current?.focus(), [todos]);

  const areAllCompleted = todos.every(({ completed }) => completed);
  const uncompletedTodos = todos.filter(({ completed }) => !completed);
  const filteredTodos = filterTodos(todos, filter);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!!todos.length && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: areAllCompleted,
              })}
              data-cy="ToggleAllButton"
              onClick={() =>
                setTodos({
                  type: ActionType.LeadToOneStatus,
                  payload: !areAllCompleted,
                })
              }
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={event => setTitle(event.target.value)}
              ref={activeElement}
            />
          </form>
        </header>

        <TodoList todos={filteredTodos} active={activeElement} />

        {!!todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {uncompletedTodos.length} items left
            </span>

            <Filter filter={filter} onChange={setFilter} />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => setTodos({ type: ActionType.ClearCompleted })}
              disabled={uncompletedTodos.length === todos.length}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
