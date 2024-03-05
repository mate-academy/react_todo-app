import React, { ChangeEvent, FormEvent, useContext, useEffect } from 'react';
import { MyContext, MyContextData } from '../Provider/Provider';
import { Filtering } from '../CustomReducer/useCustomReducer';
import { TodosFilter } from '../Filter/TodosFilter';
import { TodoList } from '../TodoList/TodoList';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const TodoApp: React.FC = () => {
  const contextValue = useContext(MyContext);
  const { query, setQuery, activeFilter, setActiveFilter, reducer } =
    contextValue as MyContextData;

  const {
    state,
    filterItems,
    addTodo,
    clearCompleted,
    allCompleted,
    dispatch,
  } = reducer;

  const itemsLeft = `${state.length - state.filter((elem: Todo) => elem.completed).length} `;
  const hasItems = state.length > 0

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
    dispatch({ type: action });
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

      {hasItems && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={allCompleted}
            />
            {hasItems && (
              /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
              <label htmlFor="toggle-all">Mark all as complete</label>
            )}
            <TodoList data={filterItems(activeFilter)} />
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
