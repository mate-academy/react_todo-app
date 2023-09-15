import React, { useState, useContext, useMemo } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../TodosContext';
import { ActionType } from '../../types/Action';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList';
import { Filter } from '../../types/Filter';

export const TodoApp: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const { todos, dispatch } = useContext(TodosContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo: Todo = {
      title: query,
      id: +new Date(),
      completed: false,
    };

    dispatch({ type: ActionType.Add, payload: newTodo });
    setQuery('');
  };

  const handleActiveLinkClick = () => {
    if (filter !== Filter.Active) {
      setFilter(Filter.Active);
    }
  };

  const handleCompletedLinkClick = () => {
    if (filter !== Filter.Completed) {
      setFilter(Filter.Completed);
    }
  };

  const handleAllLinkClick = () => {
    if (filter !== Filter.All) {
      setFilter(Filter.All);
    }
  };

  const uncomplitedTodos = useMemo(() => todos
    .filter(({ completed }) => !completed).length, [todos]);
  const filtredTodo = todos.filter(({ completed }) => {
    switch (filter) {
      case Filter.Active:
        return !completed;
      case Filter.Completed:
        return completed;
      default:
        return true;
    }
  }, [filter]);

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>
      </header>

      <TodoList items={filtredTodo} />

      {!!todos.length && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${uncomplitedTodos} item${uncomplitedTodos === 1 ? '' : 's'} left`}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={classNames({
                  selected: filter === Filter.All,
                })}
                onClick={handleAllLinkClick}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={classNames({
                  selected: filter === Filter.Active,
                })}
                onClick={handleActiveLinkClick}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={classNames({
                  selected: filter === Filter.Completed,
                })}
                onClick={handleCompletedLinkClick}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            onClick={() => dispatch({ type: ActionType.DeleteComplited })}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
