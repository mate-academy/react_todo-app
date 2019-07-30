import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

function TodoList({
  todos,
  handleToggle,
  handleRemove,
  handleToggleAll,
  handleSubmit,
}) {
  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onChange={event => handleToggleAll(event)}
        checked={todos.every(todo => todo.completed)}
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            handleToggle={handleToggle}
            handleRemove={handleRemove}
            handleSubmit={handleSubmit}
            todo={todo}
            key={todo.id}
          />
        ))}
      </ul>
    </>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleToggleAll: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
export default TodoList;
