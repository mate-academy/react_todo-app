import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = (props) => {
  const {
    completeTodo,
    itemId,
  } = props;

  return (

    <input
      type="checkbox"
      className={classNames({
        toggle: true,
        completed: true,
        uncompleted: false,
      })}
      onClick={() => completeTodo(itemId)}
    />

  );
};

TodoItem.propTypes = {
  completeTodo: PropTypes.func.isRequired,
  itemId: PropTypes.number.isRequired,
};
