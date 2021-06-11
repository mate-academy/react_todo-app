import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { DispatchContext } from '../context/TodosContext';
import { actions } from '../context/reducer';
import { TodoItem } from './TodoItem';

export function TodoList({ todos, toggleAllChecked }) {
  const dispatch = useContext(DispatchContext);

  return (
    <section className="main">
      {todos.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={toggleAllChecked}
            onChange={() => dispatch(actions.toggleAll())}
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
      id: PropTypes.string.isRequired,
    }),
  ),
  toggleAllChecked: PropTypes.bool,
};

TodoList.defaultProps = {
  todos: [],
  toggleAllChecked: false,
};
