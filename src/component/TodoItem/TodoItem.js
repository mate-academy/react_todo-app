
import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

const TodoItem = ({ todo, checkBoxClick, deleteTodo }) => {
  const className = cx({ '': true,
    'crossed-label': todo.completed,
  });

  return (
    <li className="">
      <div className="view">
        <input
          type="checkbox"
          onClick={() => checkBoxClick(todo)}
          className="toggle"
          id={todo.id}
          checked={todo.completed}
        />

        <label
          htmlFor={todo.id}
          className={className}
        >
          {todo.title}
        </label>

        <button
          type="button"
          onClick={() => deleteTodo(todo)}
          className="destroy"
        />
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  checkBoxClick: PropTypes.func.isRequired,
};

export default TodoItem;
