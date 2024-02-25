import React, { ChangeEvent, FormEvent, useState } from 'react';
import classNames from 'classnames';
import { TodoList } from './components/TodoList/TodoList';
import {
  Filtering,
  useCustomReducer,
} from './components/CustomReducer/useCustomReducer';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const App: React.FC = () => {
  const { state, filterItems, addTodo } = useCustomReducer();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<Filtering>(Filtering.All);

  const itemsLeft = `${state.length - state.filter((elem: Todo) => elem.completed).length} `;

  const handleAddItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim() !== '') {
      const obj: Todo = {
        id: +new Date(),
        title: query,
        completed: false,
      };

      addTodo(obj);
      setQuery('');
    }
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFilter = (action: Filtering) => {
    setActiveFilter(action);
    filterItems(action);
  };

  return (
    <>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={handleAddItem}>
            <input
              type="text"
              data-cy="createTodo"
              className="new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={handleInput}
            />
          </form>
        </header>

        {state.length > 0 && (
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            {state.length > 0 && <TodoList data={state} />}
          </section>
        )}

        {state.length > 0 && (
          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {itemsLeft}
              item left
            </span>

            <ul className="filters">
              <li>
                <a
                  href="#/"
                  className={classNames({
                    selected: activeFilter === Filtering.All,
                  })}
                  onClick={() => handleFilter(Filtering.All)}
                >
                  All
                </a>
              </li>

              <li>
                <a
                  href="#/active"
                  className={classNames({
                    selected: activeFilter === Filtering.Active,
                  })}
                  onClick={() => handleFilter(Filtering.Active)}
                >
                  Active
                </a>
              </li>

              <li>
                <a
                  href="#/completed"
                  className={classNames({
                    selected: activeFilter === Filtering.Complete,
                  })}
                  onClick={() => handleFilter(Filtering.Complete)}
                >
                  Completed
                </a>
              </li>
            </ul>

            <button
              type="button"
              className="clear-completed"
              // style={}
              onClick={() => handleFilter(Filtering.Clean)}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </>
  );
};
