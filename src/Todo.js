import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ todo, toggle, destroy }) => {
  const { id, title, isDone } = todo;

  return (
    <li className="todo">
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={id}
          onClick={() => toggle(id)}
          checked={isDone}
        />
        <label
          htmlFor={id}
          className={isDone && 'completed-item'}
        >
          {title}

          <input
            type="checkbox"
            className="toggle"
            id={id}
            onClick={() => toggle(id)}
            checked={isDone}
          />
        </label>

        <button
          type="button"
          className="destroy"
          onClick={() => destroy(id)}
        />
      </div>
    </li>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    idDone: PropTypes.bool.isRequired,
  }).isRequired,
  toggle: PropTypes.func,
  destroy: PropTypes.func,
};

Todo.defaultProps = {
  toggle: null,
  destroy: null,
};

export default Todo;
