/* eslint-disable */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
// import { ToDo } from './types/ToDo';
import { DispatchContext, StateContext } from './ToDoContext';
import { ToDoList } from './components/TodoList';
import _ from 'lodash';
import { ToDo } from './types/ToDo';
// import { ToDo } from './types/ToDo';
/* eslint-disable */
// eslint-disable
export const App: React.FC = () => {
  const [value, setValue] = useState('');
  const dispatch = useContext(DispatchContext);
  let { list, visibleList } = useContext(StateContext);
  const [filterCheck, setFilterCheck] = useState('')

  function handleChange(event: React.KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();
    setValue(event.currentTarget.value);
  }

  const copyList: ToDo[] = _.cloneDeep(list);

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.nativeEvent.code === 'Enter') {
      if (!e.target.value.split('').every(element => element === ' ')) {
        dispatch({ type: 'addPost', payload: e.currentTarget.value });
        setValue('');
      }
    }
  }

  const handlerFilterCompletedClick = () => {
    dispatch({ type: 'filterArray', payload: true });
    setFilterCheck('complited');
  }
  function handlerFilterActiveClick() {
    dispatch({ type: 'filterArray', payload: false });
    setFilterCheck('complited');
  }

  function handleAll() {
    dispatch({ type: 'filterArray', payload: 'all' });
    setFilterCheck('all');
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
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list" data-cy="todoList">
          <ToDoList list={filterCheck === 'complited' ? visibleList : copyList} />
        </ul>

      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${list.length} items left`}
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected"
              onClick={handleAll}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              onClick={handlerFilterActiveClick}
            >
              Active
            </a>
          </li>

          <li>
            <a href="#/completed"
              onClick={handlerFilterCompletedClick}
            >
              Completed
            </a>
          </li>
        </ul>

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </div>
  );
};
