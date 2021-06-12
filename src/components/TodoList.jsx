import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import { DispatchContext, TodosContext } from '../context/TodosContext';
import { actions } from '../context/reducer';
import { toggleTodo } from '../api';
import { TodoItem } from './TodoItem';
import { FILTERS } from '../constants';

export function TodoList() {
  const todos = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);
  const { pathname } = useLocation();

  const filteredTodos = useMemo(
    () => (
      todos.filter(({ completed }) => {
        switch (pathname) {
          case FILTERS.active:
            return !completed;

          case FILTERS.completed:
            return completed;

          case FILTERS.all:
          default:
            return true;
        }
      })
    )
    , [todos, pathname],
  );

  const toggleAllChecked = useMemo(() => (
    todos.every(({ completed }) => completed)
  ), [todos]);

  const handleToggleAll = async() => {
    let results;

    if (toggleAllChecked || todos.every(todo => !todo.completed)) {
      results = await Promise.allSettled(
        todos.map(todo => toggleTodo(todo.id, !todo.completed)),
      );
    } else {
      results = await Promise.allSettled(
        todos.filter(todo => !todo.completed)
          .map(todo => toggleTodo(todo.id, true)),
      );
    }

    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        dispatch(actions.toggle(result.value.id));
      } else {
        alert(`Failed to toggle item`);
      }
    });
  };

  return (
    <section className="main">
      {todos.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={toggleAllChecked}
            onChange={handleToggleAll}
          />
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>
        </>
      )}

      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </section>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
  toggleAllChecked: PropTypes.bool,
};

TodoList.defaultProps = {
  todos: [],
  toggleAllChecked: false,
};
