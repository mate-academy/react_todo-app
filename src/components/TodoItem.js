import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TodoItem = ({ todo }) => (
  <li>
    <div className="view">
      <label
        className={classnames({ 'todo-completed': todo.completed })}
        htmlFor="todo-1"
      >
        {todo.title}
        <input
          id={todo.id}
          type="checkbox"
          defaultChecked={todo.completed}
          className="toggle"
        />
      </label>
      <button
        type="button"
        className="destroy"
      />
    </div>
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoItem;
