import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ item }) => {
  const { title, completed } = item;
  return (
    <li className="todo">
      <div className="view">
        <p>{title}</p>
        <p>{completed}</p>
      </div>
    </li>
  );
};

TodoList.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoList;
