import React, { useMemo, useState } from 'react';
import cn from 'classnames';

import { TodoList } from './component/TodoList';
import { useTodos } from './component/TodosContext';
import { linkOptions } from './data/dataFromLink';
import { Status } from './types/Status';
import { ToggleAll } from './component/ToggleAll';
import { ClearCompleted } from './component/ClearCompleted';

export const App: React.FC = () => {
  const {
    todos,
    addTodo,
    filterTodos,
  } = useTodos();

  const [title, setTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState(Status.All);

  const activeTodosCount = useMemo(() => {
    return todos.reduce((prev, todo) => {
      if (!todo.completed) {
        return prev + 1;
      }

      return prev;
    }, 0);
  }, [todos]);

  const hasCompletedTodo = useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return filterTodos(filterStatus);
  }, [todos, filterStatus]);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (title.trim() === '') {
      return;
    }

    addTodo(title);
    setTitle('');
  }

  function handleFilterChange(status: Status) {
    setFilterStatus(status);
  }

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
            onChange={handleTitleChange}
          />
        </form>
      </header>

      {todos.length !== 0 && (
        <>
          <section className="main">
            <ToggleAll />

            <TodoList todos={filteredTodos} />
          </section>

          <footer className="footer" data-cy="todosFilter">
            <span className="todo-count" data-cy="todosCounter">
              {activeTodosCount === 1
                ? (`${activeTodosCount} item left`)
                : (`${activeTodosCount} items left`)}
            </span>

            <ul className="filters">
              {linkOptions.map(link => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className={cn(
                      { selected: filterStatus === link.filterValue },
                    )}
                    onClick={() => handleFilterChange(link.filterValue)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {hasCompletedTodo && (
              <ClearCompleted />
            )}
          </footer>
        </>
      )}
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>

  );
};
