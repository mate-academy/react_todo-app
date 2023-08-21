import React, { useContext, useState } from 'react';
import { ToDoList } from './components/TodoList';
import { DispatchContext, StateContext } from './ToDoContext';

export const App: React.FC = () => {
  const [value, setValue] = useState('');
  const dispatch = useContext(DispatchContext);
  const { list } = useContext(StateContext);
  const [triggerForAll, setTriggerForAll] = useState(true);

  function handleChange(event: React.KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();
    setValue(event.currentTarget.value);
  }

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.nativeEvent.code === 'Enter') {
      e.preventDefault();
      if (!e.target.value.split('').every(element => element === ' ')) {
        dispatch({ type: 'addPost', payload: e.currentTarget.value });
        setValue('');
      }
    }
  }

  function sortBy(trigger: string) {
    dispatch({ type: 'sortBy', payload: trigger });
  }

  function clearComplited() {
    dispatch({ type: 'removeComplited' });
  }

  function toggleAll() {
    dispatch({ type: 'TOGGLE_ALL', payload: triggerForAll });
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
          <ToDoList list={list} />
        </ul>

      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${list.length} items left`}
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className="selected"
              onClick={() => sortBy('ALL')}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              onClick={() => sortBy('ACTIVE')}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              onClick={() => sortBy('COMPLITED')}
            >
              Completed
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="clear-completed"
          onClick={clearComplited}
        >
          Clear completed
        </button>
      </footer>
    </div>
  );
};
