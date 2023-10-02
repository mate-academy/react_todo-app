import React, { useContext, useMemo, useState } from 'react';
import classNames from 'classnames';
import { TodoList } from '../TodoList';
import { Status } from '../../types/Status';
import { TodosContext } from '../../contexts/TodosContext';

export const TodoApp: React.FC = () => {
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<Status>(Status.All);

  const {
    todos,
    addTodo,
    markAllComplete,
    clearCompleted,
    filterTodos,
  } = useContext(TodosContext);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim().length === 0) {
      return;
    }

    addTodo(title);
    setTitle('');
  };

  const applyFilter = (value: Status) => {
    setFilter(value);
  };

  const filteredTodos = useMemo(() => {
    return filterTodos(filter);
  }, [filter, todos]);

  const handleClearCompleted = () => {
    clearCompleted();
  };

  const itemsLeft = todos.filter(el => !el.completed).length;
  const hasCompletedTodos = todos.some((todo) => todo.completed);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={handleTitle}
          />
        </form>
      </header>

      {todos.length !== 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={markAllComplete}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList todos={filteredTodos} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${itemsLeft} items left`}
            </span>

            <ul className="filters">
              <li>
                <a
                  href="#/"
                  className={classNames({
                    selected: filter === Status.All,
                  })}
                  onClick={() => applyFilter(Status.All)}
                >
                  All
                </a>
              </li>
              <li>
                <a
                  href="#/active"
                  className={classNames({
                    selected: filter === Status.Active,
                  })}
                  onClick={() => applyFilter(Status.Active)}
                >
                  Active
                </a>
              </li>
              <li>
                <a
                  href="#/completed"
                  className={classNames({
                    selected: filter === Status.Completed,
                  })}
                  onClick={() => applyFilter(Status.Completed)}
                >
                  Completed
                </a>
              </li>
            </ul>

            {hasCompletedTodos && (
              <button
                type="button"
                className="clear-completed"
                onClick={handleClearCompleted}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};
