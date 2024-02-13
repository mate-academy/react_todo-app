import React, { useContext, useState } from 'react';
import { DispatchContext, StateContext } from './components/TodosContext';
import { Status } from './types/Status';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodosFilter';

export const App: React.FC = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState(Status.All);

  const onAdd = () => {
    if (title.trim()) {
      dispatch({
        type: 'add',
        payload: {
          title,
          id: +new Date(),
          completed: false,
        },
      });

      setTitle('');
    }
  };

  const handleFormOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd();
  };

  const allAreCompleted = state.every(todo => todo.completed);
  const hasTodos = state.length > 0;

  return (
    <div className="todoapp">
      <header className="header">
        <h1>ToDos</h1>

        <form onSubmit={handleFormOnSubmit}>
          <input
            value={title}
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={event => setTitle(event.target.value)}
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
              onChange={() => dispatch({ type: 'completeAll' })}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <TodoList todos={state} filter={filter} />
          </>
        )}
      </section>

      {hasTodos && (
        <TodoFilter
          todos={state}
          filter={filter}
          onFilter={setFilter}
        />
      )}

    </div>
  );
};
