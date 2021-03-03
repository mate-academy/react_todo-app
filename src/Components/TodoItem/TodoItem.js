import React from 'react';
import classname from 'classnames';
import PropTypes from 'prop-types';

export const TodoItem = ({
  todo: { id, title, completed, isBeingEdited },
}) => (
  <li
    className={classname('Todo', {
      completed,
    })}
    key={id}
  >
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        checked={completed}
      />
      <label>
        {title}
      </label>
      <button type="button" className="destroy" />
    </div>
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
  }).isRequired,
};
