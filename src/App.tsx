/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useContext, useMemo } from 'react';
import cn from 'classnames';

import { TodoList } from './components/TodoList';
import { Status } from './types';
import { TodosContext } from './TodosContext';

export const App: React.FC = () => {
  const [fitlerParam, setFilterParam] = useState(Status.All);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const {
    todos,
    toggleAll,
    addNewTodo,
    filterTodos,
    clearAllCompleted,
  } = useContext(TodosContext);

  const visibleTodos = useMemo(() => {
    return filterTodos(fitlerParam);
  }, [todos, fitlerParam]);

  const uncompletedTodosAmount = useMemo(() => todos
    .filter(todo => !todo.completed).length, [todos]);

  const handleSubmitNewTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTodoTitle.trim()) {
      addNewTodo({
        id: `${+new Date()}`,
        title: newTodoTitle,
        completed: false,
      });
    }

    setNewTodoTitle('');
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmitNewTodo}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={event => setNewTodoTitle(event.target.value)}
          />
        </form>
      </header>

      {!!todos.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={toggleAll}
            />
            <label
              htmlFor="toggle-all"
              className={cn({
                hidden: !todos.length,
              })}
            >
              Mark all as complete
            </label>

            <TodoList todos={visibleTodos} />
          </section>

          <footer className="footer" data-cy="todosFilter">
            <span className="todo-count" data-cy="todosCounter">
              {uncompletedTodosAmount === 1
                ? '1 item left'
                : `${uncompletedTodosAmount} items left`}
            </span>

            <ul className="filters">
              <li>
                <a
                  href="#/"
                  className={cn({
                    selected: fitlerParam === Status.All,
                  })}
                  onClick={() => setFilterParam(Status.All)}
                >
                  All
                </a>
              </li>

              <li>
                <a
                  href="#/active"
                  className={cn({
                    selected: fitlerParam === Status.Active,
                  })}
                  onClick={() => setFilterParam(Status.Active)}
                >
                  Active
                </a>
              </li>

              <li>
                <a
                  href="#/completed"
                  className={cn({
                    selected: fitlerParam === Status.Completed,
                  })}
                  onClick={() => setFilterParam(Status.Completed)}
                >
                  Completed
                </a>
              </li>
            </ul>

            {uncompletedTodosAmount !== todos.length && (
              <button
                type="button"
                className="clear-completed"
                onClick={clearAllCompleted}
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
