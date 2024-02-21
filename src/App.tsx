/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { StateContext, DispatchContext } from './components/TodosContext';
import { Status } from './components/types/Status';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodosFilter/TodosFilter';

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

  const allCompleted = state.every(todo => todo.completed);

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
          />
        </form>
      </header>

      <section className="main">
        {state.length > 0 && (
          <>
            <input
              checked={allCompleted}
              id="toggle-all"
              type="checkbox"
              data-cy="toggleAll"
              className="toggle-all"
              onChange={() => dispatch({ type: 'toggleCompleteAll' })}
            />
            <label htmlFor="toggle-all">Mark all complete</label>
            <TodoList todos={state} filter={filter} />
          </>
        )}
      </section>

      {state.length > 0 && (
        <TodoFilter
          filter={filter}
          onFilterChange={setFilter}
        />
      )}
    </div>
  );
};
