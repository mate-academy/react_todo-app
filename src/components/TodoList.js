import React from 'react';
import PropTypes from 'prop-types';
import { TodoListItem } from './TodoListItem';

export const TodoList = ({ list, deleteItem, switchTaskStatus }) => (
  <ul className="todo-list">
    {list.map(item => (
      <TodoListItem
        key={item.id}
        id={item.id}
        task={item.title}
        status={item.status}
        checked={item.checked}
        deleteItem={deleteItem}
        switchTaskStatus={switchTaskStatus}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
  })).isRequired,
  deleteItem: PropTypes.func.isRequired,
  switchTaskStatus: PropTypes.func.isRequired,
};
