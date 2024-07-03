import { FilterOption } from '../../types/types';
import { useTodos, useTodoApi } from './Context';
import { Filter } from './Filter';
import { NewTodo } from './NewTodo';
import { TodoList } from './TodoList';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';

export const TodoApp: React.FC = () => {
  const todos = useTodos();
  const { handleCompletedChange, handleTodoRemove } = useTodoApi();
  const [filter, setFilter] = useState<FilterOption>(FilterOption.All);

  const amountOfLeftTodos = useMemo(
    () =>
      todos.reduce((amount, todo) => (todo.completed ? amount : amount + 1), 0),
    [todos],
  );

  const areTodosCompleted = useMemo(
    () => todos.every(todo => todo.completed),
    [todos],
  );

  const areTodosActive = useMemo(
    () => todos.every(todo => !todo.completed),
    [todos],
  );

  const handleFilterChange = (newFilter: FilterOption) => setFilter(newFilter);

  const handleEveryCompletedChange = () =>
    todos.forEach(
      todo =>
        todo.completed === areTodosCompleted &&
        handleCompletedChange(todo.id, !areTodosCompleted),
    );

  const handleCompletedTodosRemove = () =>
    todos.forEach(todo => todo.completed && handleTodoRemove(todo.id));

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!!todos.length && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: areTodosCompleted,
              })}
              data-cy="ToggleAllButton"
              onClick={handleEveryCompletedChange}
            />
          )}

          <NewTodo />
        </header>

        {!!todos.length && (
          <>
            <TodoList filter={filter} />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {amountOfLeftTodos} items left
              </span>

              <Filter filter={filter} onFilterChange={handleFilterChange} />

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={areTodosActive}
                onClick={handleCompletedTodosRemove}
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
