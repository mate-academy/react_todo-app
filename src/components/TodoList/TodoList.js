import React from 'react';
import PropTypes from 'prop-types';

import { TodoItem } from '../TodoItem';

export const TodoList = ({ items, changeCompleted, removeTodo }) => (
  <ul className="todo-list">
    {items.map(item => (
      <TodoItem
        key={item.id}
        {...item}
        changeCompleted={changeCompleted}
        removeTodo={removeTodo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  changeCompleted: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};
