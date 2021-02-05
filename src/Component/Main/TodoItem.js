import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../../styles/todo-list.css';
import '../../styles/index.css';
import '../../styles/filters.css';

export const TodoItem = (props) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const {
    completeTodo,
    itemId,
  } = props;

  const soldCheckbox = ({ target: { checked } }) => {
    setIsCompleted(checked);

    completeTodo(itemId);
  };

  return (

    <input
      type="checkbox"
      className={classNames({
        toggle: true,
        completed: isCompleted,
        uncompleted: !isCompleted,
      })}
      checked={isCompleted}
      onChange={soldCheckbox}
    />

  );
};

TodoItem.propTypes = {
  completeTodo: PropTypes.func.isRequired,
  itemId: PropTypes.number.isRequired,
};
