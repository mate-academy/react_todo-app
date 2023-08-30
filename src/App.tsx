import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { ToDoList } from './components/TodoList';
import {
  ACTIONS,
  StateContext,
  FILTER,
} from './ToDoContext';

export const App: React.FC = () => {
  const [value, setValue] = useState('');
  const [state, dispatch] = useContext(StateContext);
  const [triggerForAll, setTriggerForAll] = useState(true);

  function handleChange(event: React.KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();
    setValue(event.currentTarget.value);
  }

  const showClearComplited = state.list.filter(
    todo => todo.completed,
  ).length > 0;

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.nativeEvent.code === 'Enter') {
      e.preventDefault();
      if (!e.target.value.split('').every(element => element === ' ')) {
        dispatch({ type: ACTIONS.ADD, payload: e.currentTarget.value });
        setValue('');
      }
    }
  }

  function sortButtonHandler(trigger: string) {
    dispatch({ type: ACTIONS.SORT, payload: trigger });
  }

  function clearComplited() {
    dispatch({ type: ACTIONS.CLEAR });
  }

  function toggleAll() {
    dispatch({ type: ACTIONS.TOGGLE_ALL, payload: triggerForAll });
    setTriggerForAll(!triggerForAll);
  }

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={value}
            onChange={handleChange}
            onKeyDown={handleEnter}
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
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list" data-cy="todoList">
          <ToDoList list={state.list} />
        </ul>

      </section>

      {state.totalLength > 0 && (
        <>
          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${state.totalLength} items left`}
            </span>

            <ul className="filters">
              <li>
                <a
                  href="#/"
                  className={classNames({
                    selected: state.sortBy === FILTER.ALL,
                  })}
                  onClick={() => sortButtonHandler(FILTER.ALL)}
                >
                  All
                </a>
              </li>

              <li>
                <a
                  className={classNames({
                    selected: state.sortBy === FILTER.ACTIVE,
                  })}
                  href="#/active"
                  onClick={() => sortButtonHandler(FILTER.ACTIVE)}
                >
                  Active
                </a>
              </li>

              <li>
                <a
                  className={classNames({
                    selected: state.sortBy === FILTER.COMPLITED,
                  })}
                  href="#/completed"
                  onClick={() => sortButtonHandler(FILTER.COMPLITED)}
                >
                  Completed
                </a>
              </li>
            </ul>

            {showClearComplited && (
              <button
                type="button"
                className="clear-completed"
                onClick={clearComplited}
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
