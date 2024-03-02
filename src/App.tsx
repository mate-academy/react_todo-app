import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import {
  Filtering,
  useCustomReducer,
} from './components/CustomReducer/useCustomReducer';
import { TodosFilter } from './components/Filter/TodosFilter';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const App: React.FC = () => {
  const reducer = useCustomReducer();
  const { state, filterItems, addTodo, clearCompleted, allCompleted } = reducer;
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<Filtering>(Filtering.All);

  const itemsLeft = `${state.length - state.filter((elem: Todo) => elem.completed).length} `;

  useEffect(() => {
    const todos = JSON.stringify(state);

    localStorage.setItem('todos', todos);
  }, [state]);

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
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
            />
            {state.length > 0 && (
              /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
              <label htmlFor="toggle-all" onMouseDown={() => allCompleted()}>
                Mark all as complete
              </label>
            )}
            <TodoList data={reducer} activeFilter={activeFilter} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {itemsLeft}
              item left
            </span>

            <TodosFilter
              activeFilter={activeFilter}
              handleFilter={handleFilter}
            />

            {state.find(todo => todo.completed) && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => clearCompleted()}
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
