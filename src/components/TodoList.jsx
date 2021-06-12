import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { DispatchContext } from '../context/TodosContext';
import { actions } from '../context/reducer';
import { toggleTodo } from '../api';
import { TodoItem } from './TodoItem';

export function TodoList({ todos, toggleAllChecked }) {
  const dispatch = useContext(DispatchContext);

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
        {todos.map(todo => (
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
