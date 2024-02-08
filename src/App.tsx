/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { DispatchContext, StateContext } from './components/TodosContext';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState(Status.All);

  const onAdd = () => {
    if (title.trim()) {
      dispatch({
        type: 'add',
        payload: { title, id: +new Date(), completed: false },
      });

      setTitle('');
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd();
  };

  const allAreCompleted = state.every(todo => todo.completed);
  const hasTodos = state.length > 0;

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            value={title}
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={(e) => setTitle(e.target.value)}
            onBlur={onAdd}
          />
        </form>
      </header>

      <section className="main">
        {hasTodos && (
          <>
            <input
              checked={allAreCompleted}
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={() => dispatch({ type: 'toggleCompleteAll' })}
            />

            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList todos={state} filter={filter} />
          </>
        )}
      </section>

      {hasTodos
      && (
        <TodoFilter
          filter={filter}
          onFilterChange={setFilter}
        />
      )}
    </div>
  );
};
