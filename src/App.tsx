/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useContext, useMemo } from 'react';
import cn from 'classnames';

import { TodoList } from './components/TodoList';
import { Status } from './types';
import { TodosContext } from './TodosContext';
import { filterTodos } from './helpers';

export const App: React.FC = () => {
  const [fitlerParam, setFilterParam] = useState(Status.All);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const {
    todos,
    toggleAll,
    addNewTodo,
    clearAllCompleted,
  } = useContext(TodosContext);

  const visibleTodos = useMemo(() => {
    return filterTodos(todos, fitlerParam);
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

      <footer className={cn('footer', {
        hidden: !todos.length,
      })}
      >
        <span className="todo-count" data-cy="todosCounter">
          {`${uncompletedTodosAmount} items left`}
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

        <button
          type="button"
          className={cn('clear-completed', {
            hidden: uncompletedTodosAmount === todos.length,
          })}
          onClick={clearAllCompleted}
        >
          Clear completed
        </button>
      </footer>
    </div>
  );
};
