import React from 'react';
import PropTypes from 'prop-types';

function TodoItem({ todoItem }) {
  const todo = todoItem.done
    ? <s>{todoItem.label}</s>
    : <>{todoItem.label}</>;

  return (
    <label htmlFor="todo-1">{todo}</label>
  );
}

export default TodoItem;

TodoItem.propTypes = {
  todoItem: PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
