import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import classNames from 'classnames';
import { TodoList } from './components/TodoList/TodoList';
import Todo from './types/Todo';
import {
  TodoContext,
  TodoProvider,
} from './components/TodoContext/TodoContext';

enum Filtering {
  All = 'all',
  Active = 'active',
  Complete = 'complete',
  Clean = 'clear',
  Add = 'add',
}

export const App: React.FC = () => {
  const { data, setData } = useContext(TodoContext);

  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>(Filtering.All); // Track active filter
  const itemsLeft = `${data.length - data.filter((elem: Todo) => elem.completed).length} `;

  const filterData = (action?: string) => {
    let filteredData: Todo[];

    switch (action) {
      case Filtering.Active:
        filteredData = data.filter((elem: Todo) => elem.completed === false);
        break;
      case Filtering.Complete:
        filteredData = data.filter((elem: Todo) => elem.completed === true);
        break;
      case Filtering.Clean:
        filteredData = data.filter((elem: Todo) => elem.completed === false);

        return setData(filteredData);
      case Filtering.All:
        filteredData = data;
        break;
      default:
        filteredData = data;
        break;
    }

    return filteredData;
  };

  const addItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim() !== '') {
      setData(cur => [
        ...cur,
        {
          id: +new Date(),
          title: query,
          completed: false,
        },
      ]);
      setQuery('');
    }
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFilter = (action: string) => {
    setActiveFilter(action);
    filterData(action);
  };

  return (
    <TodoProvider>
      <>
        <div className="todoapp">
          <header className="header">
            <h1>todos</h1>

            <form onSubmit={addItem}>
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

          {data.length > 0 && (
            <section className="main">
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                data-cy="toggleAll"
              />
              <label htmlFor="toggle-all">Mark all as complete</label>

              {data.length > 0 && (
                <TodoList data={filterData(activeFilter) || []} />
              )}
            </section>
          )}

          {data.length > 0 && (
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
    </TodoProvider>
  );
};
